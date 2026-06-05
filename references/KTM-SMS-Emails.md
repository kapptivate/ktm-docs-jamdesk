# Features in KTM-SMS-Emails.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-05._

_Full-quality (GCS) analysis. Gap analysis against: `tests/actions/shared/aigetmailcode.mdx`, `tests/actions/shared/aigetmaillink.mdx`, `tests/actions/shared/aigetsmscode.mdx`_

## 1. Step Creation Menu

**Source:** visual

**Docs coverage:** new

Clicking 'Add step...' inside a step group opens a searchable menu to select the next action. The actions are organized into collapsible categories including 'Most popular' (containing Click, Wait for delay, Verify with AI, Fill input), 'Interactions', 'Email & SMS', 'Verifications', 'Navigation', 'Wait for...', and 'Others'.

**Timestamps:** 00:19, 01:06

## 2. Get SMS Code Step

**Source:** both

**Docs coverage:** outdated — The docs call the step 'AI get SMS code' while the UI shows 'Get sms code'. The docs list parameters like 'phone_number' and 'mocked_response', but the UI displays 'Phone number to receive code' and does not show a mocked response field.

A step that extracts a verification code from an SMS message. Found in the step menu under 'Email & SMS' > 'Get sms code'. It features two fields inline on the step card: 'Phone number to receive code' and a variable assignment field (which defaults to 'SmsCode') to store the extracted value.

**Timestamps:** 00:25, 00:46

## 3. Get Email Code Step

**Source:** both

**Docs coverage:** new

A step designed to extract a verification code from an email. Located under 'Email & SMS' > 'Get email code', it provides an input for 'Email to receive code' and a field to set the variable name for the extracted code (defaulting to 'MailCode').

**Timestamps:** 01:12, 01:17

## 4. Get Email Link Step

**Source:** both

**Docs coverage:** new

A step to extract a specific link from an email. Found under 'Email & SMS' > 'Get email link', it includes an input for 'Email to receive link' and a field to specify the variable name that will hold the extracted URL (defaulting to 'MailLink').

**Timestamps:** 01:23, 01:27

## 5. Get Email Link: Intent Setting

**Source:** both

**Docs coverage:** new

When a 'Get email link' step is selected, the right-hand settings panel displays an 'Intent' text area under the 'General' tab. This allows users to provide natural language instructions to the AI (e.g., 'The link to activate my account') to ensure it extracts the correct link if multiple links are present in the email.

**Timestamps:** 01:36, 01:45

## 6. Variable Picker

**Source:** visual

**Docs coverage:** new

Clicking the `{}` icon next to an input field (such as the URL field in a 'Navigate to URL' step) opens a dropdown variable picker. It contains tabs for 'Previous steps', 'Random', and 'Variables'. The 'Previous steps' tab lists the variables exported by earlier actions (e.g., 'SmsCode', 'MailCode', 'MailLink'). Selecting an option inserts it into the input field as a variable pill.

**Timestamps:** 01:54, 01:57

## 7. Step Results and Artifacts

**Source:** voice

**Docs coverage:** new

According to the audio, executing these AI extraction steps produces specific artifacts in the test results. Email steps generate screenshots of the email in mobile, tablet, and desktop formats. SMS steps capture the raw text content of the SMS alongside the extracted variables.

**Timestamps:** 02:10

## Verification notes (read before reusing)

- **Feature 1 (step menu)**: categories verified on the 00:19 frame: Most popular (Click, Wait for delay, Verify with AI, Fill input), Interactions, Email & SMS, Verifications, Navigation, Wait for..., Others.
- **Feature 5 (Intent)**: verified on the 01:45 frame ("The link to activate my account" in the General tab).
- **Feature 7 (artifacts)** is voice-only: the 02:10 frame shows the builder, not a results view. The mobile/tablet/desktop email screenshots and SMS raw-text claims come from the narration and were not visually confirmed.
- Step names and default variables (Get sms code/`SmsCode`, Get email code/`MailCode`, Get email link/`MailLink`) verified on the 02:10 frame.
