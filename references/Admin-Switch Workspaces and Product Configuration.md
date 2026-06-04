# Features in Admin-Switch Workspaces and Product Configuration.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Full-quality (GCS) analysis. Gap analysis against: `concepts/workspace.mdx`, `administration/products/view.mdx`, `administration/products/edit.mdx`_

## 1. Workspace Switcher

**Source:** both

**Docs coverage:** new — The docs mention that users can belong to multiple workspaces and must choose one upon login, but they do not mention the ability to switch workspaces via the Settings menu or the search functionality.

Located in the top header's Settings dropdown menu (cog icon), the workspace switcher allows users to move between different workspaces. It includes a search input field to filter available workspaces by name.

**Timestamps:** 00:08, 00:13

## 2. Products List

**Source:** both

**Docs coverage:** outdated — The docs incorrectly claim there is an "Actions" column with an edit button. They also refer to the active monitoring column as "Active monitors," whereas the UI says "Active monitorings."

Found under Administration > Workspace > Products, this page displays a paginated list of all products. The table columns are "Product" (which shows the total count), "Slug", and "Active monitorings". Clicking a product row navigates to its edit page.

**Timestamps:** 00:29

## 3. Export Products to CSV

**Source:** both

**Docs coverage:** covered

A button labeled "Export .CSV" in the top right corner of the Products list allows users to download the table's data. Clicking it opens the browser's standard file save dialog.

**Timestamps:** 00:33

## 4. Edit Product - About

**Source:** both

**Docs coverage:** covered

The "About" section of a product's details page allows users to update the "Product name" and choose an icon. The icon picker provides a selection of 25 shapes and 24 colors. The product's "Slug" is displayed as a read-only field.

**Timestamps:** 00:46, 00:50

## 5. Edit Product - Teams Access

**Source:** both

**Docs coverage:** covered

The "Teams access" section lists the teams assigned to the product, displaying columns for "Teams ID", "Members" (count), and "Access" (number of products). An "+ Add team" button is available to grant access to additional teams.

**Timestamps:** 00:57

## 6. Edit Product - Allocated Devices List

**Source:** both

**Docs coverage:** covered

The "Allocated devices for this product" section shows a list of associated devices with a search bar. The table columns are "Device", "Status" (e.g., Online, Archived, Available, Offline), "Usage" (e.g., Healthy, Not used, Configuration), and "Node". A trash can icon on each row allows users to remove a device.

**Timestamps:** 01:06, 01:13

## 7. Add Allocated Device Modal

**Source:** both

**Docs coverage:** outdated — The docs incorrectly list the web objects tab as "web agents", whereas the UI is labeled "Web objectifs". The docs also omit the modal interface entirely, missing the tabs, search, filters, and 'Select all' functions.

Clicking the "+ Add device" button opens a modal to assign new devices. The modal is organized into three tabs: "SIMs", "Smartphones", and "Web objectifs". It includes a search bar, a filter dropdown, checkboxes for individual row selection, and a "Select all" button.

**Timestamps:** 01:23, 01:28

## 8. Product Settings (Monitoring & Deletion)

**Source:** both

**Docs coverage:** covered

The "Settings" section at the bottom of the product page includes a toggle to "Allow monitoring for this product" and a "Data aggregation" numeric input (in minutes). Below these are two buttons to "Archive product" and "Delete product".

**Timestamps:** 01:38

## 9. Create New Product

**Source:** both

**Docs coverage:** new — The documentation entirely misses the product creation flow and its dedicated form.

Accessed via the "+ Create product" button on the Products list, this page provides a form to set up a new product. It includes the same sections as the edit view: "About" (icon, name, slug), "Teams access" (+ Add team), and "Allocated devices" (+ Add device), with a "Create a product" submission button at the bottom. The slug auto-populates as the user types the product name.

**Timestamps:** 01:46, 01:50

## 10. Users List

**Source:** visual

**Docs coverage:** new — The provided documentation only covers the Workspace overview and Products, completely omitting the Users section and its list.

Located under Workspace > Users in the administration sidebar, this page displays a list of users with a search bar and a "Teams" dropdown filter. The table columns include "User ID", "Teams", "Access" (number of products), and "Last login". It also includes an "Export .CSV" button at the top right.

**Timestamps:** 01:58
