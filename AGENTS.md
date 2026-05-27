# AGENTS.md - Codex Production Directives

These directives are written for Codex operating in this repository. They
override any default tendency toward shallow, fast, or incomplete output.

The governing loop for all work is: **gather context -> take action ->
verify work -> repeat**.

---

## 1. Pre-Work

### Step 0: Delete Before You Build

Before any structural refactor on a file larger than 300 lines, first
remove dead code: unused props, unused exports, unused imports, stale
helpers, and debug logs. If restructuring makes more code obsolete, remove
that too. Do not leave ghosts behind.

### Phased Execution

Do not attempt broad multi-file refactors in a single pass unless the user
explicitly asks for it. Break the work into phases. Keep each phase small
enough to reason about and verify properly. For larger changes, complete
Phase 1, verify it, report results, and wait for approval before moving to
the next phase.

### Plan and Build Are Separate Steps

If the user asks for a plan, or asks to think first, provide only the plan.
Do not write code until the user says to proceed.

If the user gives a written plan, follow it exactly. If you find a real
technical flaw in the plan, call it out clearly and stop for confirmation.
Do not silently improvise.

If the request is vague, do not start building. First describe what you
would build, where it belongs, and what tradeoffs matter.

### Spec-Based Development

For non-trivial work with multiple implementation decisions, first clarify
the contract. In Codex, use `request_user_input` when available in Plan
mode; otherwise ask concise direct questions in chat only when necessary.
Reduce ambiguity before editing code.

The spec is the contract. Execute against the agreed spec, not assumptions.

---

## 2. Understanding Intent

### Follow References, Not Descriptions

When the user points to existing code as a reference, inspect that code
first and match its conventions. Existing working code is a stronger spec
than a prose description.

### Work From Raw Data

When debugging, work from actual logs, stack traces, failing tests, and
repro steps. Do not guess. Trace the concrete failure.

If the bug report lacks raw error output and the failure cannot be derived
locally, ask for the console output or failing log directly.

### One-Word Mode

If the user says “yes”, “do it”, “push”, or similar after prior context has
already established the task, execute immediately. Do not restate the plan.

---

## 3. Code Quality

### Senior Dev Override

Do not settle for band-aids when the local design is clearly flawed. If the
change exposes duplicated state, inconsistent patterns, leaky abstractions,
or structural weakness, fix the underlying problem within scope and explain
the reasoning.

Ask: “What would a strong senior reviewer reject here?” Then address it.

### Forced Verification

Never report work as complete just because files were edited successfully.
Before closing the task, run all applicable verification that exists in the
repo:

- Type-checker / compiler
- Linter
- Tests
- Relevant manual validation or runtime checks

If one of these does not exist, say so explicitly. If one exists but cannot
be run, say why. Do not claim success with outstanding errors.

### Write Human Code

Write code that looks like an experienced human wrote it. Avoid noisy
commentary, decorative abstractions, and boilerplate explanations of obvious
logic.

### Don’t Over-Engineer

Do not design for hypothetical future requirements that the user did not
ask for. Prefer solutions that are simple, correct, and maintainable.

### Demand Elegance

For non-trivial work, pause and check whether the solution is merely working
or actually clean. If the first fix is obviously hacky, replace it with the
cleaner design before presenting it.

---

## 4. Context Management

### Use Delegation When It Helps

If the task spans many independent files or parallelizable subtasks, use
Codex sub-agents where appropriate. Give each sub-agent a narrow, concrete,
self-contained responsibility. Keep ownership boundaries clear so changes do
not conflict.

Do not delegate the immediate critical-path task if doing it locally is
faster and clearer.

### Context Decay Awareness

After a long conversation or after substantial time has passed, re-read any
file before editing it. Do not trust memory of file contents.

### Persistent State

Use the file system as durable memory when the task is long-running or
multi-step. If useful, maintain concise notes in files like
`context-log.md` or `gotchas.md` so future work can resume cleanly.

### File Read Discipline

Do not dump large files into context without need. Search first, then read
only the relevant sections. For very large files, inspect them in chunks.

### Tool Output Skepticism

If a search or shell result looks suspiciously incomplete, narrow the scope
and rerun it. Assume truncation or overly broad queries before assuming
absence.

---

## 5. File System as Working Memory

Use the file system actively instead of holding everything in chat context.

- Prefer targeted search over reading whole files.
- Save intermediate outputs when that makes debugging or verification more
  reliable.
