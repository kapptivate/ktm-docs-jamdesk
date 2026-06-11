# Old help center → new docs: migration tracker

Audit of every article on https://help.kapptivate.com against this documentation.
Statuses: ✅ covered · 🟠 partially covered · 📥 to migrate (decided, not done) · ❌ not covered (no decision yet) · 🚫 won't migrate.

Last updated: 2026-06-10. Decisions taken so far:

1. Legacy script actions → **done**, "Legacy" group at the bottom of the Actions Library.
2. Ethernet actions → **done**, page in the same Legacy group.
3. Web + mobile recorders → **done**, pages in Writing tests, with the original screenshots imported (`images/recorders/`).
4. Robot ops → **done**, On-premise tab fully migrated (10 pages) with all images downloaded from Zendesk and converted to webp/svg (`images/hardware/`). Zero remaining links to the old help center.

## Getting started

| Old article | Status | Where / what's left |
|---|---|---|
| Getting started | ✅ | `introduction`, `quickstart` |
| Main features | ✅ | `introduction`, `concepts/core-concepts` |
| Testing basics | ✅ | `tests/overview` |
| Monitoring basics | ✅ | `monitoring/overview` |
| Add steps and variables to your tests | ✅ | `tests/builder`, `tests/variables` |
| Manual testing | ✅ | `tests/live-session` |
| How to install a new robot (hardware) | ✅ | `hardware/install-hardware` |
| How to install a new robot (software) | ✅ | `hardware/install-software` |
| IP configuration on linux robots *(internal)* | 🚫 | internal-only article |

## Testing

| Old article | Status | Where / what's left |
|---|---|---|
| What can I do with variables? | ✅ | `tests/variables` |
| Can I change global variables used in existing tests? | 🟠 | fold the answer into `tests/variables` |
| Test building (cellular **and ethernet**) | ✅ | `tests/cellular` + `tests/actions/legacy/ethernet` |
| How to modify a USSD test? | ✅ | `tests/cellular`, `tests/actions/cellular/ussd` |
| Web test actions overview | ✅ | `tests/actions/web/overview` |
| Browser presets | ✅ | `tests/browser-presets` |
| Reusable components | ✅ | `tests/reusable-components` |
| kapptivate web recorder | ✅ | `tests/web-recorder`, original screenshots imported |
| Kapptivate mobile app recorder | ✅ | `tests/mobile-recorder`, original screenshots imported |
| Smartphone remote control | 🟠 | `tests/live-session`; check nothing is lost from the old article |
| Actions (overview) | ✅ | Actions Library |
| USSD / SMS / Ookla / Traceroute / Youtube actions | ✅ | `tests/actions/cellular/*` |
| The pause action | 🟠 | V2 `waitfordelay` done; ownerless sleep action of robot tests undocumented |
| Action macros | ❌ | concept absent; decide if still relevant |
| Script actions - Basics | ✅ | `tests/actions/legacy/script-actions` |
| Script actions - Smartphone specific | ✅ | `tests/actions/legacy/script-actions-smartphone` |
| Script actions - Variables, metrics, artifacts | ✅ | `tests/actions/legacy/script-actions-variables` |
| Examples of implemented tests (Web / Android / iOS) ×3 | ❌ | candidates for the Guides tab |
| Tests suites | ✅ | `tests/suites` |
| Batch test files (CSV) | ✅ | `executions/run-batch-csv` |
| How to run a test? | ✅ | `executions/run` |
| Tests results | ✅ | `executions/results` |

## Monitoring

| Old article | Status | Where / what's left |
|---|---|---|
| KPIs and metrics | ✅ | `monitoring/tests-metrics` |
| Monitorings and metrics APIs | ❌ | no REST API reference in new docs |
| How to update a monitoring? | ✅ | `monitoring/monitor-details` |
| Tests dashboards / Custom dashboards | ✅ | `monitoring/dashboards`, `monitoring/public-dashboards` |
| Alerts / Incidents | ✅ | `monitoring/alerts`, `monitoring/incidents` |
| Notified if a robot goes unavailable? | 🟠 | fold the how-to into `monitoring/alerts` or `equipment/statuses` |
| Mail reports / Excel reports | ✅ | `monitoring/mail-reports`, `monitoring/exports` |
| CI/CD integration | ✅ | `executions/ci-cd` |

## Administration

| Old article | Status | Where / what's left |
|---|---|---|
| Admin access / Users / Roles / Teams / Security policies / Events log | ✅ | `administration/*` |
| Products / Devices management / API & Service keys (+ FAQ) | ✅ | `administration/products*`, `administration/api-keys` |
| Microsoft Teams integration | ✅ | `administration/notifications` |
| What services are integrated? (Skype, Whatsapp, Slack...) | ❌ | no integrations overview page |
| Change password / Edit profile | ✅ | `administration/account/*` |

## Troubleshooting & maintenance → On-premise tab

| Old article | Status | Where / what's left |
|---|---|---|
| Robot network troubleshooting | ✅ | `hardware/network-troubleshooting` |
| Technical errors troubleshooting | ✅ | `hardware/technical-errors` |
| SIM cards troubleshooting | ✅ | `hardware/sim-troubleshooting` |
| Which RJ45 port is configured? | ✅ | `hardware/rj45-port` |
| Mac mini network configuration | ✅ | `hardware/macmini-network` |
| Swap the battery of a robot | ✅ | `hardware/swap-battery` |
| Swap a SIM in a cellular robot | ✅ | `hardware/swap-sim` |
| Configure a new SIM card | ✅ | folded into `hardware/swap-sim` (no-PIN warning); the old article was a single line |
| Log in on a robot without display | ✅ | `hardware/headless-login` |

## FAQ / Technical questions

| Old article | Status | Where / what's left |
|---|---|---|
| Check SMS reception from... | ✅ | `tests/actions/cellular/wait-sms` |
| What is the store in API actions? | 🟠 | covered for SIM actions; legacy API actions nuance missing |
| body / json body / xml body in API actions | ❌ | legacy ETH API action detail |
| Evaluate as expression checkbox | ❌ | assertion detail to fold into a page |
| SMS response waiting time calculation | 🟠 | fold into `wait-sms` or `tests/cellular` |
| Devices & OS versions for smartphone tests | 🟠 | fold the matrix into `equipment/devices-lab` |
| What are platforms used for? | ✅ | `concepts/core-concepts` |
| How to install an app on your Android smartphone | ❌ | `administration/products/devices` candidate |
| Smartphone battery has swollen | ✅ | folded into `hardware/swap-battery` (pass-through charging section) |

## Remaining decisions

- **Examples galleries** (web / Android / iOS implemented tests): rewrite as Guides?
- **REST API reference** (monitorings & metrics APIs): scope and home to define.
- **Integrations overview** (Slack, Whatsapp, Skype, email, SMS...): one page under Administration?
- **Action macros**: still a real feature? Check with the team before documenting.
- **Small FAQs** (evaluate as expression, SMS timing, OS matrix, global variables note): fold into their host pages opportunistically.
- **Screenshot freshness**: recorder and on-premise images were imported as-is from the old help center; replace with fresh captures when the UI evolves. The legacy script action pages reuse no old screenshots (text-only by design).
- **BIOS update guide**: referenced by the battery swap article but never published on the help center; `hardware/swap-battery` says "contact support". Write it if the procedure can be shared.
