# Features in KTM-execution-campaigns-cicd-github.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-05._

_Full-quality (GCS) analysis. Gap analysis against: `tests/suites.mdx`, `executions/ci-cd.mdx`, `executions/overview.mdx`_

## 1. Campaign editor and variable presets

**Source:** both

**Docs coverage:** outdated — The docs state 'Global variables: override values for this test only', but the video shows users selecting a variable preset (like 'production' or 'dev-1') from a dropdown to automatically populate input variables.

Clicking a campaign opens its editor, displaying an 'About' section and an ordered 'Your tests' timeline. Clicking a specific test opens a right-hand 'Execution parameters' panel to override the Starting URL, Device, and Browser preset. For variables, users can select a preset environment from a dropdown (options shown include 'Default (2)', 'production', and 'dev-1') which automatically populates the corresponding input variables below it (e.g., 'id_kapptivate_Sophie', 'password_kapptivate_SophieTest').

**Timestamp:** 00:11
**Timestamp:** 00:20

## 2. Run confirmation page

**Source:** visual

**Docs coverage:** outdated — The docs claim 'The Run queue slides out as a right sidebar showing the queued campaign cards', but the video actually shows a full-screen 'Run confirmation' page that must be reviewed and submitted.

Clicking the 'Run' button opens a full-screen 'Run confirmation' page rather than executing immediately. The page prompts the user to 'Give a name to your test to give it context' (which defaults to the campaign name). Below this, a 'Your tests' section lists all tests in the execution, allowing users to review or adjust the 'Owners' (e.g., 'kapp-demo-web-1') and 'Input variables' dropdowns for each before pressing the 'Confirm run' button in the top right.

**Timestamp:** 00:27

## 3. Multi-test execution overview

**Source:** both

**Docs coverage:** new — The documentation does not describe the multi-test execution view, its top-level metric counters, or the left navigation sidebar.

When a campaign execution starts, or when viewed from the execution history, a dedicated multi-test execution view is displayed. The main view features top-level summary metrics: 'Success executions', 'Failed executions', 'Unexecuted', and 'Total duration' (which counts up in real-time during a live run). A left sidebar provides an 'About' section for navigation and a 'Tests' section listing all included tests.

**Timestamp:** 00:30
**Timestamp:** 00:48

## 4. Execution time chart

**Source:** both

**Docs coverage:** new — The documentation entirely omits the 'Execution time' chart used to visualize and compare test durations within a campaign.

Inside a multi-test execution view, clicking 'Execution time' under the 'About' section in the left sidebar reveals a bar chart. This chart plots the duration of each test in the campaign, with execution time on the Y-axis (e.g., 5s, 10s, 15s, 20s) and test indices on the X-axis, allowing users to visually compare which tests took the longest.

**Timestamp:** 00:39
**Timestamp:** 00:50

## 5. Individual test navigation in campaign executions

**Source:** visual

**Docs coverage:** new — The docs lack information on using the left sidebar in a campaign execution to navigate directly to individual test step results and HTTP details.

In the multi-test execution view, the left sidebar lists all the individual tests that make up the campaign under a 'Tests' heading (e.g., '1 - Test Export des variables (API)'). Clicking on one of these tests replaces the main overview area with the detailed step-by-step results for that specific test. This includes input variables, step statuses, and HTTP details organized into 'Headers', 'Body', and 'Performance' tabs, all accessible without leaving the campaign execution context.

**Timestamp:** 00:54

## 6. Campaign bulk selection checkboxes

**Source:** visual

**Docs coverage:** new — The documentation mentions moving and deleting campaigns via the row's three-dot menu but fails to mention the checkbox selection and top-bar actions for bulk management.

On the Test campaigns list, users can hover over the left side of a row and click a checkbox to select a campaign. Checking one or more campaigns enables multi-select mode, displaying top-bar options like a 'Trash' button and 'Create collection', which allows users to perform bulk actions on multiple campaigns at once.

**Timestamp:** 01:03

## 7. CI/CD test summary in GitHub Actions

**Source:** both

**Docs coverage:** new — The docs provide only a basic CLI command snippet and completely omit the rich 'Kapptivate Test Results' summary table and its deep-linking capabilities inside GitHub Actions.

When a suite is executed in a CI/CD pipeline like GitHub Actions using the Kapptivate CLI, a custom 'Kapptivate Test Results' summary table is generated directly in the workflow run summary. The table includes columns for 'Status' (pass/fail icons), 'Test' (the test name, e.g., 'stdin'), 'Duration', and a 'Link' column containing 'View' links. Clicking a 'View' link deep-links the user directly to that specific test execution in the Kapptivate web application.

**Timestamp:** 01:14
**Timestamp:** 01:35
