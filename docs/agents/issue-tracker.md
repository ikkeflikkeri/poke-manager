# Issue Tracker: GitHub

Issues for this project live in GitHub Issues.

## How skills interact with your tracker

- **`to-issues`** — converts plans and specs into independent GitHub issues
- **`triage`** — processes incoming issues, applies labels, routes to agents or humans
- **`to-prd`** — publishes PRDs as GitHub issues or issue templates
- **`qa`** — creates test results and findings as issues or comments

## Where to find issues

- **Repository**: Check `git remote -v` for the GitHub URL
- **Issue URL format**: `https://github.com/<owner>/<repo>/issues/`
- **Labels**: Used to track triage state (see `docs/agents/triage-labels.md`)

## CLI: gh

Skills use the `gh` CLI to create, read, and label issues.

Install if missing: https://cli.github.com/

Verify auth: `gh auth status`

## Workflow conventions

- **Issue body format**: Markdown. Supports code blocks, links, tables.
- **Labels**: Applied by `triage` skill; see `docs/agents/triage-labels.md` for the vocab.
- **Assignments**: Skills do not auto-assign; you manually assign issues to team members.
- **Milestones and projects**: Not used by skills — configure outside if desired.
