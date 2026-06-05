# Features in KTM-test-creation-web-smartphone.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-05._
_Gap analysis ran against: tests/create.mdx, tests/builder.mdx, tests/live-session.mdx (verdicts proved unreliable; verified against frames by hand)._

## 1. Create new test modal

**Source:** both — screenshots at 00:10, 00:13 (re-grabbed; modal open)

Clicking 'Create new test' from the Tests list opens a modal to select the authoring experience. Verified on-frame options: **Classic**, **Web (New experience)**, **Smartphone (New experience)**. (Gemini's narration-based naming "Create / Web/API experience / Smartphone/Tablet experience" was wrong.)

## 2. Web/API test creation form

**Source:** both — screenshot at 00:23

New-experience Web test creation form: 'Test name', 'Default agent' picker (Web agent, e.g. kapp-demo-web-1), 'Start URL', and an 'AI usage' checkbox 'Turn on AI for this test'. Cancel / Create.

## 3. Kompagnon Chrome extension recorder

**Source:** both — screenshots at 00:42, 01:00, 01:13

Web recording uses the 'Kompagnon' Chrome extension. If not installed, a prompt offers 'Add to Chrome'. Clicking 'Use recorder' opens the start URL with a 'Web Recorder by kapptivate' widget overlay; clicks and navigations are captured as steps ("Kompagnon started debugging this browser" banner).

## 4. Recorder visual assertions

**Source:** both — screenshot at 01:31

In the recorder widget, an eye icon enters assertion mode ('Select element to verify'). Clicking an element adds a verification; the widget logs steps like 'Créez un compte ou connectez…'. Displayed/Clickable assertion options per narration.

## 5. Step groups and reusable components

**Source:** both — screenshots at 01:49, 01:56, 02:04

Step groups (orange header) hold numbered steps. Group context menu (verified on-frame): Capabilities (Add custom capabilities), Move up, Move down, Duplicate, **Create reusable component**, Delete. Created components turn the group purple; can be reverted via 'Detach reusable component'.

## 6. AI-powered element selectors

**Source:** both — screenshot at 02:49

Step details panel, AI Usage: 'Turn on AI for this step' toggle plus strategy dropdown. Verified on-frame: **Smart** — "Use the AI to find the first selector or if the run fails"; **Always** — "Forces the AI to redetect the target elements each run, ignoring saved selectors". A 'Link to test' button links the step AI setting to the test-level setting.

## 7. Step checks and advanced settings

**Source:** both — screenshots at 03:09, 03:21

Step details panel tabs: General / Checks / Advanced settings. General: Selector (XPath, {} variables), Timeout (e.g. 20 seconds). Checks add verifications (e.g. 'URL contains', shown as a tag under the step in the canvas). Advanced settings (verified on-frame): Execution settings — 'Ignore error on this step', 'Skip during run'; 'Interval' (e.g. 200 milliseconds); Capabilities — 'Add custom capabilities'.

## 8. Test Environment configuration

**Source:** both — screenshots at 03:38, 03:52

Builder right panel tabs: Preview / Environment / Test settings / Version history. Environment tab shows 'Execution parameters': Starting URL, Device (e.g. kapp-demo-web-1), Browser preset (e.g. 'Chrome (Desktop, Chrome 143.0)'); clicking the preset opens a searchable picker.

## 9. Global Test settings panel

**Source:** both — screenshots at 03:55, 04:04

Test settings tab sections: Description (optional), Tags, AI, Delays & timeouts (verified on-frame: 'Step delay' in seconds, 'Selector timeout' in seconds), Hooks, Advanced (Accept non-secure certificates per narration).

## 10. Test hooks configuration

**Source:** both — screenshots at 04:17, 04:25

Hooks section toggles (verified on-frame): **Before Test**, **Before Each Step**, **After Each Step**, **After Test**. Enabling one opens the 'Reusable steps group library' dialog (search, Create collection, components listed with 'Used in N tests' and step counts) to pick a component.

## 11. Smartphone test builder and reference screenshots

**Source:** both — screenshots at 05:00, 05:27, 05:37

Smartphone tests share the same builder UI. Starting point is 'Launch app' (e.g. 'MWC Series App'). Steps: Tap, Fill input, Assert displayed. Step details show a 'Reference screenshot' of the app state from the last run, and a Selector/Coords toggle for targeting. Smartphone recording uses a cloud-based recorder instead of the browser extension.
