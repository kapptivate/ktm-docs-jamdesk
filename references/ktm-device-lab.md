# Features in ktm-device-lab.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Gap analysis against: `equipment/devices-lab.mdx`, `equipment/statuses.mdx`_

## 1. Devices list views

**Source:** visual

**Docs coverage:** covered

The lab provides two tabs, 'SIMs' and 'Smartphones', listing connected devices in a table. The tables display columns such as Name/number or Model/ID, Status, Network (for SIMs), UUID (for smartphones), Usage, Access, Monitors, and Host.

**Timestamps:** 00:00, 01:00

## 2. Search and filter devices

**Source:** visual

**Docs coverage:** covered

Above the device list, a search input allows finding specific devices. Two dropdowns filter the list: a Status dropdown (options: Active, Archived) and a Products multi-select dropdown to filter by assigned products.

**Timestamps:** 00:15, 00:20, 00:23

## 3. Status and Network tooltips

**Source:** visual

**Docs coverage:** new — The documentation does not mention that hovering over the Status or Network badges displays detailed connection data, such as network name, signal strength, or connection timestamps.

Hovering over a device's Status or Network badge displays a tooltip with connection details, such as 'Connected to: [network], Signal: [level]' for SIMs, or a connection timestamp ('Connected since [date]') for smartphones.

**Timestamps:** 00:33, 01:04

## 4. Usage badge tooltip

**Source:** visual

**Docs coverage:** new — The documentation omits that hovering over the Usage badge shows the exact weekly average percentage.

Hovering over the Usage badge (e.g., 'Healthy' or 'Not used') in the device table reveals a tooltip showing the exact weekly average utilization percentage (e.g., 'Used at 14.77% (weekly average)').

**Timestamps:** 00:36, 01:11

## 5. Access count tooltip

**Source:** visual

**Docs coverage:** new — The documentation misses that hovering over the Access count reveals a list of the specific products assigned to the device.

Hovering over the numerical Access count in the device list opens a tooltip listing the specific products assigned to that device (e.g., 'Tracing rules, SMS, Banking SMS, Cellular data...').

**Timestamps:** 00:38

## 6. Host details tooltip

**Source:** visual

**Docs coverage:** new — The documentation does not mention the tooltips on the Host column that reveal the agent's status, location, or firmware.

Hovering over a device's Host column badge reveals a tooltip that displays either the host agent's status and physical location, or its firmware version.

**Timestamps:** 00:40, 01:13

## 7. Device detail top actions

**Source:** visual

**Docs coverage:** covered — The documentation lists the actions but omits the descriptive hover tooltip on the 'Test-only mode' button.

The top right of a device's detail page provides three action buttons: 'Reboot slot' (for SIMs), 'Test-only mode', and 'Launch live session'. Hovering over 'Test-only mode' shows a tooltip: 'Pause all monitors and make this device available for manual testing'.

**Timestamps:** 01:20, 02:28

## 8. Product access controls

**Source:** visual

**Docs coverage:** covered — The documentation describes restricting access but does not mention the red trash icons used to remove products from the allowed list.

On the General tab, a toggle switch 'This device can be used by all the products' controls broad access. When disabled, the user can manage a specific list of allowed products using a '+ Add product' button and a red trash icon next to each product to revoke its access.

**Timestamps:** 01:25, 01:28

## 9. Usage heatmap

**Source:** visual

**Docs coverage:** covered

The Usage tab displays a weekly-average utilization heatmap, illustrating the device's usage percentage for each hour across the days of the week, alongside a global average usage metric for the past week.

**Timestamps:** 01:35

## 10. Device monitors list

**Source:** visual

**Docs coverage:** covered

The Monitors tab lists the active monitors assigned to the device, indicating each monitor's name, status (e.g., Up, Paused), frequency, and location.

**Timestamps:** 01:43

## 11. SIM Settings

**Source:** visual

**Docs coverage:** covered

The Settings tab for a SIM card includes an 'About' section to edit the device name and MSISDNs, and a 'SIM Details' section showing read-only information like IMSI, ICCID, Type, ISO code, Country, Operator, and network details.

**Timestamps:** 01:54, 02:12

## 12. Live session launch

**Source:** visual

**Docs coverage:** covered

Clicking 'Launch live session' opens an interactive remote control interface for the device, displaying tabs for 'Remote control' and 'History'.

**Timestamps:** 02:35, 02:38

## 13. Smartphone Settings and Props

**Source:** visual

**Docs coverage:** covered — The documentation mentions the Props JSON object but omits the 'Copy' button provided to easily copy the JSON text.

The Settings tab for a smartphone includes 'About' to rename the phone, 'Smartphone Details' for read-only identifiers (UUID, URL, Type, Model), and a 'Props' section displaying device properties in a JSON block, which includes a 'Copy' button.

**Timestamps:** 03:00, 03:13

## 14. Workspace switcher

**Source:** visual

**Docs coverage:** new — The documentation does not mention the workspace switcher in the sidebar.

A dropdown menu located at the top of the left sidebar allows the user to switch the current workspace (e.g., from 'Demo' to 'La Poste - Identité numérique').

**Timestamps:** 03:36, 03:41
