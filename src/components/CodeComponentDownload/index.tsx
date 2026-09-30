import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useDocsVersion} from '@docusaurus/plugin-content-docs/client';

export default function CodeComponentDownload({project}: {project: string}) {
  const {version} = useDocsVersion();
  const url = useBaseUrl(`/downloads/code-components/${version}/${project}.zip`);
  return (
    <p>
      <a className="button button--primary" download href={url}>
        <span aria-hidden="true">↓ </span>
        Download {project === 'Ack' ? 'ACK' : project} .NET project (ZIP)
      </a>
    </p>
  );
}
