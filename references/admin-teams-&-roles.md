# Features in admin-teams-&-roles.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Gap analysis against: `administration/teams.mdx`, `administration/teams/create.mdx`, `administration/teams/edit.mdx`, `administration/teams/access.mdx`, `administration/teams/manage.mdx`, `administration/roles.mdx`, `administration/roles/permissions.mdx`, `administration/roles/create.mdx`, `administration/roles/assign.mdx`_

## 1. Teams list

**Source:** visual

**Docs coverage:** covered

The main Teams page displays a grid of team cards. Each card shows the team name, a member count with a user icon, and a product count with a box icon. A search input for filtering and a 'Create team' button are at the top.

**Timestamps:** 00:01

## 2. Team action menu

**Source:** visual

**Docs coverage:** covered

Hovering over a team card reveals a vertical three-dot menu icon in the top right corner. Clicking it opens a dropdown menu with actions to Edit, Duplicate, or Delete the team.

**Timestamps:** 00:15, 00:20

## 3. Delete team confirmation

**Source:** visual

**Docs coverage:** covered

Selecting 'Delete' from a team's action menu opens a confirmation modal. It warns 'If you delete this team, some users may lose access to certain products.' and provides 'Cancel' and 'Delete team' buttons.

**Timestamps:** 00:21

## 4. Team details navigation

**Source:** visual

**Docs coverage:** covered

Clicking a team card opens its details page, which features a left sidebar to navigate between 'About', 'Members', and 'Access' sections. A breadcrumb at the top left links back to the Teams list, and a 'Save changes' button is in the top right.

**Timestamps:** 00:27, 00:38

## 5. Team Members management

**Source:** visual

**Docs coverage:** covered

The 'Members' section lists all users assigned to the team. It includes a 'Search member...' input, an 'Add users' button, and a list of members, each with a trash icon to remove them from the team.

**Timestamps:** 00:36

## 6. Add members modal

**Source:** visual

**Docs coverage:** outdated — The docs state to click 'Confirm' in the modal, but the video shows the button is labeled 'Save'.

Clicking 'Add users' opens an 'Add users to this team' modal. It features a search box, a 'Select all' checkbox, and a scrollable list of users with individual checkboxes. It has 'Cancel' and 'Save' buttons to apply the selection.

**Timestamps:** 00:40

## 7. Team Access assignments

**Source:** visual

**Docs coverage:** covered

The 'Access' section displays the products and roles assigned to the team. Products are listed with individual trash icons for removal. Below, a 'Role(s)' dropdown allows selecting one or multiple roles (Administrator, Beta tester, Reporter, Supervisor, Tester) that apply to the team's products.

**Timestamps:** 00:47, 00:54

## 8. Create new team

**Source:** visual

**Docs coverage:** outdated — The docs claim 'The slug is auto-generated in kebab-case and cannot be changed', but the video shows it is neither auto-generated nor read-only; the user must manually click and type into the slug field.

Clicking 'Create team' opens a form with 'About', 'Members', and 'Access' sections. The 'About' section contains inputs for 'Team name' and 'Team slug'. The slug field must be manually filled and is fully editable by the user.

**Timestamps:** 00:57, 01:01

## 9. Roles list

**Source:** visual

**Docs coverage:** covered

The Roles page lists system default roles (Administrator, Beta tester, Reporter, Supervisor, Tester) and custom roles. It includes a 'Create role' button in the top right corner.

**Timestamps:** 01:07

## 10. View default role permissions

**Source:** visual

**Docs coverage:** covered

Clicking a role in the list opens an 'Edit role' panel on the right side. For default roles, it displays the Name, Description, and Permissions in a read-only state, along with a warning banner: 'This is a default role and cannot be edited.'

**Timestamps:** 01:10

## 11. Role permissions hierarchy

**Source:** visual

**Docs coverage:** outdated — The docs state permissions are grouped under category names like 'Operator Admin' which then contain separate View and Edit checkboxes. The video shows the groups themselves are named 'View [Feature]' (acting as both the header and the view permission) and expand to reveal one or multiple specific sub-permissions like 'Edit Hardware Devices' or 'Add an incident'.

Permissions are structured as an expandable tree where the top-level parent acts as the 'View' permission (e.g., 'View Operator Admin', 'View Manual Testing'). Expanding the parent reveals specific child permissions like 'Edit Operator Admin', 'Edit Operator Events', or 'Add an incident'. Checking a child permission automatically checks its parent.

**Timestamps:** 01:13, 01:15, 01:39

## 12. Create new role

**Source:** visual

**Docs coverage:** outdated — The docs omit the 'Description' field in the role creation instructions, mentioning only the role name.

Clicking 'Create role' opens a modal with text inputs for 'Name' and 'Description', followed by the collapsible permissions tree. It includes 'Cancel' and 'Create role' buttons.

**Timestamps:** 01:37
