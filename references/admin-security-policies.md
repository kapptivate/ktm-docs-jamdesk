# Features in admin-security-policies.mp4

_Extracted with gemini-3.1-pro-preview on 2026-06-04._

_Gap analysis against: `administration/security-policies.mdx`, `administration/security-policies/create.mdx`, `administration/security-policies/password.mdx`, `administration/security-policies/authentication.mdx`, `administration/security-policies/manage.mdx`_

## 1. Security policies list

**Source:** both

**Docs coverage:** covered

A table displaying existing security policies. It includes columns for "Name" (with descriptions displayed beneath) and "Last Updated", with a "Default" badge marking the workspace's default policy. A "Create security policy" button is located in the top right.

**Timestamps:** 00:03

## 2. About section

**Source:** both

**Docs coverage:** covered

The first section of the security policy form where users enter fundamental details. It contains a required "Name" input and an optional "Description" input.

**Timestamps:** 00:14

## 3. Password Policy

**Source:** both

**Docs coverage:** covered — Docs state each character rule sets a minimum and maximum, but do not mention the specific input labels ('Min length', 'Max length', 'Min count', 'Max count', 'Max consecutive') shown when rules are checked.

A section to enforce password rules via checkboxes. Checking options reveals specific input fields to define exact limits: "Set min/max length" reveals "Min length" and "Max length"; "Set min/max lowercase characters" and "Set min/max numerical characters" reveal "Min count" and "Max count"; and "Enforce maximum number of equal consecutive characters" reveals "Max consecutive". Other checkboxes forbid usernames or whitespaces in passwords.

**Timestamps:** 00:30

## 4. Password history

**Source:** both

**Docs coverage:** covered

A section to prevent reuse of past passwords. Checking "Remember previous passwords" reveals a "Number of previous passwords to remember" input. Checkboxes are also available to enforce uniqueness against previous passwords or allow older passwords to be reused.

**Timestamps:** 00:35

## 5. Password life

**Source:** both

**Docs coverage:** covered — Docs mention expiration settings are revealed when limiting password lifetime, but fail to name the exact 'Days until password expiration' input shown in the UI.

A section governing password expiration. Checking "Limit password lifetime" reveals a "Days until password expiration" input. Additional checkboxes allow admins to enforce password changes after a reset or after the first login.

**Timestamps:** 00:41

## 6. Two Factor Authentication

**Source:** both

**Docs coverage:** outdated — Docs omit the 'Max attempts' input under 'Limit number of attempts'. They also list 'Token expiration duration' as a configurable option, but the video shows it only as an info label without an input field.

A section to mandate 2FA. Checking "Enable two factor authentication" displays an info label for "Token expiration duration". Checking "Limit number of attempts" reveals a "Max attempts" input and checkboxes for "Lock account indefinitely after max attempts" and "Warn before account lock".

**Timestamps:** 00:45

## 7. Login Policy

**Source:** both

**Docs coverage:** covered

A section to govern session security, providing checkboxes to "Limit number of login attempts" and "Prevent multiple sessions".

**Timestamps:** 00:50

## 8. Users assignment

**Source:** both

**Docs coverage:** outdated — Docs claim the empty state text is "No users assigned to this policy yet.", but the video shows "You haven't assigned any users to this policy yet."

The final section of the form showing which users the policy applies to. When no users are assigned, it displays an empty state reading "You haven't assigned any users to this policy yet." alongside an "+ Add Users" button.

**Timestamps:** 00:54
