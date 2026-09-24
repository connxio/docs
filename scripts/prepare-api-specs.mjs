import yaml from "js-yaml";
import { mkdir, writeFile } from "node:fs/promises";

const serverUrl = "https://api.connxio.com";
const outputDirectory = new URL("../.openapi/", import.meta.url);
const methods = [
  "get",
  "put",
  "post",
  "delete",
  "options",
  "head",
  "patch",
  "trace",
];

async function downloadSpec(version) {
  // const source = `https://api.connxio.com/definition/v${version}/openapi.yaml?omit-version=false&omit-api-prefix=true`;
  const source = `https://app-cx-dt-ratchet-api.azurewebsites.net/swagger/v${version}/swagger.yaml`;
  const response = await fetch(source, { signal: AbortSignal.timeout(60_000) });
  if (!response.ok) {
    throw new Error(
      `Failed to download API v${version}: HTTP ${response.status}`,
    );
  }

  const spec = yaml.load(await response.text());
  if (!spec?.openapi?.startsWith("3.") || !spec.paths) {
    throw new Error(
      `API v${version} did not return a valid OpenAPI 3 specification`,
    );
  }

  spec.servers = [{ url: serverUrl }];
  // The raw Swagger endpoint includes the internal /api route prefix.
  // Public requests use /v1, /v2 and /v3 directly on api.connxio.com.
  const publicPaths = {};
  for (const [route, path] of Object.entries(spec.paths)) {
    const publicRoute = route.replace(/^\/api(?=\/|$)/, "") || "/";
    if (Object.hasOwn(publicPaths, publicRoute)) {
      throw new Error(`API v${version} has duplicate public path ${publicRoute}`);
    }
    publicPaths[publicRoute] = path;
  }
  spec.paths = publicPaths;

  // Path and operation servers take precedence over the root servers array.
  for (const path of Object.values(spec.paths)) {
    if (path.servers) path.servers = [{ url: serverUrl }];
    for (const method of methods) {
      if (path[method]?.servers) path[method].servers = [{ url: serverUrl }];
    }
  }
  return { version, content: JSON.stringify(spec, null, 2) + "\n" };
}

try {
  // Fetch all versions before replacing any local specifications.
  const specs = await Promise.all([1, 2, 3].map(downloadSpec));
  await mkdir(outputDirectory, { recursive: true });
  for (const { version, content } of specs) {
    await writeFile(new URL(`v${version}.json`, outputDirectory), content);
  }
  console.log(
    `Prepared API v1, v2 and v3 specifications with server ${serverUrl}`,
  );
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
