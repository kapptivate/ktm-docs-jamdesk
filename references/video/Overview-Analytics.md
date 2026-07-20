# Features in Overview-Analytics.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Full-quality (GCS) analysis. Gap analysis against: `monitoring/analytics.mdx`, `monitoring/dashboards.mdx`, `monitoring/reports.mdx` (pre-restructure versions)_

## 1. Dashboard list & favorites

**Source:** both

**Docs coverage:** covered

View all created dashboards in a centralized list that displays their name, source products, relative last update time, and creator. Click the star icon on the right side of any dashboard row to mark it as a favorite, keeping it easily accessible.

**Timestamp:** 00:16
**Timestamp:** 00:24

## 2. Dashboard context menu actions

**Source:** visual

**Docs coverage:** covered

Click the three-dot menu icon on any dashboard row to access a contextual list of actions: Edit, Remove from favorites (or Put in favorites), Duplicate, Move dashboard, Share via link, and Delete.

**Timestamp:** 00:27

## 3. Share dashboard modal

**Source:** both

**Docs coverage:** outdated — Docs state public links have "optional password protection"; the video shows password protection is mandatory to generate the link. Docs also completely omit the "Send by email" tab available in the sharing dialog.

Share a dashboard externally by selecting 'Share via link' from the context menu. This opens a modal with two tabs. The 'Public link' tab requires you to enter a password to protect the link before copying it. The 'Send by email' tab allows you to enter a recipient's email address and a required password to send the protected link directly.

**Timestamp:** 00:38
**Timestamp:** 00:46

## 4. Filter dashboards by source

**Source:** both

**Docs coverage:** outdated — Docs claim you can filter dashboards by source or owner using "multi-select dropdown filters". The video does not show these dropdown filters, only colored tags in the list.

Identify which products or metrics supply data to a dashboard by looking at the colored tags in the 'Source' column (e.g., 'Demo', 'USSD & SMS', 'Website'). The speaker mentions sources dictate what data can be displayed.

**Timestamp:** 00:50

## 5. Dashboard collections (Folders)

**Source:** both

**Docs coverage:** covered

Organize dashboards into higher-level collections, represented as folders at the top of the dashboard view (e.g., 'Kapp', 'Collector', 'B2B & FTTH'). Click 'Create collection' in the top right to add a new folder group.

**Timestamp:** 01:14

## 6. Create new dashboard

**Source:** both

**Docs coverage:** outdated — Docs instruct users to "select the products (sources) to include, and add a description" during creation; the video shows selecting a "Bucket" with no description field visible.

Click the 'Create dashboard' button to start building a new view. In the resulting page, you must input a 'Dashboard name', select a 'Bucket' from a dropdown menu, and configure 'Options' before adding widgets.

**Timestamp:** 01:21

## 7. Dashboard widget types

**Source:** both

**Docs coverage:** new — Docs mention configuring widgets but do not list the specific visualization types (Counter, Pie, Area range, etc.) available in the toolbar.

When a dashboard is in edit mode, a top toolbar displays the types of visualization widgets you can add: Counter, Pie, Area range, Entity Bar, Percentage Area, Bar, Column, and Custom Display.

**Timestamp:** 01:34

## 8. Auto-generated Tests metrics

**Source:** both

**Docs coverage:** outdated — Docs state these automatically generated dashboards are found in the "Auto Dashboards section"; the video shows them located in a dedicated "Tests metrics" tab.

Navigate to the 'Tests metrics' tab in the Analytics menu to access dashboards created automatically for every monitor in the platform. The list shows the test name and creation date. Clicking a test opens a predefined view with widgets for Success rate, Error type, Global availability, Error count over time, and Step by step performances.

**Timestamp:** 02:02
**Timestamp:** 02:24

## 9. Excel reports list & generation

**Source:** both

**Docs coverage:** outdated — Docs state Excel exports are initiated via an "Export to Excel" button "on any dashboard or from the analytics section". The video shows a dedicated "Excel reports" tab where reports are created and listed.

The 'Excel reports' tab displays a table of generated exports detailing their period, time group, source, creation date, and creator. Actions allow you to download or delete them. Click 'Create report' to configure a new export by setting parameters.

**Timestamp:** 02:32
**Timestamp:** 02:45

## 10. Excel report time configuration

**Source:** visual

**Docs coverage:** outdated — Docs list time grouping options as "30 minutes, 1 hour, 4 hours, 1 day, or custom intervals". The video explicitly shows the dropdown values as "5m, 10m, 15m, 30m, 1h".

In the 'Create new Excel Report' modal, set the 'Time range' using a dropdown of presets (Past 1h, Past 2h, Past 6h, Past 12h, Past 24h, Today, Yesterday, Last 7 days, This week, Last 30 days) or a custom date/time picker. Use the 'Time group' dropdown to aggregate data by 5m, 10m, 15m, 30m, or 1h intervals. A toggle is available to 'Include all products'.

**Timestamp:** 02:47
**Timestamp:** 02:55

## 11. CSV reports

**Source:** visual

**Docs coverage:** outdated — Docs claim CSV exports include filtering by "Products" and "Tags". The video only shows a 'Time range' selector and an 'Include all products' toggle, with no mention of tags. Like Excel, docs describe triggering CSVs via a button rather than a dedicated tab.

The 'CSV reports' tab lists generated CSV exports. Click 'Create report' to open a modal where you define the 'Time range' and toggle 'Include all products' before generating the file.

**Timestamp:** 03:32
**Timestamp:** 03:35

## 12. Mail reports list

**Source:** both

**Docs coverage:** covered

The 'Mail reports' tab displays scheduled automated emails. The table lists the target Dashboard name, an 'Active' status badge, the delivery Frequency, Aggregation level, Last sent relative time, Last modified time, and Creator.

**Timestamp:** 03:39

## 13. Create mail report configuration

**Source:** both

**Docs coverage:** outdated — Docs mention configuring a "Day of week" for weekly reports, which is not shown in the UI. Docs also list "Timezone for sending" and a separate "Timezone" for recipients; the video only shows a single "Timezone displayed" field.

Click 'Create new mail report' to schedule an email. The configuration form requires selecting a Dashboard (which can be searched and filtered by collections), entering a Name, and setting a Frequency (Daily, Weekly, Monthly, Last 24 Hours). You must also specify a send time, an Aggregation interval (e.g., 1 hour), the 'Timezone displayed', and pick recipient email addresses from a dropdown list.

**Timestamp:** 03:44
**Timestamp:** 03:52
