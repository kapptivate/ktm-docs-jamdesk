# Features in Admin-API-Keys.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Full-quality (GCS) analysis. Gap analysis against: `administration/api-keys.mdx`, `administration/api-keys/create.mdx`, `administration/api-keys/manage.mdx`_

## 1. API keys list

**Source:** visual

**Docs coverage:** covered

The main page displays a list of all API keys in the workspace. Each row shows the API Key Name, a masked Token string, and an Access column indicating how many teams the key is assigned to (e.g., '1 team'). A search bar is available at the top to filter the list.

**Timestamps:** 00:03

## 2. Edit an API key

**Source:** visual

**Docs coverage:** outdated — The docs state to open the '⋮ menu' or click anywhere on the row to edit. The video shows clicking a specific pencil icon on the right side of the row, and there is no ⋮ menu.

Click the pencil icon on the right side of a key's row to open the 'Edit API Key' side panel. From here, you can modify the key's Name, adjust the assigned teams in the 'Select teams allowed to use this key' dropdown, or permanently remove the key using the 'Revoke API Key' button at the bottom of the panel.

**Timestamps:** 00:48, 00:50

## 3. Create an API key

**Source:** both

**Docs coverage:** covered

Click the '+ Create API Key' button in the top right to open a creation modal. Enter a 'Name' and use the 'Select teams allowed to use this key' dropdown to assign access. Clicking 'Create' opens an 'API Key created' modal that displays the new token with a copy button, warning that for security reasons it will not be displayed again.

**Timestamps:** 00:55, 01:08

## 4. Refresh an API token

**Source:** visual

**Docs coverage:** covered

To generate a new token for an existing key, click the refresh icon located next to the masked token in the list. A 'Refresh Token?' confirmation modal appears, warning that applications will lose access. Confirming by clicking 'Refresh token' opens a one-time view modal displaying the newly generated token.

**Timestamps:** 01:21, 01:25

## 5. Delete an API key

**Source:** visual

**Docs coverage:** outdated — The docs refer to this action as 'Revoke' via a '⋮ menu'. The video shows a trash can icon directly on the row that triggers a 'Delete API Key?' modal with a 'Delete' button.

To permanently remove a key directly from the list, click the trash can icon on its row. This opens a 'Delete API Key?' confirmation modal, warning that applications using the key will lose access to the application. Click the 'Delete' button to confirm.

**Timestamps:** 01:30
