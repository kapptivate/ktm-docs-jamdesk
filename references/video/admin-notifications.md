# Features in admin-notifications.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Full-quality (GCS) analysis. Gap analysis against: `administration/notifications.mdx`_

## 1. Robot availability toggle

**Source:** both

**Docs coverage:** covered

A master switch labeled 'Trigger alert after an unavailability of N minutes' that enables or disables workspace-wide alerts for when robots go offline and when they reconnect.

**Timestamps:** 00:15

## 2. Unavailability timeout dropdown

**Source:** visual

**Docs coverage:** outdated — The documentation states the options are "from 5 to 30 minutes in 5-minute increments," but the video shows the options are 1, 3, 5, 10, 15, and 30 minutes.

A dropdown menu to select the duration a robot must be disconnected before an alert is triggered. The available options are 1, 3, 5, 10, 15, and 30 minutes.

**Timestamps:** 00:20

## 3. Email notifications

**Source:** both

**Docs coverage:** outdated — The documentation says to "enter the recipient addresses," but the video shows the user selecting recipients from a multi-select dropdown menu of workspace users.

A toggle to enable sending alerts via email. When enabled, it reveals a 'Select users who should be notified' field, which opens a dropdown menu to select multiple recipients from a list of existing workspace users.

**Timestamps:** 00:29

## 4. Slack notifications

**Source:** both

**Docs coverage:** covered

A toggle to enable alerting via Slack. It exposes a text field to input the 'Slack webhook link' and provides a helper link labeled 'Create webhook link in Slack' for setup.

**Timestamps:** 00:30

## 5. Microsoft Teams notifications

**Source:** both

**Docs coverage:** covered

A toggle to enable alerting via Microsoft Teams. It includes a text field for the 'Microsoft Teams webhook link' and a helper link labeled 'Create webhook link in Microsoft Teams'.

**Timestamps:** 00:32

## 6. Webhook notifications

**Source:** both

**Docs coverage:** covered

A toggle to send alerts to custom client systems via an HTTP POST. It requires providing a 'Webhook link'.

**Timestamps:** 00:35

## 7. Webhook custom headers

**Source:** both

**Docs coverage:** covered

Within the Webhook notifications section, clicking 'Add header' creates a row with 'Key' and 'Value' text inputs to pass custom HTTP headers (such as authorization tokens) with the payload. Each header row has a trash icon to remove it.

**Timestamps:** 00:41
