# Refactor audit — baseline v2, after round 1

Generated 22/10/2026 from refactor/round-1, replacing the v1 baseline of 11/10/2026.

Designs: no design index (`docs/design/widgets.json`) and no widget catalogue in `rules.json`, so the brand and widget-design checks are *not set up*. They run with `widget-design`: "Check the site against the brand" and "Check the widgets against their designs".

## Headline
Code quality score 95.5% at the start of the round (74.9% at the v1 baseline) → **100.0%**. **0 of 73 source files are over the 100-line limit**; at the start of the round 2 were, the worst being the home page at 306 lines.

## Code quality score
| Element | Reading | Score | Weight | 0% at |
| --- | --- | --- | --- | --- |
| **Standard baseline checks** | | **100.0%** | **60** | |
| Files over the line limit | 0 in 73 files | 100.0% | 10 | 50% of files |
| Worst file, in limits over | 0 | 100.0% | 5 | 9 |
| Functions over the line limit | 0 in 16 functions | 100.0% | 8 | 25% of functions |
| Else blocks | 0 in 71 branches | 100.0% | 5 | 50% of branches |
| Duplication % | 0 | 100.0% | 8 | 20 |
| Explanatory comment lines | 0 in 2.4 thousand lines | 100.0% | 4 | 50 per thousand lines |
| Inline magic values | 0 in 2.4 thousand lines | 100.0% | 4 | 20 per thousand lines |
| Orphan components and functions | 0 in 69 components and functions | 100.0% | 4 | 10% of components and functions |
| Long member chain lines | 0 in 2.4 thousand lines | 100.0% | 4 | 30 per thousand lines |
| Deeply indented lines | 0 in 2.4 thousand lines | 100.0% | 4 | 30 per thousand lines |
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

## Summary
| Check | Key figures |
| --- | --- |
| fileLength | limit: 100, filesOverLimit: 0, totalFiles: 73, totalLines: 2400, worstFileLines: 0, worstFileTimesOverLimit: 0.0 |
| functionShape | limit: 30, functionsOverLimit: 0, totalFunctions: 16, elseBlocks: 0, ifBlocks: 71, measurementIsHeuristic: True |
| functionNames | overlongFunctionNames: 0, maxWords: 5, maxLength: 40 |
| accessorNames | gluedAccessorNames: 0, measurementIsHeuristic: True |
| duplication | clones: 0, duplicatedLines: 0, totalLines: 2589, duplicatedPercentage: 0.0 |
| naming | bannedAbbreviationHits: 0, unprefixedBooleans: 3 |
| comments | explanatoryCommentLines: 0, filesWithComments: 0, taskMarkers: 0 |
| magicValues | inlineHexColours: 0, inlineStyleAttributes: 0, repeatedStringLiterals: 0 |
| prose | longMemberChainLines: 0, deeplyIndentedLines: 0, overlongLines: 13, measurementIsHeuristic: True |
| conditions | tangledConditionLines: 0, literalComparisonLines: 0, measurementIsHeuristic: True |
| orphans | orphanFunctions: 0, functionsExamined: 16 |
| designPatterns | roleFamilies: 1, predictedFiles: 0, predictedFilesMissing: 0, entities: 0, entitiesOutOfRange: 0, measurementIsHeuristic: True |
| inventory | pages: 18, components: 53, orphanComponents: 0, averagePageLines: 44 |
| siteDefinition | skipped: no siteDefinition catalogue in rules.json |
| inputValidation | schemaTables: 6, limitedColumns: 0, writeDoors: 0, unvalidatedDoors: 0, looserLimits: 0 |
| fileAreas | totalFiles: 419, tooling: 160, shared: 91, frontend: 78, backend: 40, tests: 20, docs: 16, infrastructure: 11, database: 2, api: 1 |

## Round 1 — the home page and layout broken out, and the sweep to zero
The round took all six steps of the plan, in order. Behaviour is unchanged: every page renders pixel for pixel as before, apart from the live WebGL canvases, which animate.

- **src/routes/+page.svelte 306 → 30**: the scroll door scene becomes `ScrollDoorScene`, which now owns the scroll and resize handlers, the canvas, the progress and the WebGL fallback flag. Its hero, stage captions and progress rail become `HomeHero`, `StageCaptions` and `ProgressRail`, and the static fallback drawing becomes `DoorFallback`. The stat strip, services grid, process steps, accreditations list and call to action each become a component in `src/lib/components/home/`.
- **src/routes/+layout.svelte 118 → 34**: the header, with the menu state only it touches, becomes `SiteHeader`, and the footer, with the privacy link import, becomes `SiteFooter`, both in `src/lib/components/layout/`.
- **Inline magic values 9 → 0**: the fallback drawing's seven hex colours become the theme's `stroke-`/`fill-` classes, and the hero's fade and the scene's height use Svelte style directives instead of style attributes.
- **Explanatory comment lines 17 → 0**: the section comments on the services and contact pages come off. The door scene's stage constant becomes `stageCount`, so its trailing comment is no longer needed.
- **Long member chain lines 3 → 0**: the thank-you page reads SvelteKit's `page.url` through named locals (framework object, so locals are the right answer). The services page names each service's call to action with `{@const}`.
- **Duplication 0.72% → 0**: the services and contact pages' identical hero becomes `PageHero` in `src/lib/components/page/`, with the services index strip passed in as its children.
- **Held**: functions over the limit, else blocks, orphans, tangled and literal conditions, accessor names, overlong names, deep indentation, input validation (0 unvalidated doors), design pattern predictions.
- **Division signature**: none. Every new component is under the limit.

## The journey so far
| Figure | v1 | v2 |
| --- | --- | --- |
| Code quality score | 74.9% | **100.0%** |
| Worst file (lines) | 360 | **within the limit** |
| Average page length | 194 | **44** |
| Duplication % | not measured | **0.0** |
| Else blocks | 0 | **0** |
| Functions over the limit | 0 | **0** |
| Files over the limit | 3 | **0** |

## Worst files by length
All files are within the limit.

## Next round, named
The plan has no steps: every figure is at zero. `src/lib/door3d.js`, the old home-page door scene, is outside the audited source and is deleted once the new door set replaces it on the home page (YBT: "Door explainer: put the signed-off door set on the home page").
