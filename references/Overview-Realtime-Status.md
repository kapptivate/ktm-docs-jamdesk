# Features in Overview-Realtime-Status.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Full-quality (GCS) analysis. Gap analysis against: `monitoring/realtime-status.mdx`_

## 1. View Management & Unsaved Changes

**Source:** both

**Docs coverage:** new — The docs mention creating views but miss the 'Leave without saving?' confirmation dialog that appears when navigating away with unsaved modifications.

Users can create custom views of their monitoring data using the 'Add view' button. If a user modifies a view's display settings or filters and attempts to navigate away without saving, a 'Leave without saving?' confirmation dialog appears to prevent accidental data loss.

**Timestamps:** 00:52, 04:14

## 2. Layout Toggle (Cards vs List)

**Source:** visual

**Docs coverage:** covered

Users can switch between a visual 'Cards' layout and a denser 'List' layout using the icon toggle at the top of the Display menu.

**Timestamps:** 01:06, 02:52

## 3. Layout Grouping Options

**Source:** both

**Docs coverage:** outdated — The docs inaccurately refer to the Monitor option as "monitoring resource" and completely miss the "Location" and "Agent" grouping options available when using the List layout.

Users can organize the status views by selecting a grouping parameter from the Display menu. In the Cards layout, the available options are Product, Test, and Monitor. In the List layout, the grouping options expand to include Location and Agent.

**Timestamps:** 01:11, 03:03

## 4. Column Count Selection

**Source:** both

**Docs coverage:** outdated — The docs vaguely mention adjusting the number of columns but do not specify that the exact dropdown choices are strictly 1, 2, or 3.

Users can customize the density of both layouts by adjusting the 'Columns' dropdown in the Display menu. The available choices are exactly 1, 2, or 3 columns.

**Timestamps:** 01:25, 03:05

## 5. Execution Analysis Modes

**Source:** both

**Docs coverage:** covered

The Display menu allows users to switch how data is analyzed via the 'Show execution by' dropdown, choosing either 'Time' (over a specific date range) or 'Count' (a fixed number of most recent executions).

**Timestamps:** 01:30, 01:41

## 6. Visible Metrics Selection

**Source:** visual

**Docs coverage:** outdated — The docs only mention displaying status or availability percentage, completely missing the 'Frequency' and 'Avg execution time' metric toggles that appear in the List layout.

Users can choose which metrics appear on the cards or list rows via chips in the Display menu. In the Cards layout, the options are 'Status' and 'Availability %'. In the List layout, the options expand to include 'Frequency' and 'Avg execution time'.

**Timestamps:** 01:31, 03:03

## 7. Bar Chart Type

**Source:** both

**Docs coverage:** covered

When visualizing uptime in cards, users can choose the bar chart style. 'Stacked' dynamically sizes the thickness of bars based on the number of scenarios executed, while '100% stacked' normalizes all bars to the same height to display proportions as percentages. Tooltips over the bars reveal exact counts for Success, Failed, and Unexecuted runs.

**Timestamps:** 01:54, 02:24

## 8. Show Period Without Executions Toggle

**Source:** both

**Docs coverage:** outdated — The docs refer to this UI element as the "Show empty periods" toggle, but the application explicitly labels it "Show period without executions".

A toggle in the Display menu labeled 'Show period without executions' allows users to either display or hide gaps in the timeline where no tests were run.

**Timestamps:** 02:35

## 9. Count-based Execution Presets

**Source:** both

**Docs coverage:** covered

When the execution mode is set to 'Count', the time range picker at the top is replaced by a count selector dropdown offering specific execution presets: Last 30, Last 60, or Last 90.

**Timestamps:** 02:43

## 10. Filter Parameters and Operators

**Source:** both

**Docs coverage:** covered

The filter builder allows users to narrow down data by selecting a parameter (Product, Monitor, Test, Device, Status) and an operator (is exactly, not exactly, contains, does not contain, starts with, ends with) before defining a value.

**Timestamps:** 03:16, 03:26

## 11. Filter Status Dropdown Values

**Source:** both

**Docs coverage:** outdated — The docs fail to document the exact status values available in the filter dropdown (Up, Degraded, Down, Paused, Running, Scheduled).

When filtering by the 'Status' parameter, the value dropdown provides specific system states to choose from: Up, Degraded, Down, Paused, Running, and Scheduled.

**Timestamps:** 03:42

## 12. Filter Rule Groups and Management

**Source:** both

**Docs coverage:** covered

Users can build complex logic by clicking 'Add group' to nest conditions using AND/OR operators. Each group features a context menu allowing users to 'Duplicate group', 'Convert to filter' (flattening it), or 'Delete group'.

**Timestamps:** 03:52, 04:02

## 13. Time Range Picker Presets

**Source:** visual

**Docs coverage:** outdated — The docs inaccurately list the time range presets without their prefix (e.g., claiming "2 hours" instead of the actual UI label "Last 2h").

In time-based mode, the top navigation includes a time range dropdown with specific historical presets: Last 2h, Last 4h, Last 12h, Last 24h, Last 48h, Last 7 days, Last 30 days, Last 90 days, and Last 12 months.

**Timestamps:** 04:31

## 14. Click-and-Drag Chart Zooming

**Source:** both

**Docs coverage:** outdated — The docs explicitly claim that zooming is only available "In time-based mode", but the video demonstrates that click-and-drag zooming works perfectly in Count-based mode as well.

Users can click and drag horizontally directly on a card's bar chart to zoom in on a specific period or set of executions. This gesture functions in both the 'Time' and 'Count' execution modes.

**Timestamps:** 04:40, 05:00
