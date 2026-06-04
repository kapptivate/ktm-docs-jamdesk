# Features in Overview-Realtime-Status.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Gap analysis against: `monitoring/realtime-status.mdx`_

## 1. View tabs and unsaved changes confirmation

**Source:** visual

**Docs coverage:** covered

Switch between different configured dashboards using the view tabs at the top of the page (e.g., Overview, QoS, Network checks - Web, Debug, Active monitor). If you adjust filters or display settings and try to switch to another tab or leave the page without saving, a modal prompts you to either 'Leave' and discard changes or 'Cancel'.

**Timestamps:** 00:03, 00:53

## 2. Auto-refresh countdown

**Source:** visual

**Docs coverage:** covered

A countdown timer is located next to the time range picker, indicating when the page will automatically refresh to fetch new data. It includes a play/pause button to suspend the refresh and a dropdown to change the interval.

**Timestamps:** 00:00, 04:57

## 3. Filter builder

**Source:** visual

**Docs coverage:** covered

Clicking the 'Filter' button opens the 'Edit filters' dialog to refine the view. You can filter by parameters such as Product, Monitor, Test, Device, or Status. Available operators include 'is exactly', 'not exactly', 'contains', 'does not contain', 'starts with', and 'ends with'. Values are selected from a dropdown (e.g., Status can be Up, Degraded, Down, Paused, Running, or Scheduled). Rules can be combined using 'and' or 'or' logic, and the menu for a rule block offers options to 'Duplicate group', 'Convert to filter', or 'Delete group'.

**Timestamps:** 00:30, 03:17, 03:22, 03:43, 04:02

## 4. Bar chart tooltips

**Source:** visual

**Docs coverage:** covered

Hovering over any segment of the stacked bar chart reveals a tooltip showing the exact date and time range for that period, along with a numerical breakdown of 'Success', 'Failed', and 'Unexecuted' monitoring runs.

**Timestamps:** 00:38, 02:00

## 5. Display settings - Cards layout

**Source:** visual

**Docs coverage:** covered

The Display menu allows customization of the 'Cards' layout. You can group results by Product, Test, or Monitor. The number of columns can be adjusted from 1 up to 6. You can choose to render the Bar chart as 'Stacked' or '100% stacked', use a toggle to 'Show period without executions' (which renders empty periods as gray bars), and independently toggle whether to 'Show' the Status chip and Availability %.

**Timestamps:** 01:06, 01:28, 01:58, 02:29

## 6. Time range and execution mode

**Source:** visual

**Docs coverage:** covered

In the Display menu, 'Show execution by' toggles between 'Time' and 'Count'. In Time mode, a time range picker appears with presets (Last 2h, 4h, 12h, 24h, 48h, 7 days, 30 days, 90 days, 12 months) and a 'Custom' option. In Count mode, the time picker is replaced by a dropdown to evaluate the 'Last 30', 'Last 60', or 'Last 90' executions, and the chart's X-axis labels automatically update to 'Oldest execution' and 'Most recent'.

**Timestamps:** 01:38, 01:44, 02:43

## 7. Chart zooming

**Source:** visual

**Docs coverage:** covered

When viewing data by time, you can click and drag horizontally across a section of the bar chart to instantly zoom in on a specific period. This automatically switches the time range picker to 'Custom'.

**Timestamps:** 02:06, 02:13, 04:41

## 8. Display settings - List layout

**Source:** visual

**Docs coverage:** outdated — The docs state 'For the full monitor table with scheduling and device details, see the monitors list' and claim the list shows only an 'Up or Paused' chip. However, the video shows that the List layout contains 'Down' chips and has explicit toggles to display 'Frequency', 'Resource', 'Location', and 'Agent' directly within the Realtime status page.

Switching to the 'List' layout in the Display menu provides a condensed row-based view. The menu updates to offer column adjustment (1, 2, or 3 columns) and a series of 'Show' toggles to display specific inline metadata: Status, Frequency, Resource, Location, and Agent. Status chips visible in this view include Paused, Up, and Down.

**Timestamps:** 02:53, 03:03, 03:04