- Use shell tools for filtering, searching, and inspecting project state.
- Preserve useful notes, decisions, and follow-up items in repo-local
  markdown files when that improves continuity.
- When debugging, keep reproducible logs or command outputs if they help
  validate the fix.

---

## 6. Edit Safety

### Edit Integrity

Before every edit, re-read the file. After every edit, read the affected
section again to verify the change landed correctly.

Do not make repeated blind edits against stale file contents.

### No Semantic Assumptions

Codex does not have guaranteed whole-program semantic awareness from a
single search. When renaming or changing a symbol, search separately for:

- Direct references and call sites
- Type references
- String literals containing the name
- Dynamic imports / requires
- Re-exports and barrel entries
- Tests, fixtures, and mocks

Assume one search pattern is insufficient.

### One Source of Truth

Do not solve rendering or state bugs by duplicating state. Keep one
authoritative source and derive everything else from it.

### Destructive Action Safety

Do not delete files until you verify nothing still references them. Do not
revert user changes unless explicitly asked. Do not push or perform other
shared-repo actions unless explicitly told to do so.

---

## 7. Codex Workflow Awareness

### Stay Within Codex’s Real Tooling

Do not write instructions that depend on unsupported Claude-specific
features or slash commands. Use the actual Codex toolset available in this
environment: shell commands, file reads, `apply_patch`, planning tools,
verification commands, and sub-agents when explicitly appropriate.

### Keep the Prefix Stable

Do not suggest changing models or tool availability mid-task unless the user
explicitly asks. Solve the task with the current environment.

---

## 8. Self-Improvement

### Mistake Logging

If the user corrects a recurring mistake or workflow issue, record the
lesson in `gotchas.md` when appropriate so the same mistake is less likely
to recur.

### Bug Autopsy

After fixing a bug, explain briefly why it happened and what would prevent
that category of bug in the future.

### Two-Perspective Review

For meaningful tradeoffs, present both views:

- What a perfectionist reviewer would still criticize
- What a pragmatist would accept as sufficient

Let the user choose when the tradeoff is real.

### Failure Recovery

If two fix attempts fail, stop and reassess. Re-read the relevant code
top-down, identify where the mental model was wrong, and explain the new
understanding before trying again.

### Fresh Eyes Pass

When testing your own change, evaluate it like a new user would. Flag rough
edges, confusing behavior, or missing validation.

---

## 9. Housekeeping

### Autonomous Bug Fixing

When given a concrete bug report, own the problem end-to-end. Trace the
failure, implement the fix, and verify it without asking the user to manage
the process for you unless you are blocked on missing external information.

### Proactive Guardrails

If a file is becoming hard to reason about, say so. If the repo lacks basic
validation, tests, or safety checks in the area you are touching, note that
once and propose the smallest useful guardrail.

### Batch Changes

When the same change must be applied across many files, group the work into
clear batches and verify each batch before moving on.

### File Hygiene

Prefer small, focused, navigable files. If a file has become unwieldy,
recommend splitting it along real responsibility boundaries.


<claude-mem-context>
# Memory Context

# [pf2e-leveler] recent context, 2026-05-27 10:58am GMT+3

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 50 obs (20,332t read) | 352,541t work | 94% savings

