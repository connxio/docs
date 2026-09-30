import {readFile, readdir, mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {strToU8, zipSync} from 'fflate';

const root = fileURLToPath(new URL('../', import.meta.url));
const versions = JSON.parse(await readFile(path.join(root, 'versions.json'), 'utf8'));

async function* markdownFiles(directory) {
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* markdownFiles(file);
    else if (/\.mdx?$/.test(entry.name)) yield file;
  }
}

for (const version of ['current', ...versions]) {
  const docs = path.join(root, version === 'current' ? 'docs' : `versioned_docs/version-${version}`);
  const projects = new Set();
  for await (const file of markdownFiles(docs)) {
    const source = await readFile(file, 'utf8');
    const examples = [...source.matchAll(/^```csharp project="([A-Za-z][A-Za-z0-9]*)"\r?\n([\s\S]*?)^```\s*$/gm)];
    const downloads = [...source.matchAll(/<CodeComponentDownload project="([^"]+)"\s*\/>/g)].map(match => match[1]);
    if (!examples.length && !downloads.length) continue;
    if (examples.length !== downloads.length || examples.some(match => !downloads.includes(match[1]))) {
      throw new Error(`Download links and project examples must match in ${file}`);
    }
    const nuget = await readFile(path.join(docs, '_shared/RequiredNugetPackage.mdx'), 'utf8');
    const packageVersion = nuget.match(/dotnet add package Connxio\.Transformation --version ([\d.]+)/)?.[1];
    if (!packageVersion) throw new Error(`Missing Connxio.Transformation version in ${docs}`);
    for (const [, name] of examples) {
      if (projects.has(name)) throw new Error(`Duplicate project ${name} in ${version}`);
      projects.add(name);
      const template = path.join(docs, '_shared/code-component-templates', `${name}.cs`);
      const code = await readFile(template, 'utf8');
      const project = `Connxio.Example.${name}`;
      const csproj = `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>disable</Nullable>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Connxio.Transformation" Version="${packageVersion}" />
    <PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
  </ItemGroup>
</Project>
`;
      const slnx = `<Solution>
  <Project Path="${project}.csproj" />
</Solution>
`;
      const readme = `# ${name} code component\n\nThis project contains a starter template. Implement the logic described in the comments before using it; see the documentation page for a worked example.\n\nRequires the .NET 10 SDK and access to NuGet for package restore.\n\nExtract this archive, open ${project}.slnx in your IDE, or build from this folder:\n\n\`\`\`sh\ndotnet build -c Release\n\`\`\`\n\nThe DLL is bin/Release/net10.0/${project}.dll. Test with your own message content and metadata before uploading it to Connxio.\n\nThis is a class library, invoked by Connxio; it is not a console application. The source ZIP is not an uploadable Zip Component.\n\nGenerated from ${path.relative(root, template)} (${version} documentation).\n`;
      const files = Object.fromEntries(Object.entries({[`${project}.slnx`]: slnx, [`${project}.csproj`]: csproj, [`${name}.cs`]: code, 'README.md': readme}).map(([fileName, content]) => [fileName, [strToU8(content), {mtime: new Date('2020-01-01T00:00:00Z')}]]));
      const output = path.join(root, 'static/downloads/code-components', version);
      await mkdir(output, {recursive: true});
      await writeFile(path.join(output, `${name}.zip`), zipSync(files));
    }
  }
  console.log(`Generated ${projects.size} code component projects for ${version}.`);
}
