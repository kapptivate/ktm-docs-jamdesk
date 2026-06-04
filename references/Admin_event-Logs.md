# Features in Admin_event-Logs.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Gap analysis against: `administration/event-log.mdx`, `administration/event-log/browse.mdx`, `administration/event-log/export.mdx`_

## 1. Event Log Table

**Source:** visual

**Docs coverage:** covered

A paginated table displaying system events with columns for Time, Type, Source, and structured Metadata. Pagination controls are located at the bottom of the table.

**Timestamps:** 00:00, 00:29

## 2. Live Data Toggle

**Source:** visual

**Docs coverage:** new — The documentation does not mention the Live Data toggle feature.

A toggle switch located at the top right of the page labeled 'Live Data', used to enable automatic real-time updates of the event log table.

**Timestamps:** 00:09

## 3. Export CSV

**Source:** visual

**Docs coverage:** covered

A button in the top right corner that allows users to export the current event log view into a CSV format.

**Timestamps:** 00:09

## 4. Date Range Presets

**Source:** visual

**Docs coverage:** outdated — The docs claim there is a '48h' preset, an exact date range picker, and timezone selection, none of which are shown in the video. The video only displays a single preset dropdown.

A dropdown menu in the top right to filter events by predefined time windows. Available options are 'Past 1h', 'Past 2h', 'Past 6h', 'Past 12h', 'Past 24h', 'Today', 'Yesterday', 'Last 7 days', and 'Last 30 days'.

**Timestamps:** 00:11

## 5. Dynamic Filter Builder

**Source:** visual

**Docs coverage:** outdated — The docs describe static 'Type' and 'User' dropdown filters. The video shows a dynamic filter builder using a '+' button where users select a field ('Type' or 'Source') and then a value.

A filter bar above the table where users can click a '+' icon to add criteria. Available fields to filter by are 'Type' and 'Source'. Selecting 'Type' opens a dropdown list of available system event types (e.g., admin_deleted, device_policy_created).

**Timestamps:** 00:14, 00:16

## 6. Filter by Cell Click

**Source:** visual

**Docs coverage:** new — The docs do not mention the ability to add filters by clicking values directly inside the table cells.

Users can instantly apply a filter by clicking directly on a value within the table. For example, clicking an event type like 'device_policy_deleted' in the Type column automatically creates and applies a filter chip for that specific type.

**Timestamps:** 00:21, 00:22

## 7. Event Details Side Panel

**Source:** visual

**Docs coverage:** outdated — The docs instruct users to 'click the View More button', but the video shows clicking the row itself opens the panel. The docs also fail to mention the copy-to-clipboard button on the JSON metadata block.

Clicking an event row opens a 'Details' side panel on the right. It displays the event's Time, Type, Source, and Metadata. The Metadata is formatted as a JSON block with syntax highlighting, line numbers, and a dedicated 'Copy' button in its top right corner.

**Timestamps:** 00:30, 00:32
