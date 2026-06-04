# Features in KTM.Agents.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Full-quality (GCS) analysis. Gap analysis against: `equipment/agents.mdx`, `equipment/statuses.mdx`_

## 1. Agent category tabs

**Source:** both

**Docs coverage:** covered

The main Agents screen groups available agents into four tabs: Cellular Agents, Smartphone Agents, Web Agents, and Passive Agents, with the total count displayed next to each category name.

**Timestamps:** 00:02

## 2. Agent list filters

**Source:** visual

**Docs coverage:** outdated — The docs list the status filter option as "Test-only", but the video shows the option is explicitly named "Test-only mode".

Users can filter the agent list using a search bar, a Zone dropdown for location-based filtering, and a Status dropdown containing the options: Online, Offline, Maintenance, Waiting for configuration, and Test-only mode.

**Timestamps:** 00:23, 00:27

## 3. SIM agent connected devices list

**Source:** both

**Docs coverage:** outdated — The docs state the Access column shows "the number of access entries," but the video shows it displays product/network tags.

On a SIM agent's Connected devices tab, a list of SIM slots is displayed with columns for the SIM's phone number, status, network provider, health badge (which shows a 7-day usage percentage on hover), Access tags indicating products/networks the SIM belongs to, and monitor count.

**Timestamps:** 00:45, 00:51

## 4. Agent monitors management

**Source:** both

**Docs coverage:** covered

The Monitors tab displays a list of active monitors running on the agent. Users can view their statuses and pause them all at once using the "Pause all monitors" button.

**Timestamps:** 00:59

## 5. Agent settings: Automatic updates and reboots

**Source:** both

**Docs coverage:** outdated — The docs mention toggling automatic updates and reboots but omit that users can configure a specific day and time schedule for each.

In the agent's Settings tab, users can toggle "Automatic updates" and "Automatic reboot". When enabled, each setting reveals a dropdown menu to configure a specific schedule (e.g., "Every day at 03:00").

**Timestamps:** 01:08, 01:14

## 6. Read-only network configuration

**Source:** both

**Docs coverage:** covered

The Settings tab includes a Network configuration section that displays a read-only JSON viewer detailing the agent's network interfaces, IP addresses, and MAC addresses.

**Timestamps:** 01:48

## 7. Smartphone agent connected devices list

**Source:** visual

**Docs coverage:** outdated — The docs miss the "Access" column entirely for smartphone devices.

On a Smartphone agent's Connected devices tab, a list of connected phones is displayed with columns for Model, Status, UUID, Usage badge, Access tags, and Monitors count.

**Timestamps:** 01:38

## 8. Web agent usage heatmap

**Source:** visual

**Docs coverage:** covered

The Usage tab for Web agents displays a weekly-average utilization heatmap, showing the busy percentage hour-by-hour across the days of the week.

**Timestamps:** 02:04

## 9. Web agent capacity configuration

**Source:** visual

**Docs coverage:** covered

The Capacity tab for Web agents features a dropdown menu allowing users to select the maximum number of parallel tests the agent can run, with options ranging from 1 to 10 parallel tests.

**Timestamps:** 02:10

## 10. Agent maintenance mode

**Source:** both

**Docs coverage:** covered

Users can put an agent into maintenance by clicking "Set agent in maintenance" in the top right. This pauses test executions until the user removes it from maintenance.

**Timestamps:** 02:22

## 11. Test-only mode activation and deactivation

**Source:** both

**Docs coverage:** outdated — The docs describe activating test-only mode but falsely state "the button stays highlighted"—instead, a new indicator chip and an "Exit test-only mode" button appear. The docs also omit the specific deactivation dialog that resumes paused monitors.

Clicking "Test-only mode" opens a confirmation dialog warning that active monitors will be paused. Once activated, the UI shows a blue "Test-only mode activated" indicator and an explicit "Exit test-only mode" button. Clicking exit opens a dialog confirming that paused monitors will be resumed.

**Timestamps:** 02:48, 02:56
