# Features in admin-product-cropped.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Gap analysis against: `administration/products.mdx`, `administration/products/create.mdx`, `administration/products/edit.mdx`, `administration/products/teams.mdx`, `administration/products/devices.mdx`, `administration/products/monitoring.mdx`, `administration/products/view.mdx`_

## 1. Workspace selector dropdown

**Source:** visual

**Docs coverage:** new — The docs do not mention the workspace selector dropdown in the top navigation bar or its search functionality.

A dropdown in the top left navigation bar used to switch between different workspaces. It includes a search bar to filter workspaces by name and lists available workspaces (e.g., demo, Airtel CI, Kipptivate).

**Timestamps:** 00:10, 00:14

## 2. User preferences and profile navigation

**Source:** visual

**Docs coverage:** new — The docs do not cover the user profile and preferences pages, nor their associated left sidebar navigation links.

The user profile area accessible from the top right avatar menu. It includes a left sidebar with navigation links for Preferences (Date & Time format, Language) and Profile settings (My profile, My teams, My actions, Security policy, Personal access token, Account & password).

**Timestamps:** 00:20, 00:24

## 3. Products list view and sorting

**Source:** visual

**Docs coverage:** outdated — The docs refer to the column as "Active monitors" (the UI shows "Active monitorings") and incorrectly state there is an "Actions: edit button" when users actually click the product row directly.

The main Products page displays a list of all products with sortable columns for Products (name and icon), Slug, and Active monitorings. Clicking on a column header displays an arrow to indicate sort direction. Users click directly on a product row to open its edit page.

**Timestamps:** 00:27, 00:40

## 4. Export CSV modal

**Source:** visual

**Docs coverage:** outdated — The docs state clicking "Export .CSV" downloads the file directly, but the video shows it opens a modal to configure the separator character and include hidden columns.

Clicking the Export .CSV button on the products list opens a modal window to configure the export format. Users can select the separator character from a dropdown (options: Comma, Semicolon, Tab, Space, Other) and toggle "Include hidden columns" before exporting.

**Timestamps:** 00:33, 00:34

## 5. Edit product sticky navigation

**Source:** visual

**Docs coverage:** new — The docs do not mention the sticky left navigation menu used to jump between sections on the product edit page.

The product edit view features a sticky left navigation menu with links to About, Team access, Allocated devices, and Settings. Clicking a link jumps directly to that section, and the menu highlights the section currently in view.

**Timestamps:** 01:03

## 6. Product icon and color picker

**Source:** visual

**Docs coverage:** outdated — The docs state there are "50+ icons available" in the predefined set, but the video shows exactly 25 icons in the grid.

When editing or creating a product, clicking the icon opens a popover to customize its appearance. Users can select from a palette of 10 colors and a grid of exactly 25 icons.

**Timestamps:** 00:46, 00:49

## 7. Product team access list

**Source:** visual

**Docs coverage:** outdated — The docs mention the list shows member counts, but omit that it also includes an "Access" column displaying the number of products each team can access.

The Team access section displays a table of assigned teams with columns for Teams ID (team name), Members (count of users), and Access (number of products the team can access). It includes an Add team button.

**Timestamps:** 00:54, 00:58

## 8. Allocated devices list

**Source:** visual

**Docs coverage:** new — The docs mention associating devices but do not detail the Allocated devices list columns (Device, Status, Health, Resolution) or the specific status badges shown.

The Allocated devices section displays a table of devices currently assigned to the product. The list includes columns for Device (icon and name), Status (showing badges like Online, Archived, Configuration, Available, In use, Offline), Health (e.g., Healthy), and Resolution.

**Timestamps:** 01:13, 01:16

## 9. Add allocated devices modal

**Source:** visual

**Docs coverage:** outdated — The docs refer to the tab as "SIMs" instead of "SIM cards", omit that tabs display device counts, and do not mention the "Deselect all" button.

Clicking Add device opens a modal with tabs for SIM cards, Smartphones, and Web Agents, each displaying the count of available items in that category. The modal provides a search bar, a Filter by host dropdown, and Select all / Deselect all buttons to manage multiple assignments.

**Timestamps:** 01:22, 01:29

## 10. Product settings

**Source:** visual

**Docs coverage:** covered

The Settings section allows configuring device monitoring via a toggle for "Allow monitoring for this product" and a number input for the "Default aggregation" interval in minutes. It also contains "Archive product" and "Delete product" buttons at the bottom.

**Timestamps:** 01:36, 01:40

## 11. Create new product form

**Source:** visual

**Docs coverage:** covered

A dedicated page to set up a new product. Users enter a product name, which auto-generates a read-only kebab-case slug (e.g., "demo2" becomes "demo-2"). Users can also configure the icon, color, team access, and allocated devices before clicking Create product.

**Timestamps:** 01:45, 01:51

## 12. Users list

**Source:** visual

**Docs coverage:** new — The docs do not cover the Users administration page or its detailed table columns showing roles, team membership, product access counts, and last login.

The Administration > Users page displays a table of all workspace members. It includes columns for User (name and email), Theme (role), Teams, Access (number of products), and Last login timestamp.

**Timestamps:** 01:58
