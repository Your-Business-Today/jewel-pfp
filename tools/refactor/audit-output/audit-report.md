# Refactor audit

Generated 2026-10-22 20:11 UTC.

## Headline

**Code quality score 95.4%.** **2 of 60 source files are over the 100-line limit (3.3%)**; the worst file is 306 lines.

## Code quality score

| Element | Reading | Score | Weight | 0% at |
| --- | --- | --- | --- | --- |
| **Standard baseline checks** | | **93.6%** | **52** | |
| Files over the line limit | 2 in 60 files | 93.3% | 10 | 50% of files |
| Worst file, in limits over | 2.06 | 77.1% | 5 | 9 |
| Functions over the line limit | 0 in 16 functions | 100.0% | 8 | 25% of functions |
| Else blocks | 0 in 71 branches | 100.0% | 5 | 50% of branches |
| Duplication % | not measured | not measured | — | 20 |
| Explanatory comment lines | 17 in 2.33 thousand lines | 85.4% | 4 | 50 per thousand lines |
| Inline magic values | 9 in 2.33 thousand lines | 80.7% | 4 | 20 per thousand lines |
| Orphan components and functions | 0 in 56 components and functions | 100.0% | 4 | 10% of components and functions |
| Long member chain lines | 3 in 2.33 thousand lines | 95.7% | 4 | 30 per thousand lines |
| Deeply indented lines | 0 in 2.33 thousand lines | 100.0% | 4 | 30 per thousand lines |
| Overlong function names | 0 in 16 functions | 100.0% | 4 | 10% of functions |
| **Design pattern file count** | | **not measured** | **0** | |
| Files the patterns predict but are missing | not measured | not measured | — | 50% of predicted files |
| Entities outside their expected file count | not measured | not measured | — | 50% of entities |
| **Prose** | | **100.0%** | **20** | |
| Conditions with calls tangled inside calls | 0 in 71 branches | 100.0% | 8 | 25% of branches |
| Conditions compared to a raw literal | 0 in 71 branches | 100.0% | 6 | 25% of branches |
| Accessor names that want to be a property | 0 in 16 functions | 100.0% | 6 | 10% of functions |
| **Widget adoption** | | **not measured** | **0** | |
| Markup written by hand where a widget should be | not measured | not measured | — | 50% of widget slots |
| **Input validation** | | **not measured** | **0** | |
| Doors that write without checking their input against the columns | not measured | not measured | — | 50% of write doors |

Each element scores 100% with no offenders and falls in a straight line to 0% when its offenders, measured against the size of the codebase, reach the figure in the last column. The score is the weighted average of the elements that could be measured; an element that could not be measured lends its weight to the rest. Weights and zero points are set in `tools/refactor/rules.json` under `score.elements`. The offenders behind every reading are in `tools/refactor/audit-output/audit.json`.

## The repository by area

| Area | Files | Of which audited source | Source lines |
| --- | --- | --- | --- |
| tooling | 160 | 0 | 0 |
| shared | 91 | 0 | 0 |
| frontend | 65 | 60 | 2,329 |
| backend | 40 | 0 | 0 |
| tests | 20 | 0 | 0 |
| docs | 16 | 0 | 0 |
| infrastructure | 11 | 0 | 0 |
| database | 2 | 0 | 0 |
| api | 1 | 0 | 0 |
| **whole repository** | **406** | **60** | **2,329** |

## Summary

| Check | Key figures |
| --- | --- |
| fileLength | limit: 100, filesOverLimit: 2, totalFiles: 60, totalLines: 2329, worstFileLines: 306, worstFileTimesOverLimit: 2.06 |
| functionShape | limit: 30, functionsOverLimit: 0, totalFunctions: 16, elseBlocks: 0, ifBlocks: 71, measurementIsHeuristic: True |
| functionNames | overlongFunctionNames: 0, maxWords: 5, maxLength: 40 |
| accessorNames | gluedAccessorNames: 0, measurementIsHeuristic: True |
| duplication | skipped: jscpd is not installed (npm install -g jscpd), carriedFromBaseline: True |
| naming | bannedAbbreviationHits: 0, unprefixedBooleans: 3 |
| comments | explanatoryCommentLines: 17, filesWithComments: 3, taskMarkers: 0 |
| magicValues | inlineHexColours: 7, inlineStyleAttributes: 2, repeatedStringLiterals: 0 |
| prose | longMemberChainLines: 3, deeplyIndentedLines: 0, overlongLines: 10, measurementIsHeuristic: True |
| conditions | tangledConditionLines: 0, literalComparisonLines: 0, measurementIsHeuristic: True |
| orphans | orphanFunctions: 0, functionsExamined: 16 |
| designPatterns | roleFamilies: 1, predictedFiles: 0, predictedFilesMissing: 0, entities: 0, entitiesOutOfRange: 0, measurementIsHeuristic: True |
| inventory | pages: 18, components: 40, orphanComponents: 0, averagePageLines: 60 |
| siteDefinition | skipped: no siteDefinition catalogue in rules.json |
| inputValidation | schemaTables: 6, limitedColumns: 0, writeDoors: 0, unvalidatedDoors: 0, looserLimits: 0 |
| fileAreas | totalFiles: 406, tooling: 160, shared: 91, frontend: 65, backend: 40, tests: 20, docs: 16, infrastructure: 11, database: 2, api: 1 |

## Against the baseline

| Ratcheted figure | Baseline | Now | Verdict |
| --- | --- | --- | --- |
| code quality score | 74.9% | 95.4% | — |
| fileLength.filesOverLimit | 3 | 2 | better |
| fileLength.worstFileLines | 360 | 306 | better |
| functionShape.functionsOverLimit | 0 | 0 | held |
| functionShape.elseBlocks | 0 | 0 | held |
| duplication.duplicatedPercentage | None | None | — |
| comments.explanatoryCommentLines | 18 | 17 | better |
| magicValues.inlineHexColours | 7 | 7 | held |
| inventory.orphanComponents | 0 | 0 | held |
| orphans.orphanFunctions | 0 | 0 | held |
| prose.longMemberChainLines | 5 | 3 | better |
| prose.deeplyIndentedLines | 0 | 0 | held |
| functionNames.overlongFunctionNames | 0 | 0 | held |
| accessorNames.gluedAccessorNames | 0 | 0 | held |
| conditions.tangledConditionLines | 0 | 0 | held |
| conditions.literalComparisonLines | 0 | 0 | held |
| designPatterns.predictedFilesMissing | 0 | 0 | held |
| siteDefinition.handRolledElements | None | None | — |
| siteDefinition.boxedContentWidgets | None | None | — |
| inputValidation.unvalidatedDoors | 0 | 0 | held |
| inputValidation.looserLimits | 0 | 0 | held |

## Worst files by length

| File | Lines |
| --- | --- |
| src/routes/+page.svelte | 306 |
| src/routes/+layout.svelte | 112 |

Full detail, including every offender list, is in `audit.json`.
