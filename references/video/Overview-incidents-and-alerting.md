# Features in Overview-incidents-and-alerting.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Full-quality (GCS) analysis. Gap analysis against: `monitoring/incidents.mdx`, `monitoring/alerts.mdx`, `administration/notifications.mdx`_

## 1. Unsaved Changes Modal

**Source:** visual

**Docs coverage:** new — The documentation fails to mention the 'Leave without saving?' confirmation modal that appears when navigating away from the workspace with unsaved changes.

When navigating away from a page with unsaved modifications, a 'Leave without saving?' confirmation modal appears. It warns that changes will not be saved and requires the user to click 'Cancel' to return or 'Leave' to proceed.

**Timestamps:** 00:04

## 2. Incidents Counter Cards

**Source:** both

**Docs coverage:** covered

Four summary cards at the top of the Incidents page display current metrics: 'Daily active alerts', 'Critical incident', 'Warning incident', and 'Closed incident'.

**Timestamps:** 00:08

## 3. Incidents Status Filter

**Source:** both

**Docs coverage:** covered

A dropdown filter above the incident list allows users to view incidents by their current state. Opening the dropdown reveals three options: 'Ongoing', 'Resolved', and 'Canceled'.

**Timestamps:** 00:11

## 4. Incident List and Properties

**Source:** both

**Docs coverage:** covered

A table listing incidents with columns for 'Type' (severity icon), 'Alert triggered' (ID, name, and timestamp), 'Status' (color-coded badge like Ongoing in red), and 'Tags' (key-value pairs such as Zone, Product ID, Product name, Monitoring ID, Monitoring name, and Test name). A three-dot menu on the far right of each row provides further actions.

**Timestamps:** 00:26

## 5. Alerts List

**Source:** visual

**Docs coverage:** covered

The Alerts tab shows a table of all configured alerts. Columns include 'ID', 'Alert Name', 'Type' (e.g., Availability last point), 'Condition' (e.g., Critical: Failed Point >= 2), 'Apply to' (e.g., All Tests, All Products), and 'Action' (a menu for editing or deleting).

**Timestamps:** 00:32

## 6. Alert Types Chooser

**Source:** both

**Docs coverage:** covered

Clicking 'Create alert' presents three template cards to choose from: 'Threshold alerts' (for tracking metrics over time), 'Success rate alerts over the last runs' (for failure counts over recent executions), and 'Raw alerts' (for custom scripting).

**Timestamps:** 00:40

## 7. Threshold Alert - Data Source and Aggregation

**Source:** visual

**Docs coverage:** covered — The documentation provides 'mean' as an example for the 'Select' field but does not enumerate the full list of available aggregation operators shown in the video (count, median, min, max, percentile_90, percentile_95, percentile_99, sum).

Defines the data to evaluate for a threshold alert. The user selects a 'Bucket' (e.g., default - duration), a 'Measurement' (e.g., ethernet_http_api, wifi_ping), and an aggregation function under 'Select'. The aggregation options shown are: mean, count, median, min, max, percentile_90, percentile_95, percentile_99, and sum.

**Timestamps:** 01:13, 01:16

## 8. Threshold Alert - Conditions and Dynamic Chart

**Source:** both

**Docs coverage:** covered

Users configure the evaluation window ('Over the last N Minutes') and a comparison operator ('above or equal', 'strictly above', 'below or equal', 'strictly below'). A dynamic chart displays the selected metric's recent history, complete with hover tooltips showing precise timestamps and values. As the user types 'Warning' and 'Critical' threshold values, yellow and red reference lines are instantly drawn across the chart.

**Timestamps:** 01:27, 01:38

## 9. Alert Notifications Setup

**Source:** both

**Docs coverage:** covered

A settings section on the alert form for delivering warnings. Users can set a recurrence interval ('Send a notification every N minutes until the alert is closed'). Channels include Email, Slack, Microsoft Teams, and Webhook. The Webhook section includes an 'Add Header' button to inject custom HTTP headers into the payload.

**Timestamps:** 01:50

## 10. Success Rate Alert Configuration & Severity Toggles

**Source:** both

**Docs coverage:** outdated — The documentation explains setting Warning and Critical threshold failure counts but completely misses the toggle switch next to each threshold that allows users to disable a severity level entirely.

Configures alerts based on recent execution failures. The source is locked to 'Failed Point'. Users set the 'Last points to check' (e.g., 10) and can check 'Include technical error'. Severity levels ('Warning' and 'Critical') dictate how many failed runs trigger the alert. Each severity level has a toggle switch next to it, allowing the user to completely deactivate that specific threshold.

**Timestamps:** 02:08

## 11. Alert Restrictions Scope

**Source:** visual

**Docs coverage:** covered

Allows an alert to be narrowed down instead of applying globally. Users can filter by 'Products' or 'Tests' using dropdown menus equipped with text search (e.g., typing 'Java' filters down to 'Java Static').

**Timestamps:** 02:14

## 12. Error Exclusions

**Source:** both

**Docs coverage:** covered

Found under the Configuration tab, this feature allows users to suppress alerts for expected errors. Clicking 'Create error exclusion' opens a modal with an 'If pattern contains' text input. Any error message containing the specified string (e.g., 'indisponible') is ignored and will not trigger an alert.

**Timestamps:** 02:50
