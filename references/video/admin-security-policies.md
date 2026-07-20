# Features in admin-security-policies.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Full-quality (GCS) analysis. Gap analysis against: `administration/security-policies.mdx`, `administration/security-policies/create.mdx`, `administration/security-policies/password.mdx`, `administration/security-policies/authentication.mdx`, `administration/security-policies/manage.mdx`_

## 1. View security policies

**Source:** visual

**Docs coverage:** covered

The main page under Administration > Security policies lists existing policies in a table with columns for Name (with description below) and Last Updated. The workspace default policy is indicated by an orange 'Default' badge. A three-dot menu on each row provides additional actions, and a 'Create security policy' button sits at the top right.

**Timestamps:** 00:05

## 2. Create policy & About section

**Source:** both

**Docs coverage:** covered

Clicking 'Create security policy' opens a form to define a new policy. The first section is 'About', where users must enter a Name (marked as required) and can optionally provide a Description.

**Timestamps:** 00:15

## 3. Password Policy rules

**Source:** both

**Docs coverage:** covered

A section to enforce password character requirements and restrictions. Checking a rule reveals its specific numeric inputs. Options include 'Set min/max length' (revealing Min length and Max length inputs), and similar min/max checkboxes for lowercase characters, uppercase characters, numerical characters, alphabetic characters, and special characters. Users can also check 'Enforce maximum number of equal consecutive characters' (revealing a Max consecutive input), 'Forbid password equal to username', 'Forbid password containing username', and 'Forbid whitespaces in password'.

**Timestamps:** 00:30, 00:34

## 4. Password history rules

**Source:** both

**Docs coverage:** covered

Settings to track and restrict reuse of past passwords. Checking 'Remember previous passwords' reveals a 'Number of previous passwords to remember' input field. Additional checkboxes allow enforcing uniqueness against these previous passwords and considering too old passwords as available for reuse.

**Timestamps:** 00:38

## 5. Password life rules

**Source:** both

**Docs coverage:** covered

Controls when users are forced to change their passwords. Includes checkboxes to 'Enforce password change after reset', 'Enforce password change after first login', and 'Limit password lifetime'.

**Timestamps:** 00:40

## 6. Two Factor Authentication settings

**Source:** both

**Docs coverage:** outdated — The docs state that when 'Lock account indefinitely after max attempts' is off, users can set an 'Account lock duration', but this field is not present in the UI when the option is unchecked.

Checking 'Enable two factor authentication' reveals settings to enforce 2FA. Users can configure a 'Token expiration duration' using a numeric input and a unit dropdown (e.g., Minutes), and 'Limit number of attempts' with a numeric input. Additional checkboxes allow admins to 'Lock account indefinitely after max attempts' and 'Warn before account lock'.

**Timestamps:** 00:44

## 7. Login Policy settings

**Source:** both

**Docs coverage:** covered

A section containing checkboxes to restrict login behavior. Options available are 'Limit number of login attempts' and 'Prevent multiple sessions'.

**Timestamps:** 00:52

## 8. Assign users to a policy

**Source:** both

**Docs coverage:** outdated — The docs state a new policy shows 'No users assigned to this policy yet.', but the video shows the text 'You must configure a valid policy to assign users.'

The Users section at the bottom of the form indicates who the policy applies to. When creating a new policy, it displays the message 'You must configure a valid policy to assign users.' alongside an 'Add Users' button. Once finished, clicking the 'Create security policy' button at the bottom saves the form.

**Timestamps:** 00:55
