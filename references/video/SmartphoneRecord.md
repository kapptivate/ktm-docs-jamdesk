# Features in SmartphoneRecord.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-15._

_Full-quality (GCS) analysis. Gap analysis against: `tests/mobile-recorder.mdx`_

## 1. Live Session Device Selection

**Source:** both

**Docs coverage:** covered

Initiate a remote control session by navigating to the 'Remote control' > 'Smartphones' tab and selecting a specific device from the list (e.g., 'Android - Customer O...').

**Timestamps:** 00:06

## 2. Quick Assistant Toolbar

**Source:** visual

**Docs coverage:** new — The documentation mentions the 'start a test record' icon but completely omits the other device controls available in the Quick Assistant toolbar.

A floating toolbar in the live session interface that provides quick device controls, including icons for Power, Volume Up/Down, Home, Back, App Switcher, and 'Start a test record'.

**Timestamps:** 00:19

## 3. Legacy Recording Initialization

**Source:** both

**Docs coverage:** covered

Clicking the 'Start a test record' button opens a 'Choose your test package' modal. Users can search and select the application to test, categorized into 'User' and 'System' apps (e.g., Calculator).

**Timestamps:** 00:22

## 4. Legacy Script Output

**Source:** both

**Docs coverage:** outdated — The documentation states 'one click generates the JavaScript test' and instructs users to click 'Generate JavaScript test', but the video shows the recording stopping and immediately generating a form-based step configuration without such a button.

Stopping a legacy recording generates an older, form-based test step configuration. It includes fields for 'Application package' and 'Application activity', along with toggles for 'Reset the app', 'Run in background', 'Use custom capabilities', and 'Ignore errors'. The narrator notes this format is being deprecated.

**Timestamps:** 00:36

## 5. New Smartphone Test Wizard

**Source:** both

**Docs coverage:** new — The documentation entirely misses the new test creation wizard launched from the Tests dashboard, only describing the legacy flow from the Remote control tab.

A modern flow to create tests starting from the 'Tests' dashboard. Clicking 'Create new test' opens a modal where users select the 'Smartphone test' tab, input a test name, select a specific device from a dropdown, select an application to test, and click 'Use recorder'.

**Timestamps:** 00:48, 00:55, 00:58

## 6. Modern Side-by-Side Recorder

**Source:** both

**Docs coverage:** new — The documentation does not mention or describe the modern side-by-side recording interface.

The new recording interface features a side-by-side layout. The interactive device screen is displayed on the right, while a real-time list of recorded actions builds up dynamically in the left panel under a step group.

**Timestamps:** 01:06, 01:13

## 7. Visual Step Management and Selectors

**Source:** both

**Docs coverage:** outdated — The documentation instructs users to 'Tap the element on the device screen: a popup lists every XPath that matches', but the modern UI manages selectors directly within the left-hand step list via dropdowns, rather than an on-screen popup.

In the modern recorder, user interactions (e.g., 'Tap') appear as discrete steps in the left panel. Each step displays its target selector (e.g., `id=...`, `content-desc=...`), which can be modified via an inline dropdown. A three-dots menu on each step provides further options, such as 'Add assertion'.

**Timestamps:** 01:13, 01:16

## Verification notes (read before reusing)

- **Feature 6 (side-by-side recorder)**: verified on the 01:11 frame: device stream on the right, step canvas on the left starting with "Launch app — Calculatrice", a "Step group #" with "1. Tap calc_keypad_btn_01" and "2. Tap calc_keypad_btn_add", and a top bar with "Stop record", "Save", and "Save and run".
- **Feature 7 (inline selectors + assertions)**: verified on the 01:14 frame: a third step "3. Verify element [selector] is displayed" sits in the same canvas; selectors are edited via the inline dropdown on each step row, and the three-dots menu offers "Add assertion".
- **Feature 4 (legacy output being deprecated)**: the "being deprecated" claim is from the narration; the form-based output (Application package / Application activity, Reset the app, Run in background, Ignore errors) was confirmed visually around 00:36.
- Screenshots used in the docs were grabbed as PNG and converted with `cwebp` (the extractor's webp encoder is disabled on this machine, so the `screenshots/` dir from the run is empty).
