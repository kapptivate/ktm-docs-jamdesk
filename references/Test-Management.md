# Features in Test-Management.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Full-quality (GCS) analysis. Gap analysis against: `tests/overview.mdx`, `tests/create.mdx`, `tests/builder.mdx`, `tests/suites.mdx`, `tests/configurations.mdx`, `tests/reusable-components.mdx`_

## 1. Product filtering sidebar

**Source:** both

**Docs coverage:** new — The documentation does not mention the product selection sidebar used to filter the workspace.

A left sidebar under the 'PRODUCT' section that allows users to filter the workspace by specific products. Clicking a product (e.g., 'Websites') updates the main view to show only the collections, tests, and campaigns belonging to that product space.

**Timestamp:** 00:44

## 2. Tests table and favorites

**Source:** both

**Docs coverage:** covered

The main Tests tab displays a table with columns: test name, status, last update, and creator. A star icon next to a test's name indicates it is a favorite. Favorited tests bypass alphabetical sorting and are pinned to the top of the list.

**Timestamp:** 00:52

## 3. Inline status dropdown

**Source:** both

**Docs coverage:** outdated — The docs state the status is a badge and mention changing status via bulk actions, but the video shows the badge is actually an inline dropdown to instantly change the status.

The Status column features a clickable badge that acts as a dropdown menu. Users can click it to instantly change a test's status inline to 'Draft', 'In progress', 'Approved', or 'Deprecated' without opening the editor or using bulk actions.

**Timestamp:** 01:00

## 4. Test row actions menu

**Source:** both

**Docs coverage:** outdated — The docs describe performing actions like Duplicate, Move, and Delete via a bulk action banner, but omit the row-level 3-dot menu. Options like 'Replace existing test' and 'View connections' are missing entirely.

Each test row has a 3-dot context menu providing actions: 'Edit', 'Remove from / Add to favorites', 'Add tag(s)', 'Lock', 'Duplicate', 'Create copy in other product', 'Move test...', 'Replace existing test', 'Delete', 'Create monitor', and 'View connections'.

**Timestamp:** 01:12

## 5. Add tags modal

**Source:** both

**Docs coverage:** new — The docs mention filtering by tags but omit the 'Add tag(s)' row action and the modal for assigning tags to a test.

Selecting 'Add tag(s)' from a test's row menu opens a modal. Users can click the input to view a dropdown of existing tags or type to assign new color-coded tags (e.g., 'Web') to the test, saving via the 'Save' button.

**Timestamp:** 01:19

## 6. Move test modal

**Source:** both

**Docs coverage:** new — The docs mention moving tests via bulk actions but do not describe the specific 'Move test' modal and collection picker for individual tests.

Selecting 'Move test...' from the row menu opens a modal with a searchable directory tree of available collections. Users select a destination folder (e.g., 'Emails') and click 'Move test' to relocate the scenario.

**Timestamp:** 01:34

## 7. Run test action

**Source:** both

**Docs coverage:** covered

A primary 'Run' button on the far right of each test row. Clicking it immediately navigates the user to the 'Run confirmation' execution setup page for that specific test.

**Timestamp:** 01:43

## 8. Replace existing test

**Source:** both

**Docs coverage:** new — The docs do not document the 'Replace existing test' workflow, the modal, or the 'Delete source test' option.

Users can overwrite a test with another one (e.g., replacing an original with an updated duplicate). From the updated test's 3-dot menu, selecting 'Replace existing test' opens a modal to select the target test to be overwritten. A 'Delete source test' checkbox (checked by default) cleans up the duplicate after the replacement is executed.

**Timestamp:** 02:11
**Timestamp:** 02:19

## 9. Collection management actions

**Source:** both

**Docs coverage:** new — The docs mention creating collections and moving tests, but omit the 3-dot menu on collection folders providing Rename, Duplicate, Move collection, and Delete actions.

Users can manage folders via a 3-dot menu on any collection card, which provides options to 'Rename', 'Duplicate', 'Move collection...', or 'Delete'. A 'Create collection' button is also available at the top right of the page.

**Timestamp:** 02:32

## 10. Create new test modal

**Source:** both

**Docs coverage:** outdated — The docs claim the Create button prompts you to select 'Web, Smartphone, Cellular, or API', but the video shows the options are 'Classic', 'Web (New experience)', and 'Smartphone (New experience)'.

Clicking the '+ Create new test' button opens a modal offering three authoring environment choices: 'Classic' (legacy experience), 'Web (New experience)', and 'Smartphone (New experience)'.

**Timestamp:** 02:38

## 11. Tests campaigns table

**Source:** both

**Docs coverage:** covered

The 'Tests campaigns' tab displays suites of tests. The table includes columns for the campaign name, the number of tests it contains, 'Last update', and 'Creator'. A left sidebar allows filtering campaigns by collection.

**Timestamp:** 03:00

## 12. Campaign editor layout

**Source:** both

**Docs coverage:** covered

Clicking a campaign opens its edit view. It features an 'About' section for the name and description, and a 'Your tests' timeline showing the ordered list of tests that will execute sequentially between the 'Campaign start' and 'Campaign end' markers.

**Timestamp:** 03:08

## 13. Per-test campaign parameters

**Source:** both

**Docs coverage:** covered

In the campaign editor, clicking a test row expands its details to reveal 'Execution parameters'. Users can configure the 'Starting URL', select a 'Device' and 'Browser preset' from dropdowns, and input specific overrides for global variables (like passwords) for that specific step in the suite.

**Timestamp:** 03:17

## 14. Campaign run queue sidebar

**Source:** both

**Docs coverage:** outdated — The docs describe the run queue as showing a 'suite card to expand' on a page, but the video reveals it as a slide-out right sidebar with a 'Clear queue' confirmation workflow.

Clicking 'Run' on a campaign (from the table or editor) slides out a 'Run queue' sidebar on the right. It displays queued campaign execution cards and provides a 'Clear queue' button that, when clicked, prompts a confirmation dialog to empty all pending runs.

**Timestamp:** 04:00
**Timestamp:** 04:05

## 15. Campaign row actions menu

**Source:** both

**Docs coverage:** outdated — The docs state you click 'Move' or 'Delete' directly on a 'suite card', but the video shows these actions inside a 3-dot menu on table rows.

A 3-dot menu on each campaign row in the table provides actions to 'Move test campaign' to another collection or 'Delete' the campaign entirely.

**Timestamp:** 04:14

## 16. Reusable components table

**Source:** both

**Docs coverage:** new — The docs mention reuse tracking but do not describe the table columns (Usage chip, Steps count) or the color-coded icons (purple for used, grey for unused).

The 'Reusable components' tab lists modular test sequences. The table displays the component name, a 'Usage' chip indicating how many tests use it, and a 'Steps count'. The connection icon next to the name is color-coded: purple if the component is actively used, and grey if it is not.

**Timestamp:** 04:26

## 17. Component usage modal

**Source:** both

**Docs coverage:** new — The docs do not mention that clicking the usage tracking chip opens an interactive modal listing the dependent tests with direct 'Edit' shortcut buttons.

Clicking the 'Used in X test' chip on a component opens a 'Used in tests' modal. It lists the dependent scenarios by name and creator, and provides a direct 'Edit' button to navigate to each test's builder.

**Timestamp:** 04:32
