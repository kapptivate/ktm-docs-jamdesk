# Features in Overview-incidents-and-alerting.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Gap analysis against: `monitoring/incidents.mdx`, `administration/notifications.mdx` (pre-update versions)_

## 1. Unsaved changes confirmation modal

**Source:** visual

**Docs coverage:** new — The general UI behavior of prompting before navigating away with unsaved changes on dashboards is not documented.

When a user attempts to navigate away from a view (such as a dashboard) that has unsaved modifications, a 'Leave without saving?' confirmation modal appears. The user can choose to 'Cancel' and remain on the page, or click 'Leave' to discard their changes.

**Timestamp:** 00:04

## 2. Incidents dashboard counters

**Source:** visual

**Docs coverage:** outdated — The docs claim the counters show 'open, closed, and manually closed' incidents, but the video shows counters for 'Daily active alerts', 'Critical incident', 'Warning incident', and 'Closed incident'.

The top of the Incidents page displays four numeric counter cards that provide a quick summary of the current monitoring state: 'Daily active alerts', 'Critical incident', 'Warning incident', and 'Closed incident'.

**Timestamp:** 00:06

## 3. Incident status filter

**Source:** visual

**Docs coverage:** outdated — The docs state the status filters are 'OPEN, CLOSED, and MANUALLY_CLOSED', but the UI shows 'Ongoing, Resolved, and Canceled'.

Above the incidents table, a dropdown menu allows users to filter the list of incidents by their status. The available options in this dropdown are 'Ongoing', 'Resolved', and 'Canceled'.

**Timestamp:** 00:10

## 4. Incidents list table

**Source:** visual

**Docs coverage:** outdated — The docs claim the table includes 'Name', 'Alert name', and 'Actions' columns, and supports a multi-select toggle for bulk actions, none of which are present in the video. The actual columns are Type, Alert triggered, Status, and Tags.

The main data table displays a list of incidents. The columns include a 'Type' icon, 'Alert triggered' (showing the timestamp and relative time ago), 'Status' (displaying a colored tag like 'Ongoing'), and 'Tags' (displaying key-value pairs such as Zone, Product ID, Product name, Monitoring ID, and platform_name).

**Timestamp:** 00:21

## 5. Alerts list

**Source:** visual

**Docs coverage:** new — The Alerts list page and its table columns are entirely missing from the documentation.

The Alerts tab shows a tabular view of all configured alerts in the workspace. Columns include 'ID', 'Alert Name', 'Type' (e.g., Availability last point), 'Condition' (e.g., Critical : Failed Point >= 2), 'Apply to' (showing targeted tests and products), and an 'Actions' menu represented by three vertical dots.

**Timestamp:** 00:31

## 6. Alert creation types

**Source:** visual

**Docs coverage:** new — The process of creating alerts and selecting between Threshold, Success rate, and Raw alert types is not documented.

Clicking the 'Create alert' button navigates to a selection screen where users choose a template for the new alert. The available options are 'Threshold alerts' (triggers when a metric fails to satisfy conditions over time), 'Success rate alerts over the last runs' (triggers when failures exceed a threshold over recent runs), and 'Raw alerts' (custom in-house scripting).

**Timestamp:** 00:41

## 7. Threshold alert - Metric selection

**Source:** visual

**Docs coverage:** new — Configuring the data source for an alert, including selecting buckets, measurements, filters, and aggregation functions, is not documented.

When configuring a Threshold alert, the 'Alert Source' section enables users to define exactly which data to evaluate. Users select a 'Bucket' (e.g., 'default - duration (forever)'), pick a 'Measurement' from a dropdown (such as `ethernet_http_api`, `cellular_http_download`, `browsing_performance`), optionally apply filters, and choose an aggregation function in the 'Select' dropdown (e.g., `mean (http_call_duration_seconds)`).

**Timestamp:** 01:10
**Timestamp:** 01:17

## 8. Threshold alert - Chart and conditions

**Source:** visual

**Docs coverage:** new — The visual chart for historical data and the configuration of time windows, mathematical operators, and warning/critical threshold values are missing from the documentation.

Upon selecting a metric for a Threshold alert, a line chart plots the historical data for visual context; hovering over data points reveals the timestamp and exact value. Below the chart, users set 'Alert Conditions' by defining a rolling time window (e.g., 'Over the last 5 Minutes') and selecting a comparison operator (options include 'above or equal', 'strictly below', 'below or equal', 'strictly above'). Users then input numeric values for 'Warning Threshold' and 'Critical Threshold', which are immediately rendered as yellow and red horizontal reference lines on the chart.

**Timestamp:** 01:27
**Timestamp:** 01:36

## 9. Success rate alert configuration

**Source:** visual

**Docs coverage:** new — Configuring success rate alerts, including checking a recent number of points, setting integer failure thresholds, and applying product or test restrictions, is not documented.

When building a 'Success rate' alert, the source is locked to 'Failed Point'. Users define the number of 'Last points to check' (e.g., 10), toggle whether to 'Include technical error', and set the specific number of failed points required to trigger Warning and Critical states. A 'Restrictions' section allows the alert to be scoped to specific 'Products' (like APIs, Android & iOS App) or specific 'Tests' (like '#1114 - Balance check') using dropdowns.

**Timestamp:** 02:04
**Timestamp:** 02:14

## 10. Alert notifications configuration

**Source:** visual

**Docs coverage:** outdated — The docs state notifications are configured globally under Administration for 'Robot availability'. The video shows notifications configured individually per alert, including a recurring notification interval (e.g., every 15 minutes) that the docs do not mention.

At the bottom of the alert configuration page, users set how notifications are delivered when the alert triggers. Users can specify a recurrence interval (e.g., 'Send a notification every 15 minutes until the alert is closed'). Channels include Email, Slack, Microsoft Teams, and Webhook, each enabled via a checkbox. The Webhook option includes a 'Headers' section where custom HTTP key-value pairs can be added.

**Timestamp:** 01:39
**Timestamp:** 01:51

## 11. Error exclusions

**Source:** visual

**Docs coverage:** new — The Configuration tab and the feature to create error exclusions using text pattern matching are not documented.

In the Configuration tab under 'Error exclusions', users can add rules to prevent specific expected or harmless errors from triggering alerts. Clicking 'Create error exclusion' opens a modal where users provide a text snippet in the 'If pattern contains' field (e.g., `'indisponible'`). Errors matching this pattern will be ignored.

**Timestamp:** 02:37
**Timestamp:** 02:54
