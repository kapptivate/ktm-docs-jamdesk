# Features in test-how-to-run-execution results-1.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-05._

_Full-quality (GCS) analysis. Gap analysis against: `executions/run.mdx` (placeholder), `executions/overview.mdx`, `executions/results.mdx`_

## 1. Run queue accumulation

**Source:** both

**Docs coverage:** new — The docs say 'Click Run... to open the run confirmation page' but miss the intermediate 'Run queue' behavior where multiple tests can be accumulated before proceeding.

Clicking 'Run' on multiple tests in the test list adds them to a temporary 'Run queue' rather than immediately starting them. A counter button in the top right tracks the number of queued tests, which you click to proceed to the configuration step.

**Timestamp:** 00:20
**Timestamp:** 00:25

## 2. Run confirmation and variable overrides

**Source:** both

**Docs coverage:** new — The docs have a placeholder for run confirmation and do not detail the ability to change devices/agents or override variables and variants.

In the Run confirmation page, you can review the queued tests, change the device or agent assigned to each, and override variable groups, variants, and specific variable values before execution.

**Timestamp:** 00:36
**Timestamp:** 00:50

## 3. Execution options

**Source:** both

**Docs coverage:** new — The docs omit the specific execution options available, such as setting a wait time, emailing results, ignoring errors, or enabling parallel execution.

Before launching tests, you can configure execution options via checkboxes and dropdowns: choose between a 'Full run' or scheduling, set a 'Wait between each run' duration in seconds, choose to 'Send me results by email', 'Send results by email', 'Ignore errors', and enable 'Parallel executions' for web scenarios.

**Timestamp:** 00:58
**Timestamp:** 01:05

## 4. Executions list and details column

**Source:** visual

**Docs coverage:** outdated — The docs incorrectly list a 'Tests' column and an 'Actions' menu column, whereas the video shows a 'Details' column with environment info and a standalone 'Run' button on each row.

The Executions table displays past runs with columns for Name (including a status icon like Success, Failed, or Pending), About (test counts like 1/1), Ran by, and a Details column showing device and browser configurations. Each row has a standalone 'Run' button.

**Timestamp:** 02:15
**Timestamp:** 02:30

## 5. Date range filter

**Source:** visual

**Docs coverage:** outdated — The docs state to 'use the date range picker to set a start and end date. Select your timezone', but the video shows a dropdown menu with predefined duration presets like 'Past 1h' or 'Last 7 days' and no timezone selector.

Filter the executions list by selecting a time period from the 'Select Date Range' dropdown. Options include Past 1h, Past 2h, Past 6h, Past 12h, Past 24h, Today, Yesterday, Last 7 days, and Last 30 days.

**Timestamp:** 02:19

## 6. Execution row action menu

**Source:** both

**Docs coverage:** outdated — The docs list many options in the single execution action menu (Cancel, Create monitor, Delete, Export) that do not appear in the video's menu, which only shows Add tags, Re-run only failed tests, and Rename.

Clicking the three-dot action menu on an execution row reveals options to 'Add tags', 'Re-run only failed tests', and 'Rename' the execution.

**Timestamp:** 02:57

## 7. Live test execution from editor

**Source:** both

**Docs coverage:** new — The docs mention live test monitoring from the execution detail view, but fail to cover that tests can be run and watched live directly via a modal within the test editor.

You can trigger a test directly from within the test builder/editor by clicking 'Run' in the top right. This opens a modal displaying a live video feed of the executing test, which can be expanded to full screen to monitor the run in real time.

**Timestamp:** 03:26
**Timestamp:** 03:31
**Timestamp:** 05:03

## 8. Execution details layout and tabs

**Source:** visual

**Docs coverage:** outdated — The docs say the tabs are 'Overview, Steps, Variables, Screenshots, and Video', but the video shows 'Steps, Generators, and Video'. The docs also miss the top-right action buttons and the right-hand metadata sidebar.

The Execution Details page shows the result of a run. The top right includes buttons to 'Go to edit test', 'Export', and 'Run again'. The main content area contains 'Steps', 'Generators', and 'Video' tabs. A right sidebar displays 'Execution details' (timings), 'Conditions' (environment), and 'Device details'.

**Timestamp:** 05:25
**Timestamp:** 05:54

## 9. Inline steps screenshots and artifacts

**Source:** both

**Docs coverage:** outdated — The docs claim screenshots are in a dedicated 'Screenshots tab', whereas the video demonstrates they are displayed inline within the 'Steps' tab, accessible via 'View artifacts' or a full-screen carousel.

Within the 'Steps' tab, expanding a step reveals its duration, success status, and an inline screenshot showing the interacted UI element highlighted in orange. Clicking 'View artifacts' opens a modal with relevant logs or images, and clicking the image opens a full-screen carousel to navigate through all steps visually.

**Timestamp:** 05:35
**Timestamp:** 05:42
**Timestamp:** 06:18

## 10. Export execution results

**Source:** both

**Docs coverage:** outdated — The docs place the Export action in an 'action menu (three dots)', but the video shows 'Export' as a prominent standalone button in the top right of the details page.

From the Execution Details page, click the 'Export' button in the top right to download a report. A modal appears allowing you to specify the format, such as an Excel report, before saving.

**Timestamp:** 06:06

## 11. Download execution video

**Source:** both

**Docs coverage:** new — The docs describe the Video tab and playback functionality but miss the 'Download' button that lets users save the video locally.

In the 'Video' tab of the Execution Details page, you can play back the recording of the test run. A 'Download' button on the right allows you to save the video file locally.

**Timestamp:** 06:36
**Timestamp:** 06:40

## 12. Inline rename and tagging

**Source:** both

**Docs coverage:** outdated — The docs correctly mention the pencil icon for renaming, but state that adding tags is done 'From the action menu (three dots)', whereas the video shows an inline 'Add tags' button next to the header status badge.

At the top of the Execution Details page, you can click the pencil icon next to the execution name to rename it, or click the 'Add tags' button next to the status badge to open a modal and assign organizational tags.

**Timestamp:** 06:45
**Timestamp:** 06:51
