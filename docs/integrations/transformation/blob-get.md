---
sidebar_position: 5
---

# Azure Blob Storage Get

Connxio allows customers to get data from [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/) to enrich, replace or transform messages. The process is intuitive and resembles the act of [Data Collection](/integrations/transformation/data-collection).

## Limitations and External demands

There are a few things to consider when getting data from Azure Blob Storage. The following should always be considered and reviewed:

### Data size

Be careful about how much data your individual blobs contain. There are few limits on parallel processing withing Connxio, but the same cannot be said for size or processing time. Currently the timeout for a transformation processes is set to 10 minutes. This is an eternity in the world of distributed systems, and we urge you to optimize your integration processing time, so that each enrichment or transformation responds in a reliable and fast manner. If you integrate with slow blobs returning large amounts of data, you can cause significant delays for your subscription inside Connxio, and, in some cases, even make the whole process fail. As such we recommend keeping all blob retrieval **below 1 MB** in size and under 100 KB for best performance.

>Using proxy services that deliver trimmed data could be a good way to increase performance and decrease load.

### Traffic

Blob retrieval is performed *every time* an integration pipeline fires. This can generate a large amount of traffic. Be sure to evaluate pricing strategies in Azure and be aware of data usage. Since Connxio processes transformations in parallel thousands upon thousands of requests can be fired at the same time while in peak periods.

>Ensure that your Azure Storage account is configured for the load and type of traffic it will be expected to handle.

### Availability

If the call to Azure Storage fails the integration will fail and be sent to error persistence.

## How to add the Blob Get shape

Add the "Azure Blob" shape from the "Transformations" menu:

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/transformations/transformations-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/transformations-dark.webp#dark-only'),
    }}
  />
</div>

On creating a new transformation, a popup with the transformation's input fields will appear.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/transformations/blobget-light.jpg.webp'),
      dark: useBaseUrl('/img/docs/transformations/blobget-dark.jpg#dark-only'),
    }}
  />
</div>

- **Security Configuration**: Select your security configuration from the list. See [here](/connxio-portal/security-configurations) for more information.
- **Container Name**: Name of the container to get the blob from.
- **Operation**: The operation to perform on the blob. Either Get or Upsert.
- **Blob name**: The name of the blob to get from Azure Storage.
- **Variable name**: The name used for the variable through Connxio. Use this name if you want to target the variable in a [code component](/integrations/transformation/code-components) or [Connxio Macro Language](/integrations/cxmal/connxio-macro-language). The variable is added to the DataCollection array on the Metadata object.

## Retry

Blob Get is currently using the backoff retry described on the [Retry](/integrations/retry) page.