### May 3, 2026
S120 Feat retraining implementation for pf2e-leveler — Task 2 complete (validator + apply), Task 3 (planner UI) in progress (May 3 at 1:42 PM)
### May 10, 2026
1526 8:09a 🔵 pf2e-leveler Has Unit Tests for Sheet Integration Including isActorCharacterSheetApplication and Button Injection
1535 8:24a ✅ Patch version bump and changelog entry for sheet-integration
1538 " 🔵 pf2e-leveler module current version is 3.4.6, changelog exists
1540 " 🔵 pf2e-leveler 3.4.6 changelog entry is the sheet-integration ApplicationV2 fix
1542 8:25a ✅ pf2e-leveler bumped to 3.4.7 with HUD false-positive sheet-detection fix
### May 27, 2026
6140 7:59a 🔵 Bug Identified: Duplicate Skill Selection During Background Step in Character Wizard
6142 " 🔵 Root Cause Located: Skill Toggle Listener Fires During Background Step
6144 8:00a 🔵 Synthetic Skill Choice Sets Generated from Background Item Descriptions
6147 " 🔵 setBackground Clears and Rebuilds grantedFeatSections Including Skill Choice Sets
6148 8:01a 🔵 Background Data Model Stores Background-Level ChoiceSet Selections in background.choices
6149 " 🔴 TDD Failing Test Written: Background Native Skill ChoiceSets Incorrectly Added to grantedFeatSections
6150 " 🔴 Fixed: Background Native Skill ChoiceSets Now Filtered from grantedFeatSections
6151 8:02a 🔴 Bug Fix Verified: Targeted Test Passes, Full Suite Running
6152 " 🔴 Fix Caused 6 Regressions: Scholar Background Assurance Constraint System Broken
6153 " 🔴 Final Fix Verified: All 129 Tests Pass with Refined isNativeBackgroundSkillChoiceSet Guard
6154 " 🔴 Full Test Suite and Lint Pass: Background Skill ChoiceSet Fix Fully Verified
6155 8:03a 🔴 Complete Validation: 1438 Tests and Full ESLint Pass Confirm Clean Fix
6156 " 🔵 Template Confirms Skills UI Correctly Gated to skills Step — Background Step Bug Was Only in grantedFeatSections
6173 8:19a 🔵 SUBCLASS_TAGS constant maps PF2e class slugs to tag families
6174 " 🔵 Complete SUBCLASS_TAGS list in scripts/constants.js
6175 " 🟣 Added tests for subclass-granted skill duplicate detection in imported skill dialog
6176 " 🔵 All 3 duplicate-skill dialog tests pass without production code changes
6177 8:20a ✅ Full test suite and lint pass after adding subclass skill duplicate tests
6178 " 🟣 Subclass duplicate-skill test coverage added; full suite green at 1441 tests
6179 " 🔵 Broader staged changes reveal prior production code edit in context.js alongside test work
6180 " 🔵 context.js extractInitialSkillChoiceSets skips native background skill rules explicitly
6181 " 🔵 isNativeBackgroundSkillChoiceRule detects background skill prompts by item type + rule prompt string
6182 8:21a 🟣 Added test for background ChoiceSet skill prompt shown when no prior selection exists
6183 " 🔴 isNativeBackgroundSkillChoiceRule now requires a stored selection before suppressing background skill prompts
6184 " 🟣 Complete unstaged diff: context.js bugfix + 177 new test lines covering all skill conflict scenarios
6185 " 🟣 Full suite green at 1443 tests after context.js bugfix and 3 new skill conflict test scenarios
6186 8:22a 🔵 Full change set breakdown: staged vs unstaged across all three modified files
6187 8:25a 🔵 Bug Identified in Sheet Integration Background Selection Flow
6188 " 🔵 Version Mismatch Between package.json and module.json
6189 " 🔵 Active Work on level-planner/context.js and Associated Tests
6190 " 🔴 Fixed: Starting Skill Training Duplicates Background Skill Prompts — Release 3.4.24
6191 8:26a ✅ 3.4.24 Changes Verified: All 88 Level Planner Bootstrap Tests Pass
6338 10:39a 🔵 pf2e-leveler v3.4.21 Investigation Session Started — Skill/Fallback Focus
6339 " 🔵 pf2e-leveler Skill Computation Pipeline Architecture in build-state.js
6340 10:40a 🔵 ensure.js Builds Dynamic Class Definitions from FoundryVTT Actor Data
6341 " 🔵 Imported Initial Skill Dialog Architecture: ChoiceSets, Fallbacks, and Duplicate Detection
6342 10:41a 🟣 TDD Red Phase: Two New Failing Tests Added to build-state.test.js
6343 10:42a 🟣 TDD Red Phase: Three New Failing Tests Covering Duplicate Skill Grant Edge Cases
6344 " 🔵 Three Confirmed Bugs Found via Red Test Runs
6345 10:43a 🔴 Three Production Bug Fixes Applied to build-state.js
6346 " 🔴 isPlannedBoostReflectedOnActor and extractSkillGrantsFromRules Added to build-state.js
6347 " 🔴 isPlannedBoostReflectedOnActor Simplified: Fractional Modifier Check for Level-5 Pending Partial Boosts
6348 10:44a 🔴 All Three New Tests Pass — Green Phase Confirmed
6349 " 🔴 Full Test Suite Green: 1445/1445 Tests Pass After build-state.js Fixes
6350 " 🔵 Version Discrepancy: module.json at 3.4.24, package.json at 3.4.21 Before New Release

Access 353k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>