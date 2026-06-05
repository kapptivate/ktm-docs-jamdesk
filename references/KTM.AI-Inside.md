# Features in KTM.AI-Inside.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-05._

_Full-quality (GCS) analysis. Gap analysis against: `tests/builder.mdx`, `tests/actions/web/aivisualassert.mdx`, `tests/actions/web/aispellcheck.mdx`_

## 1. Test creation with AI toggle

**Source:** both

**Docs coverage:** new — The documentation does not cover test creation options or the AI usage toggle.

When creating a new test, selecting "Web (New experience)" from the "Create new test" modal opens a configuration dialog. Here, you can specify the Test name, Default agent, and Start URL, and use the "AI usage" toggle to enable AI capabilities for the test.

**Timestamps:** 00:11, 00:14

## 2. AI-powered step locators

**Source:** both

**Docs coverage:** new — The documentation does not mention AI-powered element locators or the step-level AI toggle.

Individual steps in the test editor, such as clicks, have a "Turn on AI for this step" toggle. When activated, a gradient border surrounds the step. During the first execution, AI parses the page to find the correct CSS selector based on the human-readable intention (e.g., "Tout accepter"). Once found, the selector is saved and reused for future runs.

**Timestamps:** 00:39, 00:43

## 3. Verify with AI

**Source:** both

**Docs coverage:** new — The existing documentation does not include the "Verify with AI" action.

An AI-native action available via the "Add step..." > "Verifications" menu. It allows users to write a natural language prompt (e.g., "La page de connexion s'affiche") to verify the presence of specific elements, images, or pricing information on the page.

**Timestamps:** 01:19, 01:28

## 4. Dynamic variables in AI prompts

**Source:** both

**Docs coverage:** new — Variable insertion in AI verification prompts is missing from the documentation.

Within the "Verify with AI" action, clicking the `[ ]` icon opens a menu to insert dynamic variables into the prompt. Users can select values from "Previous steps", "Random" generators, or predefined "Variables" (such as `Firstname` or `MailAdresseManon`) to create dynamic assertions.

**Timestamps:** 01:46, 01:49

## 5. AI-powered Email & SMS extraction

**Source:** both

**Docs coverage:** new — The documentation lacks information on AI-powered actions for extracting OTPs and links from emails and SMS.

Under the "Add step..." > "Email & SMS" menu, actions like "Get sms code", "Get email code", and "Get email link" use AI to automatically parse messages and extract one-time passwords (OTPs) or activation links.

**Timestamps:** 01:58, 02:04

## 6. Verify Spell Check (AI)

**Source:** visual

**Docs coverage:** covered

An AI-native verification action located under "Add step..." > "Verifications" that validates spelling and grammar on the current page using AI.

**Timestamps:** 02:32

## 7. AI Strategy test settings

**Source:** both

**Docs coverage:** new — The documentation does not detail test-level AI strategy settings or the available fallback behaviors.

In the right panel under the "Test settings" tab, the "AI" section provides an "Enable AI" toggle and an "AI strategy" dropdown. Options include "Smart" (uses AI to find the first selector or if a run fails), "Always" (forces AI to reselect targets on every run, ignoring saved selectors), and "On demand" (AI is off by default and must be enabled manually on each step).

**Timestamps:** 03:38, 03:52

## Verification notes (read before reusing)

- **Feature 7 (AI strategy)**: verified on the 03:52 frame. Exact tooltips: Smart "Use the AI to find the first selector or if the run fails"; Always "Forces the AI to redetect the target elements on every run, ignoring saved selectors"; On demand "AI is off by default — enable it manually on each step". The Enable AI checkbox notes that turning AI off means maintaining the XPath on each step manually.
- **Feature 3 (Verify with AI)** is the new-builder name for the capability documented as `aivisualassert`; **Feature 6** maps to `aispellcheck`.
- Features 1 and 2's frames were not individually re-verified; their claims match `tests/create.mdx` (AI usage checkbox) and `tests/builder.mdx` (per-step toggle, gradient border, first-run caching).
