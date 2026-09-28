import PropertyReference from '@site/src/components/PropertyReference';

# User management

Use **Users** to review who has access to your Connxio organization and **Invites** to manage invitations. A Connxio account can access multiple subscriptions with the same login. Select the active subscription from the dropdown at the top of the portal.

## Users

The **Users** tab lists each user's name, email address, role, and subscription permissions. Use **Filter users** to find a user and the pagination controls to navigate longer lists.

The **Role** column shows the user's organization role. The **Permissions** column shows assigned subscription access, such as a subscription name followed by `read`, `write`, or `delete`. Open a user's **…** menu to view the actions available for that user.

### Roles

| Role | Access |
| --- | --- |
| User | Access to assigned subscriptions, controlled by the permissions granted for each subscription. |
| Administrator | Full access to all subscriptions in the organization. Can invite users, assign permissions, and remove users. |
| Owner | Full access to all subscriptions in the organization. Can invite users. |

## Access rights

Users with the **User** role have subscription-specific permissions. The user list displays these as `read`, `write`, or `delete`.

| Permission | What it allows |
| --- | --- |
| Read (`read`) | View integrations, code components, and security configurations. |
| Create or update (`write`) | Create and update integrations, code components, and security configurations. |
| Delete (`delete`) | Delete integrations, code components, and security configurations. |

### Assign permissions

1. Find the user in **Users** and open their **…** menu.
2. Select **Assign permissions**.
3. Choose the user's **Role**.
4. For the **User** role, select or clear **Read**, **Write**, and **Delete** for each subscription under **Subscriptions**.
5. Select **Done** to close the dialog.

Changes are saved automatically as you make them; **Done** closes the dialog rather than saving pending changes.

<PropertyReference properties={[
  {
    name: 'Role',
    description: 'The user’s organization role. See the roles above for the scope of access each role provides.',
  },
  {
    name: 'Subscriptions',
    description: 'The subscription access assigned to a user. Each row has Read, Write, and Delete checkboxes for that subscription.',
  },
]} />

## Invite a user {#inviting-users}

You need the **Administrator** or **Owner** role to invite users.

1. Open **Users** or **Invites**.
2. Select **Invite user**.
3. Enter the person's **Email** address.
4. Select **Invite user** in the dialog to send the invitation, or **Cancel** to close it without sending.

<PropertyReference properties={[
  {
    name: 'Email',
    description: 'The email address of the person you want to invite to the organization.',
    example: 'alex@example.com',
  },
]} />

The recipient receives an email with instructions for creating a Connxio account. If they already have an account, the email directs them to sign in and review the invitation.

## Manage invitations

Open **Invites** to review invitations for the organization. Use **Filter invites** to find an invitation. Each row shows the recipient's **Email** and invitation **Status**. Invitations awaiting acceptance appear as **Invite pending**.

### Resend an invitation

1. Find the invitation in **Invites**.
2. Open its **…** menu.
3. Select **Resend invitation** to send the invitation email again.

### Revoke an invitation

1. Find the invitation in **Invites**.
2. Open its **…** menu.
3. Select **Revoke invitation** to withdraw the invitation.

To remove an existing user from the organization, see [Remove a user](#user-deletion).

## Remove a user {#user-deletion}

Administrators can remove users directly from the user management page.

1. Open **Users** and find the user you want to remove.
2. Open the user's **…** menu.
3. Select **Remove user**.

This removes the user's access to the organization.
