# Features in ExecutionMode.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-15._

_Full-quality (GCS) analysis. Gap analysis against: `executions/run.mdx`_

## 1. Add multiple tests to queue

**Source:** visual

**Docs coverage:** covered

Select multiple tests simultaneously using the checkboxes on their rows in the test list. This brings up a selection bar at the bottom with an "Add to queue" button to queue all selected tests for execution at once.

**Timestamps:** 00:22

## 2. Run queue Advanced options

**Source:** visual

**Docs coverage:** covered

The Run queue side panel includes an "Advanced options" section that can be expanded to configure the batch run. It contains an "Execution mode" dropdown, alongside checkboxes for "Run later", "Parallel test execution", and "Wait between each test", plus a "More options" expander.

**Timestamps:** 00:28

## 3. Execution mode options

**Source:** both

**Docs coverage:** new — Docs mention the 'Execution mode' setting but fail to list its three options (Fast, Standard, Detailed) or explain their specific impacts on media capture, logs, and execution speed.

The execution mode controls how much data is collected during a run, and can be selected from the Run queue, Test campaigns, or individual test settings. The "Fast" mode performs minimal collection (no screenshots or video, reduced logs) for maximum speed, ideal for production monitoring. The default "Standard" mode provides a balanced collection that captures media without slowing down the run too much. "Detailed" takes screenshots before and after every step, providing detailed logs and full metadata for debugging, but significantly slows down execution.

**Timestamps:** 00:30, 00:43, 00:59

## 4. Test settings Advanced options

**Source:** both

**Docs coverage:** new — Docs only mention configuring execution modes in the Run queue; they do not cover the "Test settings" tab in the test builder or the ability to set default execution modes, certificates, and capabilities at the individual test level.

Within the test builder, the right sidebar contains a "Test settings" tab. Expanding the "Advanced" section reveals default configuration options for the test, including an "Execution mode" dropdown to set the default data collection level, as well as toggles and inputs under "Execution settings" (such as "Accept insecure certificates") and custom "Capabilities".

**Timestamps:** 01:23

## Verification notes (read before reusing)

- **Feature 3 (execution mode options)**: the three modes and their descriptions were read off the open dropdown on the 00:43/00:59 frames: **Fast** ("Minimal collection. No screenshots or video, with reduced logs. Best for production monitoring"), **Standard** (default — "Balanced collection for understanding errors without slowing the run down too much"), **Detailed** ("Screenshots before and after every step, detailed logs, full metadata. Best for debugging... Can significantly slow down execution").
- **Feature 4 (test-level default)**: verified on the 01:23 frame: builder Test settings tab → Advanced section → "Execution mode" dropdown with help text "Defines how much data is collected during the run to optimize execution time or debugging depth", alongside "Accept insecure certificates" and custom "Capabilities".
- The narration mentions execution mode can also be set on **Test campaigns**, but no campaign-level mode picker was visible in any frame, so `executions/run-campaign.mdx` only states each test runs under its own mode (not a batch-level control).
- Screenshots used in the docs were grabbed as PNG and converted with `cwebp` (the extractor's webp encoder is disabled on this machine, so the `screenshots/` dir from the run is empty).
