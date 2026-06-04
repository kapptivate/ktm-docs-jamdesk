# Features in Admin-Switch Workspaces and Product Configuration.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Gap analysis against: `concepts/workspace.mdx`, `administration/products/view.mdx`, `administration/products/edit.mdx`_

## 1. Workspace switcher dropdown

**Source:** visual

**Docs coverage:** new — The docs describe the concept of a workspace but do not mention the workspace switcher dropdown or its search capability.

A dropdown menu located in the top-left navigation bar used to switch between workspaces. It includes a search bar to filter the workspace list by name.

**Timestamps:** 00:08, 00:13

## 2. User profile page

**Source:** visual

**Docs coverage:** new — The docs completely omit the user profile page and its configuration sections.

Accessed by clicking the user avatar in the top right. It displays user details (name, avatar) and includes sections for User Teams, Product Access, and Security & Policy.

**Timestamps:** 00:24

## 3. Products list table

**Source:** visual

**Docs coverage:** outdated — The docs list an 'Active monitors' column and an 'Actions' column with an edit button; the video shows the column is named 'Active monitorings' and there is no Actions column.

A view listing all products, displaying columns for the product name (with total count), 'Slug', and 'Active monitorings'. Users can click directly on a row to edit the product.

**Timestamps:** 00:29

## 4. Export products CSV dialog

**Source:** visual

**Docs coverage:** outdated — The docs state that clicking 'Export .CSV' directly downloads the file, but the video shows it opens a dialog to select a date range.

Clicking the 'Export .CSV' button on the products list opens a modal dialog to select a date range ('From' and 'To' dates) in UTC before generating the file.

**Timestamps:** 00:34

## 5. Product Edit - About section

**Source:** visual

**Docs coverage:** covered

The top section of the product edit page where users can update the product name and customize the product's icon by selecting from a color palette and an icon grid.

**Timestamps:** 00:48

## 6. Product Edit - Teams access

**Source:** visual

**Docs coverage:** covered

A section displaying the teams with access to the product (e.g., Super User, Administrators) along with their member and access counts. Includes a '+ Add team' button.

**Timestamps:** 00:55

## 7. Product Edit - Allocated devices list

**Source:** visual

**Docs coverage:** covered

A searchable table showing devices assigned to the product. It includes columns for device ID, Status (Online, Archived, Available, Configuration), Usage (Healthy, Not used), and Motivation.

**Timestamps:** 01:05

## 8. Add allocated devices modal

**Source:** visual

**Docs coverage:** new — The docs mention associating devices but omit the '+ Add device' modal, its categorization into tabs (SIM, Smartphones, Web objects), and the bulk selection features.

Clicking '+ Add device' opens a modal with tabs for 'SIM', 'Smartphones', and 'Web objects'. Users can search for devices and use a 'Select all' toggle to bulk-add them to the product.

**Timestamps:** 01:22, 01:26

## 9. Product Edit - Settings

**Source:** visual

**Docs coverage:** covered

The settings section includes a toggle to 'Allow monitoring for this product' and a field to set the 'Aggregation' interval in minutes. It also contains 'Archive product' and 'Delete product' buttons.

**Timestamps:** 01:40

## 10. Create new product form

**Source:** visual

**Docs coverage:** new — The docs cover editing, archiving, and deleting products but do not document the product creation process or the '+ Create product' form.

Accessed via the '+ Create product' button, this page allows users to set up a new product by defining its icon, name, and manually entering a slug, before configuring teams and devices.

**Timestamps:** 01:44, 01:50

## 11. Users list view

**Source:** visual

**Docs coverage:** new — The docs do not cover the user administration section or the users list table.

Under Administration > Users, this table lists all platform users with columns for their name, role badges (Super User, Administrators, Users), product access count, and last login timestamp.

**Timestamps:** 01:58
