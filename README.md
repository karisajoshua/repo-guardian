# RepoGuardian

**Policy-driven, human-approved repository remediation.**

RepoGuardian is the remediation companion to [ProjectPulse](https://github.com/karisajoshua/project-pulse). ProjectPulse observes and explains repository health; RepoGuardian consumes its versioned report and converts failed controls into explicit, risk-classified remediation plans.

## Closed-loop architecture

```text
Repository
    │
    ▼
ProjectPulse ── observe / score / explain
    │ JSON report v1.0
    ▼
RepoGuardian ── classify / plan / propose
    │ reviewable branch + PR
    ▼
Human approval
    │
    ▼
Repository ── approved change
    │
    └──────────────► ProjectPulse verifies improvement
```

RepoGuardian does **not** merge its own changes and does **not** write directly to `main`.

## v1 policy model

| ProjectPulse control | Proposed response | Risk |
| --- | --- | --- |
| Missing README | Add documentation proposal | Low |
| Missing license | Manual legal/maintainer decision | High |
| Missing CI | Add workflow proposal | Medium |
| Missing security policy | Add reporting guidance | Low |
| Missing contribution guide | Add contribution guidance | Low |
| Missing tests | Manual engineering plan | High |
| Stale maintenance | Manual maintenance review | Medium |

Passing controls generate no remediation action.

## Safety invariants

- Consume only supported ProjectPulse report schemas.
- Never execute target-repository code.
- Never silently select a license.
- Never invent tests merely to improve a score.
- Never push remediation directly to the default branch.
- Every action requires human approval.
- Prefer reviewable branches and pull requests.
- Treat target repository data as untrusted input.

## Development

Requires Node.js 22+.

```bash
npm install
npm run check
npm test
npm run build
```

## Operational remediation proposals

RepoGuardian now converts an approved remediation plan into an execution proposal containing a dedicated `repoguardian/remediation-*` branch name, deterministic low/medium-risk file patches, manual-only high-risk actions, and immutable safety flags requiring a draft review flow with no self-merge capability.

The execution proposal is intentionally separated from the GitHub mutation adapter. This keeps policy decisions testable without credentials and makes repository writes an explicit, auditable integration boundary.

## Roadmap

The next layer will turn approved low/medium-risk plan items into deterministic file patches on a dedicated `repoguardian/*` branch and open a draft pull request. PRPilot can then become the independent validation/review layer before human merge approval.

## License

Apache-2.0.
