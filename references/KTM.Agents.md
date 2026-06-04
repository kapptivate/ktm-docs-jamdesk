# Features in KTM.Agents.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Gap analysis against: `equipment/agents.mdx`, `equipment/statuses.mdx`_

## 1. Agent category tabs

**Source:** visual

**Docs coverage:** outdated — The docs refer to the first tab as 'SIM', but the UI labels it 'Cellular Agents'.

Switch between agent types using the tabs at the top of the list: Cellular Agents, Smartphone Agents, Web Agents, and Passive Agents. Each tab displays a count of the connected agents for that category.

**Timestamps:** 00:00, 00:04, 00:08, 00:12

## 2. Agent list filters

**Source:** visual

**Docs coverage:** covered

Filter the agent list using a text search for name or tags. You can also apply dropdown filters for Status (Online, Offline, Maintenance, Waiting for configuration, Test-only) and Zone (e.g., custom-zone, Localhost).

**Timestamps:** 00:22, 00:23, 00:25

## 3. Cellular Agent: Connected devices table

**Source:** visual

**Docs coverage:** outdated — The docs state the table includes the 'SIM's number' and 'access entries', but the UI shows columns for Slot, SIM id, Status, Network, Health, and Monitors.

Within a Cellular agent's details, the 'Connected devices' tab shows a sortable table of SIM slots. The columns include Slot, SIM id, Status, Network, Health, and Monitors.

**Timestamps:** 00:35

## 4. Cellular Agent: SIM row actions

**Source:** visual

**Docs coverage:** new — The docs do not mention the row actions available for SIM slots.

Clicking the three-dot menu on a SIM slot row in the Connected devices table opens a dropdown with options to 'Remove SIM from slot' and 'Reset SIM'.

**Timestamps:** 00:43

## 5. Cellular Agent: Health and Monitors tooltips

**Source:** visual

**Docs coverage:** outdated — The docs incorrectly claim the health badge hover shows 'weekly-average usage' instead of usage in the past 24 hours, and they completely miss the tooltip for the Monitors column.

Hovering over a device's Health badge reveals its usage over the past 24 hours (e.g., 'Usage in past 24 hours: Healthy (0%)'). Hovering over the Monitors column displays the active versus total monitors executed by that specific SIM ID.

**Timestamps:** 00:45, 00:51

## 6. Agent Settings: Toggles and Credentials

**Source:** visual

**Docs coverage:** new — While the docs mention these settings, they omit the specific UI interactions to view and copy the Agent secret.

In the agent's Settings tab, users can toggle switches for 'Automatic update' (under Software update) and 'Automatic reboot'. In the Agent credentials section, the Agent secret can be revealed by clicking the eye icon and copied to the clipboard.

**Timestamps:** 01:06, 01:11, 01:19, 01:21

## 7. Smartphone Agent: Connected devices table

**Source:** visual

**Docs coverage:** outdated — The docs claim the table shows 'model', 'UUID', 'usage badge', and 'access' counts, but the UI shows columns for ID, OS, Status, Health, and Monitors.

For a Smartphone agent, the 'Connected devices' tab displays a table with columns for ID (showing the UUID), OS (with an icon), Status, Health, and Monitors.

**Timestamps:** 01:31

## 8. Smartphone Agent: Reset device connection

**Source:** visual

**Docs coverage:** new — The docs do not document the 'Reset device connection' action.

Next to the Status badge (e.g., 'Available') in the Smartphone agent's connected devices list, there is a plug icon button to 'Reset device connection'.

**Timestamps:** 01:37

## 9. Agent Settings: Network configuration

**Source:** visual

**Docs coverage:** covered

The Network configuration section in the Settings tab provides a scrollable, read-only JSON code block detailing the agent's network interfaces, IP addresses, and MAC addresses.

**Timestamps:** 01:48

## 10. Web Agent: Usage heatmap

**Source:** visual

**Docs coverage:** covered

The 'Usage' tab for a Web agent displays a heatmap matrix titled 'Usage percentage average', showing utilization levels with hours of the day as rows and days of the week as columns.

**Timestamps:** 01:59

## 11. Web Agent: Parallel tests capacity

**Source:** visual

**Docs coverage:** covered

In a Web agent's 'Capacity' tab, a dropdown menu allows configuring the number of parallel tests the agent can run simultaneously, with options ranging from '1 parallel test' up to '10 parallel tests'.

**Timestamps:** 02:07, 02:08

## 12. Maintenance mode controls

**Source:** visual

**Docs coverage:** covered

Click 'Set agent in maintenance' at the top right of an agent's details to toggle maintenance mode. After confirming, a 'Maintenance' badge appears by the agent name, and the button changes to 'Remove from maintenance' to reverse the state.

**Timestamps:** 02:18, 02:22, 02:24

## 13. Test-only mode controls

**Source:** visual

**Docs coverage:** covered

Click the flask icon button at the top right to activate Test-only mode. A modal asks for confirmation and warns that active monitors will be paused. Once active, the button turns green and is labeled 'Test-only mode'. Clicking it again opens a modal to exit the mode and unpause monitors.

**Timestamps:** 02:30, 02:49, 02:54
