---
  title: Cookie Policy
  sidebar_position: 1
---

# Cookie Policy

**Last updated: 24 September 2026**

This policy explains how the Connxio customer portal uses cookies and other browser storage to support sign-in, coordinate open tabs and remember your preferences. It applies to the customer portal, including customer-specific portal addresses.

## What are cookies and browser storage?

Cookies are small pieces of data stored by your browser for a website. Session cookies have no fixed expiry date and normally last for the browser session; browser session-restoration settings may preserve them. Persistent cookies remain until their expiry date or until you delete them.

The portal also uses local storage and session storage. These are separate from cookies and are not automatically sent with web requests. Local storage can persist between visits, while session storage normally lasts until the tab is closed.

## Cookies used by the portal

The following cookies support authentication and coordination between portal tabs. They are set on the portal domain you visit, with the path `/`.

| Cookie name | Set by | Purpose | Lifetime |
| --- | --- | --- | --- |
| `auth0.{clientId}.is.authenticated` | Auth0 sign-in library in the portal | Stores a `true` flag indicating a previous successful sign-in, so the library can attempt to restore your authentication state. It does not contain your password or access token. | 1 day from when it is set or renewed; removed on logout. |
| `_legacy_auth0.{clientId}.is.authenticated` | Auth0 sign-in library in the portal | A compatibility copy of the sign-in flag for browsers with older cookie-handling behavior. | 1 day from when it is set or renewed; removed on logout. |
| `cx-tab-id` | Connxio | Stores a randomly generated tab identifier. The portal uses it to select which open tab responds when a new tab requests the current company and subscription context. | Session cookie. The portal also attempts to remove it when a tab unloads. |

`{clientId}` represents the identifier of the portal's Auth0 application, so the full cookie names vary between environments. The Auth0 cookie lifetime is separate from the lifetime of your authenticated session. Auth0 documents these settings in its [sign-in library reference](https://auth0.github.io/auth0-spa-js/interfaces/Auth0ClientOptions.html).

When sign-in uses an Auth0 organization, the library may also set `auth0.{clientId}.organization_hint` and its `_legacy_` copy on the portal domain. These remember the organization for subsequent sign-in attempts, expire after 1 day from being set or renewed, and are removed on logout.

## Cookies used by the sign-in service

Auth0 and its Cloudflare security service also set cookies on the sign-in domain or its parent domain. They may be encountered when the portal checks an existing login session after a page refresh, as well as during sign-in.

| Cookie name | Provider | Purpose | Lifetime |
| --- | --- | --- | --- |
| `auth0`, `auth0_compat` | Auth0 | Maintain the Auth0 login session and support single sign-on. The `_compat` cookie provides compatibility with older browsers. | Set by the Auth0 service; the effective login session also depends on the configured session timeouts. |
| `did`, `did_compat` | Auth0 | Identify a device for attack protection. The `_compat` cookie provides compatibility with older browsers. | Set by the Auth0 service; see the cookie's expiry in your browser. |
| `__cf_bm` | Cloudflare, used by the sign-in service | Helps distinguish automated traffic from human visitors to protect the sign-in service against bots. | Expires after 30 minutes of continuous inactivity. |

These cookies support authentication and security, rather than advertising or portal usage analytics. Their purposes are described in [Auth0's Authentication API cookie documentation](https://auth0.com/docs/manage-users/cookies/authentication-api-cookies) and [Cloudflare's cookie documentation](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/). The Auth0 service-cookie expiry dates are separate from the 1-day lifetime of the portal's sign-in flags listed above.

Sign-in may also involve your organization's identity provider, which may set separate cookies on its own domain. Those cookies depend on the provider and its configuration.

## Other browser storage

The portal uses browser storage for the following purposes:

| Storage | Purpose | Lifetime |
| --- | --- | --- |
| Session storage | Holds the current user, company and subscription context for the tab. The portal can copy this context from another open portal tab. Auth0 also temporarily stores information needed to complete a sign-in attempt. | Normally until the tab closes; Auth0 removes its temporary transaction information when it processes the sign-in callback. |
| Local storage | Remembers preferences such as theme, active subscription, list views, filters, sorting and navigation or editor display settings. | No fixed expiry; retained until overwritten or removed by the portal, you or your browser. |

## Analytics and advertising

The current portal application does not configure browser analytics or advertising cookies. Its cookie settings dialog currently shows essential cookies only. Server-side operational logging is separate from browser cookies.

## Your choices

The authentication and tab-coordination cookies described above support the operation of the portal. Strictly necessary cookies do not require consent. Simply continuing to use a website does not constitute consent to optional cookies; see [Datatilsynet's guidance on cookies and similar technologies](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/bruk-av-informasjonskapsler-og-andre-sporingsteknologier/).

You can inspect, block or delete cookies and other site data through your browser settings. Blocking authentication cookies may prevent sign-in or session restoration. Removing browser storage resets saved preferences and may require you to select your company or subscription again. Clearing portal site data does not necessarily clear cookies held on a separate sign-in domain.

For information about personal data and how to contact us, see our [Privacy Policy](./privacy-policy.md).
