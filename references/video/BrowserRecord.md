# Features in BrowserRecord.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-15._

_Full-quality (GCS) analysis. Gap analysis against: `tests/web-recorder.mdx`, `tests/builder.mdx`_

## 1. Test type selection modal

**Source:** visual

**Docs coverage:** new — The documentation does not mention the initial modal where users must select between Classic, Web (New experience), and Smartphone (New experience).

Clicking '+ Create new test' opens a modal offering three test types to choose from: 'Classic', 'Web (New experience)', and 'Smartphone (New experience)'.

**Timestamps:** 00:01

## 2. Web test creation form

**Source:** both

**Docs coverage:** new — The documentation does not detail the web test creation form fields (Test name, Default agent, Start URL, AI usage toggle) that appear before entering the test builder.

Selecting a web test opens a configuration form with fields for 'Test name', 'Default agent', 'Start URL', and an 'AI usage' section with a toggle to 'Turn on AI for this test'. Clicking 'Create' generates the test and opens the builder.

**Timestamps:** 00:08

## 3. Kompagnon extension installation prompt

**Source:** both

**Docs coverage:** outdated — The web-recorder.mdx page describes a legacy manual zip-file installation, which contradicts the in-app prompt that seamlessly redirects to the Chrome Web Store to install the Kompagnon extension.

Clicking 'Use recorder' without the extension installed displays an 'Install the Kompagnon extension' modal. It lists the extension's benefits and provides an 'Add to Chrome' button that redirects to the Chrome Web Store.

**Timestamps:** 00:24

## 4. Web recorder overlay widget

**Source:** visual

**Docs coverage:** outdated — The docs mention the overlaid widget but fail to list its controls, such as the action count, Pause, Stop, and the 'Open sidepanel' button.

Launching the recorder opens the target URL with a draggable widget overlaid on the page. It displays the recording status, the number of captured actions, and buttons to 'Pause', 'Stop', and 'Open sidepanel'.

**Timestamps:** 01:10

## 5. Recorder side panel

**Source:** both

**Docs coverage:** new — The documentation completely omits the Chrome side panel interface where users can view the live list of captured steps and access recorder controls.

Clicking 'Open sidepanel' in the widget opens a native Chrome side panel. It shows the current state (e.g., 'RECORDING LIVE' or 'ASSERTION MODE'), a live log of recorded actions with their selectors, and buttons to pause, stop, or toggle assertion mode via an eye icon.

**Timestamps:** 01:14, 01:17

## 6. Verify element modal (Assertion mode)

**Source:** visual

**Docs coverage:** outdated — The documentation implies that clicking an element immediately records the assertion, entirely missing the 'Verify element' modal where users must choose conditions like Displayed, Clickable, Enabled, or Present.

In assertion mode, clicking a page element opens a 'Verify element' modal to configure the check. Users can select 'Displayed' (visible) or 'Clickable', and a 'More options...' dropdown reveals 'Enabled' (active) and 'Present' (exists in DOM).

**Timestamps:** 01:21

## 7. Reference screenshot for web steps

**Source:** visual

**Docs coverage:** outdated — The docs explicitly claim the reference screenshot section only appears 'For smartphone steps that already ran', but the video shows it is also present for newly recorded web steps.

In the test builder, the 'General' tab of a web step's details panel includes a 'Reference screenshot' section. For a newly recorded step that hasn't run yet, it displays 'No reference screenshot available for this step'.

**Timestamps:** 01:33

## Verification notes (read before reusing)

- **Feature 5 (side panel)**: verified on the 01:17 frame: Chrome side panel titled "Kompagnon — Web Recorder by kapptivate", Extension v0.1.0, state "RECORDING LIVE", "1 actions captured", step "1. CLICK California". The overlay widget (00:24/01:10 area) shows "RECORDING LIVE / 0 actions captured" before any interaction.
- **Feature 6 (Verify element modal)**: option list verified on the 01:25 frame with **More options** expanded: Displayed ("Check if element is visible"), Clickable ("Check if element can be clicked"), Enabled ("Check if element is active"), Present ("Check if element exists in the DOM").
- **Feature 7 (reference screenshot on web steps)**: the "No reference screenshot available for this step" string was confirmed against `tests/builder.mdx`, which previously claimed reference screenshots were smartphone-only; the builder page was corrected.
- Screenshots used in the docs were grabbed as PNG and converted with `cwebp` (the extractor's webp encoder is disabled on this machine, so the `screenshots/` dir from the run is empty).
