# Features in admin-users-2.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Gap analysis against: `administration/users.mdx`, `administration/users/create.mdx`, `administration/users/edit.mdx`, `administration/users/access.mdx`, `administration/users/manage.mdx`_

## 1. User list search

**Source:** visual

**Docs coverage:** covered

A search input at the top of the users list that filters records by username, email, or name as you type.

**Timestamps:** 00:08

## 2. User status filter

**Source:** visual

**Docs coverage:** covered

A dropdown filter to view users by account status, with options for "Active" and "Disabled". When "Disabled" is selected, deactivated users appear in grayed-out rows with a ban icon, and their team, product, and access details are hidden.

**Timestamps:** 00:16, 00:27

## 3. User teams filter

**Source:** visual

**Docs coverage:** covered

A dropdown menu to filter the list of users by their team assignments. It includes a search bar, a "Select all" button, and checkboxes for available teams (e.g., "Admin-kops", "All Users", "devops", "HR").

**Timestamps:** 00:32

## 4. User products filter

**Source:** visual

**Docs coverage:** new — The docs list Search, Status, and Teams filters, but completely omit the Products filter.

A dropdown to filter the user list by accessible products. It features a search input, a "Select all" toggle, and checkboxes for individual products (e.g., "Android E2E App", "APIx", "Frontend App", "Payments"). A hover tooltip indicates "Select up to 10".

**Timestamps:** 00:41, 00:43

## 5. Team selection modal

**Source:** visual

**Docs coverage:** covered

Clicking "Add team" in the Create User form opens an "ADD USER TO AN EXISTING TEAM(S)..." modal. It provides a search field, a "Select all" option, and a checklist of teams alongside their current member counts.

**Timestamps:** 01:18

## 6. Inherited product access display

**Source:** visual

**Docs coverage:** covered

In the "Product Access" section of the user creation form, adding teams automatically populates the table with the products granted by those teams. These rows display "Always" in the Access column, the inheriting team in the Source column (e.g., "From 'Architecture'"), and feature disabled trash icons since they cannot be removed directly.

**Timestamps:** 01:21

## 7. Manual product role assignment

**Source:** visual

**Docs coverage:** covered

Manually adding a product in the Create User form adds it to the "Product Access" table with a "Manually added" Source. An Access dropdown appears to select the user's role: "Beta tester", "Administrator", "Reporter", "Supervisor", or "Tester". These manually added rows have active trash icons for removal.

**Timestamps:** 01:45, 01:48

## 8. Security policy selection

**Source:** visual

**Docs coverage:** covered

A dropdown menu in the "Security & Policy" section of the user creation form to assign a security profile (e.g., "Default Policy", "Security Policy").

**Timestamps:** 01:50

## 9. Create user form validation

**Source:** visual

**Docs coverage:** new — The docs mention that the system validates uniqueness as you type, but do not mention the submission-time format validation or the resulting error banners.

When submitting the "Create a new user" form, the system validates the field formats. If inputs are malformed, red borders appear around the fields and error banners display at the top of the form (e.g., "Username: Does not match the format", "Email: Email has an invalid format").

**Timestamps:** 02:00

## 10. Edit user access tab

**Source:** visual

**Docs coverage:** outdated — The docs state the Access tab shows "its role and an access source: Manually added... or From [team]". The video contradicts this: the columns are named "Role" and "Access", with "Role" showing "Multiple" and "Access" showing the role name, and there is no "source" column in this view.

The "Access" tab on a user's edit profile lists their assigned products. The table consists of "Product", "Role", and "Access" columns. For inherited access, the "Role" column displays "Multiple" and the "Access" column displays the actual permission level (e.g., "Administration").

**Timestamps:** 02:08

## 11. Reset user password

**Source:** visual

**Docs coverage:** covered

In the "Account & Password" tab of a user's profile, clicking "Reset user password" opens a confirmation modal. It warns that the user will lose access with their old password and will receive an email link to set a new one.

**Timestamps:** 02:18

## 12. Instant account deactivation and reactivation

**Source:** visual

**Docs coverage:** outdated — The docs claim you must "Confirm in the alert dialog" when deactivating or reactivating a user. The video contradicts this, showing that clicking the buttons in the edit page toggles the account status instantly without any dialog.

In the "Account & Password" tab, clicking "Deactivate user" immediately disables the account and toggles the button text to "Reactivate user". Clicking it again instantly restores the account. Both actions trigger a brief loading spinner on the button without any confirmation modal.

**Timestamps:** 02:23, 02:41
