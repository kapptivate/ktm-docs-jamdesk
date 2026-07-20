# Features in ktm-device-lab.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Full-quality (GCS) analysis. Gap analysis against: `equipment/devices-lab.mdx`, `equipment/statuses.mdx`_

## 1. Device list search and filters

**Source:** both

**Docs coverage:** covered

Above the device tables, you can search and filter the list. The Status filter toggles between 'Active' (default) and 'Archived'. The Products filter is a multi-select dropdown to view devices assigned to specific products (options shown include Absa Bank, Android & iOS App, APIs, Calls & IVR, Carrefour, Cellular data, Demo, devices-availability, E-commerce, Exista).

**Timestamps:** 00:20, 00:22

## 2. SIM Network and Usage tooltips

**Source:** visual

**Docs coverage:** new — The documentation describes network and usage statuses but does not mention that hovering over these badges reveals tooltips with the specific network name, signal level, and exact usage percentage.

In the SIMs table, hovering over the Network badge displays a tooltip with the specific connected network name and signal condition (e.g., 'Connected to: kapptivate network', 'Signal: OK'). Hovering over the Usage badge displays a tooltip with the exact weekly average percentage (e.g., 'Used at 10.17% (weekly average)').

**Timestamps:** 00:31, 00:34

## 3. Host details popover

**Source:** both

**Docs coverage:** new — The documentation mentions the host column but does not document the hover popover that displays the agent's status, location, and modem firmware.

In both the SIMs and Smartphones tables, hovering over the agent pill in the Host column opens a popover. This popover displays the agent's Status (e.g., Online), Location (e.g., Europe/France/Bordeaux), and, for SIM cards, the Firmware version of the modem.

**Timestamps:** 00:41, 01:13

## 4. SIM General tab

**Source:** both

**Docs coverage:** outdated — The documentation states that the SIM General tab displays the 'IMSI', but the video shows it displays the 'Phone number' instead.

Clicking a SIM opens its detail page. The General tab contains an About section showing Name, Hosted on, Phone number, Location, Network, and Usage. A Products section allows you to toggle whether 'This SIM can be used by all the products'; when turned off, you can use an '+ Add product' button to specify allowed products.

**Timestamps:** 01:22, 01:26

## 5. Device Usage tab

**Source:** both

**Docs coverage:** covered

The Usage tab shows the device's weekly average utilization percentage and a heatmap table titled 'Usage details on last week'. The heatmap columns represent days (Mon-Sun) and rows represent hours (0h-23h), with each cell showing the precise percentage the device was utilized.

**Timestamps:** 01:36

## 6. Device Monitors tab

**Source:** both

**Docs coverage:** covered

The Monitors tab lists active monitors assigned to the device, grouped by product or suite. It displays each monitor's Status (e.g., Up, Paused), name, frequency (e.g., 1 min., 15 min.), Location, and Device. Users can pause individual monitors with a row-level toggle or use the 'Pause all monitors' button.

**Timestamps:** 01:45

## 7. SIM Settings tab

**Source:** both

**Docs coverage:** covered

The Settings tab for a SIM provides an About section to rename the device and set National/International MSISDN numbers. The SIM Details section is read-only and displays the IMSI, ICCID, Type (e.g., 'V' for virtual or 'R' for roaming), ISO code, Country, Operator (e.g., iliad/FREE Mobile), Registered network name, Registered network plmn, and Modem firmware.

**Timestamps:** 01:59, 02:11

## 8. Device Detail top actions

**Source:** both

**Docs coverage:** covered

At the top right of a device's detail page, three controls are available: a 'Reboot slot' button for SIMs, a 'Test-only mode' toggle that pauses all monitors and reserves the device for manual testing (shown in its hover tooltip), and a 'Launch live session' button that opens the Remote control interface.

**Timestamps:** 02:29, 02:37

## 9. Smartphone General tab

**Source:** both

**Docs coverage:** new — The documentation does not mention the 'Edit smartphone' button present in the About section of the smartphone General tab.

The General tab for a smartphone displays an icon of the phone (Apple or Android) and an About section detailing the Name, Model (e.g., samsung SM-A057G or iPhone 12), Hosted on, and Location. It also features an 'Edit smartphone' button next to the device details.

**Timestamps:** 02:46, 03:53

## 10. Smartphone Settings tab

**Source:** both

**Docs coverage:** covered

The Settings tab for a smartphone allows renaming the device in the About section. The Smartphone Details section shows read-only values for UUID, URL (e.g., wss://...), Type (android or ios), and Model. The Props section displays a JSON block containing device properties like screen resolution, OS version, and manufacturer, complete with a copy button.

**Timestamps:** 03:10, 04:06
