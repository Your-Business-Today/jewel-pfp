# Refactor audit

Generated 2026-10-11 16:13 UTC.

## Headline

**Code quality score 74.9%.** **3 of 4 source files are over the 100-line limit (75.0%)**; the worst file is 360 lines.

## Code quality score

| Element | Reading | Score | Weight | 0% at |
| --- | --- | --- | --- | --- |
| **Standard baseline checks** | | **65.2%** | **52** | |
| Files over the line limit | 3 in 4 files | 0.0% | 10 | 50% of files |
| Worst file, in limits over | 2.6 | 71.1% | 5 | 9 |
| Functions over the line limit | 0 in 3 functions | 100.0% | 8 | 25% of functions |
| Else blocks | 0 in 10 branches | 100.0% | 5 | 50% of branches |
| Duplication % | not measured | not measured | — | 20 |
| Explanatory comment lines | 18 in 0.71 thousand lines | 49.2% | 4 | 50 per thousand lines |
| Inline magic values | 13 in 0.71 thousand lines | 8.2% | 4 | 20 per thousand lines |
| Orphan components and functions | 0 in 3 components and functions | 100.0% | 4 | 10% of components and functions |
| Long member chain lines | 5 in 0.71 thousand lines | 76.5% | 4 | 30 per thousand lines |
| Deeply indented lines | 0 in 0.71 thousand lines | 100.0% | 4 | 30 per thousand lines |
| Overlong function names | 0 in 3 functions | 100.0% | 4 | 10% of functions |
| **Design pattern file count** | | **not measured** | **0** | |
| Files the patterns predict but are missing | not measured | not measured | — | 50% of predicted files |
| Entities outside their expected file count | not measured | not measured | — | 50% of entities |
| **Prose** | | **100.0%** | **20** | |
| Conditions with calls tangled inside calls | 0 in 10 branches | 100.0% | 8 | 25% of branches |
| Conditions compared to a raw literal | 0 in 10 branches | 100.0% | 6 | 25% of branches |
| Accessor names that want to be a property | 0 in 3 functions | 100.0% | 6 | 10% of functions |
| **Widget adoption** | | **not measured** | **0** | |
| Markup written by hand where a widget should be | not measured | not measured | — | 50% of widget slots |
| **Input validation** | | **not measured** | **0** | |
| Doors that write without checking their input against the columns | not measured | not measured | — | 50% of write doors |

Each element scores 100% with no offenders and falls in a straight line to 0% when its offenders, measured against the size of the codebase, reach the figure in the last column. The score is the weighted average of the elements that could be measured; an element that could not be measured lends its weight to the rest. Weights and zero points are set in `tools/refactor/rules.json` under `score.elements`. The offenders behind every reading are in `tools/refactor/audit-output/audit.json`.

## The repository by area

| Area | Files | Of which audited source | Source lines |
| --- | --- | --- | --- |
| frontend | 9 | 4 | 708 |
| infrastructure | 9 | 0 | 0 |
| shared | 2 | 0 | 0 |
| docs | 1 | 0 | 0 |
| **whole repository** | **21** | **4** | **708** |

## Summary

| Check | Key figures |
| --- | --- |
| fileLength | limit: 100, filesOverLimit: 3, totalFiles: 4, totalLines: 708, worstFileLines: 360, worstFileTimesOverLimit: 2.6 |
| functionShape | limit: 30, functionsOverLimit: 0, totalFunctions: 3, elseBlocks: 0, ifBlocks: 10, measurementIsHeuristic: True |
| functionNames | overlongFunctionNames: 0, maxWords: 5, maxLength: 40 |
| accessorNames | gluedAccessorNames: 0, measurementIsHeuristic: True |
| duplication | skipped: jscpd is not installed (npm install -g jscpd) |
| naming | bannedAbbreviationHits: 0, unprefixedBooleans: 3 |
| comments | explanatoryCommentLines: 18, filesWithComments: 3, taskMarkers: 0 |
| magicValues | inlineHexColours: 7, inlineStyleAttributes: 2, repeatedStringLiterals: 4 |
| prose | longMemberChainLines: 5, deeplyIndentedLines: 0, overlongLines: 6, measurementIsHeuristic: True |
| conditions | tangledConditionLines: 0, literalComparisonLines: 0, measurementIsHeuristic: True |
| orphans | orphanFunctions: 0, functionsExamined: 3 |
| designPatterns | roleFamilies: 0, predictedFiles: 0, predictedFilesMissing: 0, entities: 0, entitiesOutOfRange: 0, measurementIsHeuristic: True |
| inventory | pages: 3, components: 0, orphanComponents: 0, averagePageLines: 194 |
| siteDefinition | skipped: no siteDefinition catalogue in rules.json |
| inputValidation | schemaTables: 0, limitedColumns: 0, writeDoors: 0, unvalidatedDoors: 0, looserLimits: 0 |
| fileAreas | totalFiles: 21, frontend: 9, infrastructure: 9, shared: 2, docs: 1 |

## Against the baseline

No `baseline.json` beside the audit — nothing to ratchet against.

## Worst files by length

| File | Lines |
| --- | --- |
| src/routes/+page.svelte | 360 |
| src/routes/+layout.svelte | 126 |
| src/routes/contact/+page.svelte | 122 |

Full detail, including every offender list, is in `audit.json`.
