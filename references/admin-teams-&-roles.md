# Features in admin-teams-&-roles.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Full-quality (GCS) analysis. Gap analysis against: `administration/teams.mdx`, `administration/teams/create.mdx`, `administration/teams/edit.mdx`, `administration/teams/access.mdx`, `administration/teams/manage.mdx`, `administration/roles.mdx`, `administration/roles/permissions.mdx`, `administration/roles/create.mdx`, `administration/roles/assign.mdx`_

## 1. Teams list

**Source:** visual

**Docs coverage:** outdated — The docs mention a search box and a "Create team" button in the Teams list, but neither is visible in the video's list view.

A grid view displaying all teams. Each team is shown as a card containing the team's name, the number of members, and the number of assigned products. An informational banner at the top explains that teams are groups of people working on the same products with the same authorizations.

**Timestamps:** 00:10

## 2. Team card context menu

**Source:** visual

**Docs coverage:** covered

Hovering over a team card in the list reveals a three-dots menu icon in the top right corner. Clicking it opens a dropdown with options to "Duplicate", "Edit", or "Delete" the team.

**Timestamps:** 00:15

## 3. Delete team

**Source:** visual

**Docs coverage:** covered

Selecting "Delete" from a team's context menu opens a confirmation dialog warning that "some users may lose access to certain products." The user can confirm by clicking "Delete team" or cancel.

**Timestamps:** 00:20

## 4. Edit team - About section

**Source:** visual

**Docs coverage:** outdated — The docs claim there is a slug field that cannot be changed, but no slug field is visible. Additionally, the docs do not mention the "Delete team" button present in this section.

Clicking a team card opens its edit page, which is divided into sections. The "About" section displays a "Team name" input field for renaming the team and a "Delete team" button to remove the team entirely.

**Timestamps:** 00:34

## 5. Edit team - Members section

**Source:** visual

**Docs coverage:** outdated — The docs state to click "Add members", look for a "Select all" checkbox, and click "Confirm". However, the video shows an "+ Add user" button, no "Select all" checkbox, and an "Add (X)" button in the modal.

The "Members" section of the team edit page lists all currently assigned users with their names, emails, and a trash can icon to remove them. Clicking "+ Add user" opens a modal to search for and select users via checkboxes, then add them by clicking "Add (X)" where X is the number selected.

**Timestamps:** 00:40

## 6. Edit team - Access section

**Source:** visual

**Docs coverage:** outdated — The docs instruct users to click "Save Changes" after modifying access, but no save button is present on the page.

The "Access" section lists assigned products, each with a trash can icon to remove it. An "+ Add product" button allows assigning more. Below the products, a "Select role(s)" field displays the currently assigned roles as removable chips (e.g., Tester, Supervisor, Reporter, Data tester, Administrator). The interface lacks a save button, implying changes are applied automatically.

**Timestamps:** 00:51

## 7. Create team

**Source:** visual

**Docs coverage:** outdated — The docs state that the "About" section includes an auto-generated slug field, but only the Team name field is visible on the creation form.

The "Create new team" page provides a blank form with "About" (Team name input), "Members" (+ Add user button), and "Access" (+ Add product button) sections. A note warns that "You have to add at least one access to a product to create a team." Once configured, clicking the "Create team" button finalizes it.

**Timestamps:** 00:58

## 8. Roles list

**Source:** visual

**Docs coverage:** covered

A list view displaying available roles, including system defaults such as Administrator, Data tester, Reporter, Supervisor, and Tester.

**Timestamps:** 01:08

## 9. View default role

**Source:** visual

**Docs coverage:** covered

Clicking a default role in the list opens a read-only "Edit role" side panel. It shows the disabled Role name and lists permissions grouped by categories like "Operator Admin", "Events", "Manual Testing", "Automated Testing", "Supervision", "Analytics", and "Beta Features". A banner at the bottom notes: "This is a default role and cannot be edited."

**Timestamps:** 01:10

## 10. Create custom role

**Source:** visual

**Docs coverage:** outdated — The docs list the permission groups in the creation modal as "Operator Admin, Events, Manual Testing...", but the video shows them prefixed with "View " (e.g., "View Operator Admin", "View Events").

Clicking to create a role opens a "Create new role" modal with a "Role name" input and a list of collapsible permission groups. Expanding a group reveals "View" and "Edit" checkboxes for specific features. The groups in this modal are named with a "View " prefix (e.g., "View Operator Admin", "View Events", "View Manual Testing").

**Timestamps:** 01:43
