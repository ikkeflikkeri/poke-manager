# Triage Labels

When the `triage` skill processes an issue, it applies labels that map to five canonical states. This doc defines the label strings used in this repo.

## Label Vocabulary

| State | Label | Meaning |
|-------|-------|---------|
| Needs evaluation | `needs-triage` | Maintainer must read and assess. |
| Waiting on reporter | `needs-info` | More details required from issue author. |
| Ready for agent | `ready-for-agent` | Fully specified; an AFK agent can pick it up. |
| Ready for human | `ready-for-human` | Needs human implementation or judgment. |
| Will not fix | `wontfix` | Closed; not actionable. |

## Overrides

To customize a label name (e.g., use `bug:needs-triage` instead of `needs-triage`), edit the table above and re-run `/setup-matt-pocock-skills`. Skills will apply your custom names.

Currently: all labels use canonical names (no custom overrides).

## Lifecycle

1. **New issue created** → no label
2. **`triage` skill runs** → applies `needs-triage` or `needs-info`
3. **Issue refined** → label changes to `ready-for-agent` or `ready-for-human`
4. **Issue closed** → label may become `wontfix`

The `triage` skill automates the early steps; you manually move issues through mid-to-final states.
