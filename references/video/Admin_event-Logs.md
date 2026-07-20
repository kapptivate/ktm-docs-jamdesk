# Features in Admin_event-Logs.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Full-quality (GCS) analysis. Gap analysis against: `administration/event-log.mdx`, `administration/event-log/browse.mdx`, `administration/event-log/export.mdx`_

## 1. Event log table

**Source:** both

**Docs coverage:** outdated — The documentation refers to the fourth column as "Metadata", but the video shows it is named "Dimensions".

A paginated table tracing all platform events. It lists the event Time, Type, Source (who performed the action), and Dimensions (technical audit information and inline structured data). The narrator notes it tracks everything that happens on the platform.

**Timestamps:** 00:06

## 2. Raw info toggle

**Source:** visual

**Docs coverage:** new — The documentation does not mention the "Raw info" toggle switch.

A toggle switch located at the top right corner of the interface labeled "Raw info", which can be toggled on or off to change the display of event information.

**Timestamps:** 00:08

## 3. Time range and export menu

**Source:** both

**Docs coverage:** outdated — The docs mention a standalone "quick-range dropdown" and a separate "Export CSV button". The video shows the time presets and "Export as CSV" option are combined into a single three-dot menu.

A three-dot (kebab) menu at the top right that allows users to look at different time periods and export data. It contains quick-range presets (Past 1h, Past 2h, Past 6h, Past 12h, Past 24h, Past 48h, Today, Yesterday, Last 7 days, Last 30 days) and an "Export as CSV" option. To its left are the current date range and a manual refresh button.

**Timestamps:** 00:10

## 4. Type filter

**Source:** both

**Docs coverage:** covered

A dropdown menu to filter events by the type of action performed. It includes a "Select all" option and specific types like api_key_created, api_key_deleted, client_updated, group_created, group_deleted, monitoring_created, service_credentials_created, service_credentials_deleted, smartphone_connected, smartphone_disconnected, user_logged_in, and user_robot_maintenance.

**Timestamps:** 00:14

## 5. User filter

**Source:** both

**Docs coverage:** covered

A dropdown menu next to the Type filter used to filter the event log by the specific user who triggered the action.

**Timestamps:** 00:15

## 6. Event details panel

**Source:** both

**Docs coverage:** outdated — The documentation states users must "click the View More button" to see details and refers to the event data section as "Metadata". The video shows clicking the row itself opens the panel, and the section is labeled "Dimensions".

Clicking an event row opens a "Details" side panel on the right side of the screen, providing in-depth information for auditing and security. The panel displays the Type, Source, and Time of the event, and a "Dimensions" section containing the structured JSON payload of the action, complete with a copy-to-clipboard button.

**Timestamps:** 00:31
