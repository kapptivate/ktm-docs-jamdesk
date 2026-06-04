# Features in Admin-API-Keys.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Gap analysis against: `administration/api-keys.mdx`, `administration/api-keys/create.mdx`, `administration/api-keys/manage.mdx`_

## 1. API Keys List

**Source:** visual

**Docs coverage:** outdated — The docs claim there is a search box to filter keys by name, but no search box is present in the UI. The docs also incorrectly mention a "⋮ menu" at the end of each row.

A list displaying all API keys with columns for Name, Token (showing masked dots and a refresh icon), and Access (showing the number of teams with access). Clicking anywhere on a row opens the Edit panel.

**Timestamps:** 00:05, 01:20

## 2. Edit API Key Panel

**Source:** visual

**Docs coverage:** outdated — The docs instruct users to "Open the ⋮ menu on a key's row and choose Edit", but there is no such menu; users click the row directly to open a side panel instead.

Clicking on an API key row opens an "Edit API Key" side panel from the right side of the screen. It allows modifying the key's Name and adjusting the selected teams. The panel also contains a red "Revoke API Key" button at the bottom.

**Timestamps:** 00:50

## 3. Create API Key

**Source:** visual

**Docs coverage:** covered

Clicking the red "Create API Key" button at the top right opens a modal. Users can input a "Name" and choose from a "Select teams allowed to use this key" dropdown containing options like `kapptivate_employees`, `Super User`, `demo`, `QA`, `Admin Account`, `Support Team`, and `Testing`. Submitting opens a success modal with the generated token and a copy button.

**Timestamps:** 00:53, 01:03, 01:10

## 4. Refresh Token

**Source:** visual

**Docs coverage:** outdated — The docs refer to this action as "Rotate a token", but the UI labels the modal and button as "Refresh token?".

Clicking the circular arrows (refresh) icon next to the masked token in the list opens a "Refresh token?" confirmation modal. Confirming it generates a new token and displays it in a one-time success modal with a copy button.

**Timestamps:** 01:21, 01:23, 01:26

## 5. Revoke API Key

**Source:** visual

**Docs coverage:** outdated — The docs instruct users to "Open the ⋮ menu on the key's row and choose Revoke", but there is no ⋮ menu; users instead click a trash can icon on the row or use the button in the edit panel.

Clicking the trash can icon on the far right side of a key's row opens a "Revoke API key?" confirmation modal warning that the action cannot be undone. Confirming permanently deletes the key. Revocation can also be initiated from the bottom of the "Edit API Key" side panel.

**Timestamps:** 01:29, 01:31
