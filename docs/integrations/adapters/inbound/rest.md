# REST

The inbound REST adapter in Connxio enables seamless integration with external systems through HTTP/REST endpoints. With this adapter, Connxio will poll the configured REST APIs to retrieve messages and start processing data.

<details>
<summary>Limitations</summary>
<p>
When using the inbound REST adapter in Connxio, there are a few considerations that users should be aware of. Firstly, users are responsible for ensuring the availability and proper functioning of the REST API that is being connected to. Connxio relies on the availability and responsiveness of the API to receive incoming requests and process data. Users should also ensure that the API is properly secured and handles any necessary authentication or authorization mechanisms. It is essential to monitor the API's uptime and performance to maintain seamless integration with Connxio and uninterrupted data flow.
</p>
</details>

## Configuring the REST adapter

To configure Connxio to start fetching data from a REST endpoint select the "REST" option in the "Inbound Connection" shape:

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="Configuring inbound connection"
    sources={{
      light: useBaseUrl('/img/docs/inbound-connection-light.webp'),
      dark: useBaseUrl('/img/docs/inbound-connection-dark.webp#dark-only'),
    }}
  />
</div>

<br />
The following properties are used to configure the adapter:

- **Method**: The HTTP verb to use when contacting the restful endpoint.
- **Endpoint Url**: The URL of the endpoint.
- **Security Configuration**: The [security configuration](/connxio-portal/security-configurations) to use for authenticating the request.
- **Headers & Authorization Header Type**: Add headers here as necessary to either authenticate the request or add other needed parameters.
- **Pagination**: By using pagination, Connxio will scan the response of the API request for the Pathname/Prop-name you provided.
  You have two options to choose from:
- **NextLink**: The URI will either be replaced by the value to the pathname property, or the value will be appended to the URI.
  Connxio will keep making API requests until the Pathname/Prop-name value doesn't contain a valid URI.
- **ContinuationToken**: By using the variable [continuationToken] in either the URI, body or header-value - the variable will be replaced by the value to the Pathname/Prop-name received from the API-response. Connxio will keep making API requests until the ContinuationToken is empty or max pages (number of requests) reach 50.
- **DateDelta**: Makes requests to the API, using a date variable - `{date.UseDateTimeDelta}` which will work as a starting/from `date`. The Polling interval will determine the difference in time, until the next run where the from-date will be set to datetime now.
  This variable can be used in the URI, body or header-value.
  Example of variable used in URI: `http://example.com/api/getStuff?FromDate={date.UseDateTimeDelta(1980-01-01T08:00:00.00).SetCstZone(Central Europe Standard Time) | date: dd.MM.yyyy HH.mm.ss | error: fallback 2023-02-02T08:00:00.00}&ToDate={date.SetCstZone(Central Europe Standard Time)}`

## Extending Logging

Connxio will add an `InterchangeId` header to the intake request to facilitate for continued transactional logging on the sender side if applicable.

## Retry

Since Connxio reaches out and picks up files when using the REST inbound adapter, retry is handled by the Connxio framework. If a fault happens when the polling interval hits, the integration will be marked for execution at the next interval, which is after 60 seconds. This means that even if you have the polling interval set to trigger hourly or event daily, Connxio will try to execute the configuration every minute util it succeeds. This does not happen if the message is already picked up however since Connxio cant be sure the message is possible to requeue on the external message. The message will then be sent to catastrophic retry as described in the [Retry Page](/integrations/retry).
