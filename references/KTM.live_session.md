# Features in KTM.live_session.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-05._

_Full-quality (GCS) analysis. Gap analysis against: `tests/live-session.mdx`, `tests/builder.mdx`_

## 1. Live session tabs

**Source:** visual

**Docs coverage:** new — The docs mention Live session briefly in a card but do not document its interface, tabs, or supported targets like SIMs and Web agents.

The Live session interface is divided into two primary sections at the top: **Remote control** (for active sessions) and **History** (for logs). Within Remote control, you can switch between three target categories: **SIMs**, **Smartphones**, and **Web**, each offering specialized tools for that platform.

**Timestamps:** 00:06

## 2. Resource list

**Source:** visual

**Docs coverage:** new — The docs do not document the live session resource list, connection indicators, or availability states.

The left panel displays available resources (SIMs, smartphones, or web agents) based on the selected category. Each card shows the resource name (e.g., "SIM 002"), a colored connection status dot (green for online), its availability state (such as `IDLE`), and any applied tags. Selecting a resource opens its remote control interface.

**Timestamps:** 00:07, 00:50

## 3. SIM remote actions

**Source:** both

**Docs coverage:** new — The docs do not cover SIM management or the available remote manual actions for SIM cards.

Selecting a SIM card provides a dropdown menu of manual actions you can execute on it. Options include: USSD Command, Send SMS, Call, Read SMS, FTP Download, Download File, FTP Upload, Get network profile, HTTP Upload, HTTP GET, Ping, TCP Ping, Reset Modem, Thermostat, Fetch SSL Certificate, and Youtube.

**Timestamps:** 00:26

## 4. USSD Command execution

**Source:** both

**Docs coverage:** new — The docs do not mention USSD commands or access technology settings.

When executing a USSD command on a SIM, you can enter the USSD shortcode in the text input and use the "Access technology" dropdown to select the network type (`AUTO`, `2G`, `3G`, or `4G`).

**Timestamps:** 00:30

## 5. Send SMS execution

**Source:** visual

**Docs coverage:** new — The docs do not cover sending SMS messages or configuring SMS parameters in the live session.

When sending an SMS via a SIM, you can input the destination number and message text. Additional settings include setting a "Wait for delivery report" time (in seconds) and a "Change default SMSC" checkbox before clicking the send button.

**Timestamps:** 00:37

## 6. Smartphone remote control

**Source:** both

**Docs coverage:** new — The docs briefly mention driving a real device but do not detail the remote control interface or how physical interactions are handled.

Connecting to a smartphone displays a real-time view of the physical device's screen. You can interact with it directly by clicking and swiping on the stream, and these gestures are transmitted live to the remote device.

**Timestamps:** 00:59

## 7. Smartphone control panel and quick access

**Source:** both

**Docs coverage:** new — The docs do not document the control panel, quick access buttons, or the device info pane.

The right panel alongside the smartphone screen provides device control tools. The **Information** section lists network, resolution, OS, and battery details. The **Control Panel** offers icons for Restart Phone, Install Apk, Take screenshot, Start recording, Start Appium, Rotate screen, Get XML, and More. The **Quick Access** section provides software equivalents for hardware buttons: Back, Home, Recent apps, Lock, Volume down, Volume up, and Power.

**Timestamps:** 01:14

## 8. XML Viewer

**Source:** both

**Docs coverage:** new — The docs do not document the XML Viewer or the ability to inspect the UI element tree during a live session.

Clicking "Get XML" in the control panel opens an XML Viewer modal showing the UI element hierarchy of the current screen. Hovering over nodes in the XML tree automatically highlights the corresponding element with a blue overlay on a screenshot preview. A "Copy" button lets you copy the XML to your clipboard.

**Timestamps:** 01:27

## 9. Web agent remote actions

**Source:** both

**Docs coverage:** new — The docs do not cover web agents in the live session or their available manual actions.

Selecting a web agent provides a dropdown of manual actions similar to SIMs, allowing you to run network and web requests. Options include API Call, DNS, Send Mail, FTP Download, HTTP Download, Get network profile, FTP Upload, HTTP Upload, Ping, TCP Ping, Reset Modem, Thermostat, Fetch SSL Certificate, and Youtube.

**Timestamps:** 01:38

## 10. Web API Call configuration

**Source:** visual

**Docs coverage:** new — The docs do not cover manual API call configuration or network override options in the live session.

When configuring an API Call on a web agent, you can input the endpoint URL and define Headers and Body content in their respective tabs. Additional execution checkboxes include Custom proxy, Override DNS (with a plus button to add entries), Ignore SSL certificate, Preserve Cookies, and Follow Redirection.

**Timestamps:** 01:40

## 11. Live session history

**Source:** visual

**Docs coverage:** new — The docs do not document the live session history log or its filtering capabilities.

The top-level History tab logs actions executed during live sessions (such as sending or waiting for an SMS). The log lists the timestamp, status badge (e.g., `Pass`), and details of each event. You can filter the history using dropdowns for Sender and Receiver, as well as a date range picker.

**Timestamps:** 01:56

## Verification notes (read before reusing)

Screenshot review corrected several extracted claims; the docs were written from the frames, not the text above:

- **Feature 3 (SIM actions)**: the on-screen dropdown is categorized USSD / SMS / Data / Call. Actual entries: USSD Command; Send SMS; PDP Activation, Ping, TCP Ping, HTTP Ping, DNS Lookup, Download File, HTTP Upload, FTP Download, FTP Upload, Send Mail, API Call, Ookla Speedtest, Traceroute, Check SSL/TLS Certificate, Youtube; Wait Call, Place Call. "Read SMS", "Get network profile", "HTTP GET", "Reset Modem", "Thermostat", and "Fetch SSL Certificate" do not appear.
- **Feature 4 (Access technology)**: options are Default, AUTO, 5G, 4G, 3G, 2G (Default and 5G were missed).
- **Feature 9 (Web actions)**: actual entries: API Call, DNS Lookup, Send Mail, FTP Download, FTP Upload, Get webpage or file, HTTP Upload, HTTP Ping, Ping, TCP Ping, Ookla Speedtest, Traceroute, Check SSL/TLS Certificate, Youtube. "HTTP Download", "Get network profile", "Reset Modem", and "Thermostat" do not appear.
- **Feature 11 (History filters)**: the filters are **Creator** and **Resource** (not Sender/Receiver). The History page also has an **Action List** panel with **Create test** and **Report** buttons, fed by per-entry **Add** buttons (missed by the extraction).
- Not extracted but visible: **Record Macro**, **Spectate**, and **Expert mode** buttons at the top of SIM and web sessions (00:26–01:40).
