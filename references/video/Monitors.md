# Features in Monitors.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Full-quality (GCS) analysis. Gap analysis against: `monitoring/overview.mdx`, `monitoring/create.mdx`, `monitoring/scheduling.mdx`, `monitoring/monitor-details.mdx`_

## 1. Monitors list and health summary

**Source:** both

**Docs coverage:** covered

The main Monitors view displays counter cards summarizing the total number of monitors currently Active, Up, experiencing a Device issue, Down, and Paused. Below the cards is a list view with columns for ID, Status, Last 5 runs, Frequency, and Device. Users can search by monitor name or filter the list by a specific test.

**Timestamp:** 00:00
**Timestamp:** 03:47

## 2. Create monitor from execution result

**Source:** both

**Docs coverage:** new — The documentation only mentions creating monitors from the Tests workspace or the Monitors list, completely missing the ability to create one directly from an execution result page.

Users can create a monitor directly from a single test execution result page by clicking the 'Create a monitor' button located in the top right corner. This launches the standard monitor configuration modal pre-filled with the test's details.

**Timestamp:** 03:13

## 3. Monitor variables and device assignment

**Source:** both

**Docs coverage:** covered

When creating a monitor, users first select the target test. If the chosen test contains variables (such as a starting URL, credentials, or owner-type variables), they populate the 'Variables' section. Users must assign specific execution parameters, such as picking a web agent and a browser preset (e.g., Chrome 140.0), to resolve the variables.

**Timestamp:** 00:32
**Timestamp:** 00:46

## 4. Simple scheduling

**Source:** both

**Docs coverage:** covered

In the Scheduling section, the 'Simple' tab allows users to set a fixed repeating interval. Users input a numeric value and select a time unit (minutes, hours, or seconds). A helper message below the inputs dynamically translates the configuration into a natural language sentence, such as 'Your test will run everyday every 5 minutes'.

**Timestamp:** 00:58

## 5. Advanced scheduling: Time windows

**Source:** both

**Docs coverage:** new — The documentation does not mention the 'Reference' radio buttons that allow users to toggle the timezone reference between 'Local' and 'UTC'.

Under the 'Advanced' scheduling tab, selecting 'At a defined frequency' reveals a 'Hours' section. Users select a Timezone (e.g., Europe/Paris), toggle the time Reference between 'Local' and 'UTC' via radio buttons, and define one or more execution periods by setting start and end times (e.g., 06:00 to 18:00).

**Timestamp:** 01:25

## 6. Advanced scheduling: Days and specific times

**Source:** both

**Docs coverage:** outdated — The docs state to 'Leave blank for forever' for the end date, but the UI actually provides a dedicated 'Forever' checkbox to select.

The Advanced scheduling tab includes a 'Days' section where users set a 'From' date and either choose an 'until' date or check the 'Forever' checkbox. Users can configure the monitor to run 'everyday' or on 'specific days' using Monday-Sunday checkboxes. Alternatively, changing the run mode to 'On specific time(s)' allows users to input exact times of day for execution.

**Timestamp:** 01:42
**Timestamp:** 01:52

## 7. Execution options

**Source:** both

**Docs coverage:** covered

The Options section features an 'Auto retry in case of failure' toggle that, when enabled, exposes a dropdown to retry 1, 2, or 3 times. This includes a visible warning about potential delays if parallel capacity is reached. Another toggle, 'Ignore errors', allows the scenario to continue running even if an individual step fails.

**Timestamp:** 02:04
**Timestamp:** 02:22

## 8. Bulk create monitors from tests

**Source:** both

**Docs coverage:** covered

From the Tests list, users can multi-select several tests and click the 'Create monitors' button. This opens a modal where users select a single shared device and configure the scheduling (Simple or Advanced) for all selected tests at once. Clicking 'Create [count] monitors' generates them simultaneously.

**Timestamp:** 02:51

## 9. Realtime status dashboard

**Source:** both

**Docs coverage:** new — The documentation completely omits the Realtime Status dashboard and its visual charts grouping executions by platform.

A dedicated dashboard page labeled 'Realtime Status' (or Analytics) displays grouped horizontal bar charts for categories like Android Apps, APIs, Devices, and USSD. It visually plots consecutive successful (green) and failed (red) test executions in real-time.

**Timestamp:** 03:31

## 10. Last 5 runs popover

**Source:** both

**Docs coverage:** new — The documentation vaguely mentions 'last execution result' but misses the visual 'Last 5 runs' column and its interactive popover containing run details and video links.

The 'Last 5 runs' column in the monitors list displays up to five colored squares indicating recent execution statuses. Clicking any square opens a popover detailing the specific execution result (e.g., Success), test ID, date and time, and action buttons to 'Open details' or view the 'Video'.

**Timestamp:** 04:05

## 11. Device chip tooltip

**Source:** visual

**Docs coverage:** new — The documentation does not mention that hovering over the device chip displays a tooltip with the host and browser specifics.

Hovering the cursor over a device chip in the 'Device' column reveals a tooltip with deeper configuration details, such as the specific Host machine name and the operating system/browser version (e.g., Chrome Desktop: Chrome 140.0).

**Timestamp:** 04:21

## 12. Monitor row actions menu

**Source:** both

**Docs coverage:** outdated — The docs list actions under different names (Details, Configure, Run instead of View analytics, Edit monitor, Force run) and completely fail to mention the 'Activate test-only mode' action.

Clicking the three-dot icon on a monitor row opens a menu with actions: View analytics, Edit monitor, Duplicate, Edit related test, Edit frequency, Edit device, Pause, Force run (to immediately execute out of schedule), and Activate test-only mode (which suspends the automated schedule but allows manual triggers via CI/CD or the UI).

**Timestamp:** 05:13

## 13. Monitor details analytics

**Source:** both

**Docs coverage:** covered

Navigating to a monitor's details opens an analytics view featuring summary configuration cards (Devices, Agent, Locations, Scheduling), a 'Weekly global availability' stacked bar chart, a 'Weekly execution time' bar chart colored by deviation from the historical average, and a 'Daily failures' side panel.

**Timestamp:** 04:45
**Timestamp:** 06:08
