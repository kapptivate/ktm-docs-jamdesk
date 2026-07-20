# Features in admin-product-cropped.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Full-quality (GCS) analysis. Gap analysis against: `administration/products.mdx`, `administration/products/create.mdx`, `administration/products/edit.mdx`, `administration/products/teams.mdx`, `administration/products/devices.mdx`, `administration/products/monitoring.mdx`, `administration/products/view.mdx`_

## 1. Workspace top navigation

**Source:** visual

**Docs coverage:** new — The documentation does not mention the top navigation bar or any of its available sections.

A global top navigation bar visible across the workspace, containing links to "Overview", "Grid", "Network checks", "Web", "Debug", and "Active monitor".

**Timestamps:** 00:00

## 2. Workspace Overview dashboard

**Source:** visual

**Docs coverage:** new — The documentation does not mention the Overview dashboard, its global filters, or the service uptime panels.

A dashboard displaying the uptime of various services (e.g., APIs, Cellular data). It features global filters for time range (e.g., "Last 30 days") and groups (e.g., "All (8)"), along with a "Display" dropdown. Each service panel shows an uptime percentage, a status badge (e.g., "Partial outage"), and a green/red historical bar chart.

**Timestamps:** 00:00, 00:05

## 3. Workspace switcher menu

**Source:** both

**Docs coverage:** new — The documentation does not mention the user menu, the settings link, or how to switch workspaces.

Clicking the workspace name in the top left opens a dropdown menu containing a "Settings" link, a "Switch workspace" section, and a "Logout" option. The workspace switcher includes a search bar to filter available workspaces and lists recent ones (e.g., "Apple TV", "Cinemax", "kipptievate", "Kipptievate - Demo", "POP In") along with a "View all" link.

**Timestamps:** 00:08, 00:12

## 4. Preferences page

**Source:** visual

**Docs coverage:** new — The documentation does not mention the preferences page or its date, time, and language settings.

An administration page for user preferences, featuring settings for "Date & Time format" (e.g., Date format: "DD/MM/YYYY", Time format: "24h") and "Language" (e.g., "English").

**Timestamps:** 00:20

## 5. User Profile page

**Source:** visual

**Docs coverage:** new — The documentation does not mention the user profile page, its contained sections, or the associated administration sidebar.

A profile page displaying the user's details (Email, First name, Last name, Company) alongside sections for "User Teams", "Product Access", and "Security & Policy". A left sidebar provides navigation to "My teams", "API access", "Security policy", "Personal access token", and "Account & permissions".

**Timestamps:** 00:22

## 6. Products list

**Source:** both

**Docs coverage:** outdated — The documentation claims the list includes an 'Active monitors' column and an 'Actions' column with an edit button, but the video shows the column is named 'Active monitorings' and there is no Actions column.

A table displaying all active products in the workspace. It features columns for "Name", "Slug", and "Active monitorings". Rows can be clicked to open the product's edit page.

**Timestamps:** 00:27

## 7. Export products modal

**Source:** both

**Docs coverage:** outdated — The documentation states that clicking 'Export .CSV' downloads the file directly, but the video shows it opens an export modal where the user must configure the export and click 'Download'.

Clicking the "Export .CSV" button on the products list opens a modal. The modal displays a read-only "Export for: Products" tag, a "Type" dropdown (defaulted to "All"), a selected "CSV" format chip, and "Cancel" or "Download" buttons.

**Timestamps:** 00:33

## 8. Product edit - About section

**Source:** both

**Docs coverage:** covered

The "About" section on the product edit page allows users to update the product details. It includes an icon picker that opens a popover with a color palette and an icon grid, an input for the "Product name", and a read-only field displaying the auto-generated "Slug".

**Timestamps:** 00:46, 00:52

## 9. Product edit - Team access

**Source:** visual

**Docs coverage:** outdated — The documentation states the team list shows member counts, but misses that it also includes an 'Access' column displaying the number of products each team can access.

A section on the product edit page that lists teams assigned to the product. The table includes columns for the team name (e.g., "Super User", "Administrator"), "Members" (showing the user count), and "Access" (showing the total number of products the team can access). It includes an "Add team" button.

**Timestamps:** 00:56

## 10. Product edit - Allocated devices list

**Source:** visual

**Docs coverage:** new — The documentation mentions you can associate devices, but does not describe the allocated devices list or its columns (Status, Usage, Hosted on).

A section on the product edit page listing all devices associated with the product. The table displays columns for "Devices" (showing a platform icon and name), "Status" (with chips like "Online", "Archived", "Available", "Configuration"), "Usage" (with chips like "Healthy", "Not used"), and "Hosted on" (showing the host machine).

**Timestamps:** 01:01, 01:14

## 11. Add devices modal

**Source:** both

**Docs coverage:** covered

Clicking "Add device" opens a modal to link new devices to the product. It features tabs for "Smartphones", "Web Agents", and "SIMs", each displaying a count of available items. The modal includes a "Search for a device..." input, a "Host" filter dropdown, a "Select all" button, and checkboxes to select individual devices.

**Timestamps:** 01:21, 01:25, 01:28

## 12. Product monitoring settings

**Source:** both

**Docs coverage:** covered

A "Settings" section on the product edit page that controls monitoring. It includes an "Allow monitoring for this product" toggle switch and a "Default aggregation" number input specifying the interval in minutes.

**Timestamps:** 01:35

## 13. Archive and delete product

**Source:** visual

**Docs coverage:** covered

Two buttons located at the bottom of the "Settings" section on the product edit page: "Archive product" and "Delete product", used to deprecate or permanently remove the product.

**Timestamps:** 01:40

## 14. Create product page

**Source:** both

**Docs coverage:** covered

A page to set up a new product, containing empty states for the "About", "Teams access", and "Allocated devices" sections. Entering a name in the "Product name" input automatically updates the disabled "Slug" field. It includes a "Create product" button at the bottom to save the configuration.

**Timestamps:** 01:46, 01:50

## 15. Users list

**Source:** visual

**Docs coverage:** new — The documentation does not mention the Users page, its search and filter controls, or the data columns displayed.

A page displaying a table of all users in the workspace. It features a "Search for..." input, a status filter (e.g., "Active"), and a "Teams" filter. The table includes columns for the user's email, assigned "Teams", "Access" (number of products), and "Last login" timestamp, with pagination at the bottom.

**Timestamps:** 01:57
