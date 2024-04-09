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
On creating a new adapter, a popup with the adapter's input fields will appear.
REST has 4 sections; Data Pickup Interval, Core Settings, Advanced Settings and Wrapper.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="properties"
    sources={{
      light: useBaseUrl('/img/docs/inbound/sections-light.webp'),
      dark: useBaseUrl('/img/docs/inbound/sections-dark.webp#dark-only'),
    }}
  />
</div>

Read more about the properties in each section below:
- **Data Pickup Interval**:
  <div style={{maxWidth: '400px'}}>
    <ThemedImage
      alt="data pickup interval"
      sources={{
        light: useBaseUrl('/img/docs/inbound/trigger-interval-light.webp'),
        dark: useBaseUrl('/img/docs/inbound/trigger-interval-dark.webp#dark-only'),
      }}
    />
  </div>
  
  - **Triggering interval**: Dictates when files are picked from the Azure Storage account. You can choose between two types; Polling interval and Cron. Find out what's best suited for you [here](/integrations/triggering-interval).

- **Core Settings**: 
  <div style={{maxWidth: '400px'}}>
    <ThemedImage
      alt="data pickup interval"
      sources={{
        light: useBaseUrl('/img/docs/inbound/rest-core-light.webp'),
        dark: useBaseUrl('/img/docs/inbound/rest-core-dark.webp#dark-only'),
      }}
    />
  </div>
  - **Method**: The HTTP verb to use when contacting the restful endpoint.
  - **Endpoint Url**: The URL of the endpoint.
  - **Security Configuration/Authorization**: The [security configuration](/connxio-portal/security-configurations) to use for authenticating the request.
  - **Headers**: Add headers here as necessary to either authenticate the request or add other needed parameters.
    <div style={{maxWidth: '400px'}}>
      <ThemedImage
        alt="data pickup interval"
        sources={{
          light: useBaseUrl('/img/docs/inbound/rest-core-headers-light.webp'),
          dark: useBaseUrl('/img/docs/inbound/rest-core-headers-dark.webp#dark-only'),
        }}
      />
    </div>

  - **Body**: The content body of the request.
    <div style={{maxWidth: '400px'}}>
      <ThemedImage
        alt="data pickup interval"
        sources={{
          light: useBaseUrl('/img/docs/inbound/rest-core-body-light.webp'),
          dark: useBaseUrl('/img/docs/inbound/rest-core-body-dark.webp#dark-only'),
        }}
      />
    </div>

- **Advanced settings**:
  <div style={{maxWidth: '400px'}}>
      <ThemedImage
        alt="data pickup interval"
        sources={{
          light: useBaseUrl('/img/docs/inbound/rest-advanced-light.webp'),
          dark: useBaseUrl('/img/docs/inbound/rest-advanced-dark.webp#dark-only'),
        }}
      />
  </div>

  - **Pagination**: By using pagination, Connxio will scan the response of the API request for the Pathname/Prop-name you provided.
  You have two options to choose from:
    - **NextLink**: The URI will either be replaced by the value to the pathname property, or the value will be appended to the URI.
    Connxio will keep making API requests until the Pathname/Prop-name value doesn't contain a valid URI.
    - **ContinuationToken**: By using the variable [continuationToken] in either the URI, body or header-value - the variable will be replaced by the value to the Pathname/Prop-name received from the API-response. Connxio will keep making API requests until the ContinuationToken is empty or max pages (number of requests) reach 50.
  - **DateDelta**: Makes requests to the API, using a date variable - `{date.UseDateTimeDelta}` which will work as a starting/from `date`. The Polling interval will determine the difference in time, until the next run where the from-date will be set to datetime now.
    This variable can be used in the URI, body or header-value.
    Example of variable used in URI: `http://example.com/api/getStuff?FromDate={date.UseDateTimeDelta(1980-01-01T08:00:00.00).SetCstZone(Central Europe Standard Time) | date: dd.MM.yyyy HH.mm.ss | error: fallback 2023-02-02T08:00:00.00}&ToDate={date.SetCstZone(Central Europe Standard Time)}`

- **Wrapper**:
  <div style={{maxWidth: '400px'}}>
    <ThemedImage
      alt="data pickup interval"
      sources={{
        light: useBaseUrl('/img/docs/inbound/wrapper-light.webp'),
        dark: useBaseUrl('/img/docs/inbound/wrapper-dark.webp#dark-only'),
      }}
    />
  </div>

  - **WrapperType**: Choose between Json, XML or None.
  - **Might be Wrapped**: A wrapper is essentially just a shell around the actual message content that contains information not within the concern of the message itself. Read more about wrappers [here](/interaction/wrappers).

## Extending Logging

Connxio will add an `InterchangeId` header to the intake request to facilitate for continued transactional logging on the sender side if applicable.

## Retry

Since Connxio reaches out and picks up files when using the REST inbound adapter, retry is handled by the Connxio framework. If a fault happens when the trigger interval hits, the integration will be marked for execution at the next interval, which is after 60 seconds. This means that even if you have the polling interval/cron set to trigger hourly or event daily, Connxio will try to execute the configuration every minute until it succeeds. This does not happen if the message is already picked up however since Connxio cant be sure the message is possible to requeue on the external message. The message will then be sent to catastrophic retry as described in the [Retry Page](/integrations/retry).
