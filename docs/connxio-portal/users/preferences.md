# User Preferences

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

The user preferences page in the Connxio Portal allows users to manage their user details, change themes and enabling multi-factor authentication.

<div style={{maxWidth: '800px'}}>
    <ThemedImage
        alt="create test group"
        sources={{
        light: useBaseUrl('/img/docs/users/user-profile-light.webp'),
        dark: useBaseUrl('/img/docs/users/user-profile-dark.webp#dark-only'),
        }}
    />
    </div>


## Two-Factor Authentication
Users can turn on two-factor authentication in the user preferences page. When enabled users will receive a time-based one-time password (TOTP) to their Authenticator app.

<!-- If you have two-factor login enabled on your account, and you aren't receiving emails with a token, please contact <a href="mailto:support@connxio.no">support@connxio.no</a>. -->