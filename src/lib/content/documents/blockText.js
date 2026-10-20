/**
 * @typedef {{ lead?: string, text: string, items?: string[] }} NoticeEntry
 * @typedef {{ headings: string[], rows: string[][] }} NoticeTable
 * @typedef {{ lead?: string, text?: string, list?: NoticeEntry[], table?: NoticeTable }} NoticeBlock
 */

const blankLines = /\n\s*\n/;
const leadShape = /^\*\*(.+?)\*\*\s*/;
const entryPrefix = '- ';
const itemPrefix = '  - ';
const tableEdge = '|';
const tableEdges = /^\||\|$/g;
const blockSeparator = '\n\n';

/** @param {string} line */
function withLead(line) {
  const match = line.match(leadShape);
  if (!match) return { text: line };
  return { lead: match[1], text: line.slice(match[0].length) };
}

/** @param {{ lead?: string, text?: string }} part */
function leadText(part) {
  const text = part.text ?? '';
  if (!part.lead) return text;
  const lead = `**${part.lead}**`;
  return text ? `${lead} ${text}` : lead;
}

/** @param {string} line */
function cellsOf(line) {
  return line.replace(tableEdges, '').split(tableEdge).map((cell) => cell.trim());
}

/** @param {string[]} lines */
function tableFrom(lines) {
  const [headings, ...rows] = lines.map(cellsOf);
  return { table: { headings, rows } };
}

/**
 * @param {NoticeEntry[]} entries
 * @param {string} line
 */
function addListLine(entries, line) {
  const entry = entries.at(-1);
  if (entry && line.startsWith(itemPrefix)) {
    entry.items = [...(entry.items ?? []), line.slice(itemPrefix.length).trim()];
    return entries;
  }
  if (line.startsWith(entryPrefix) || !entry) return [...entries, withLead(line.replace(entryPrefix, '').trim())];
  entry.text = `${entry.text} ${line.trim()}`.trim();
  return entries;
}

/** @param {string[]} lines */
function blockFrom(lines) {
  const [firstLine] = lines;
  if (firstLine.startsWith(tableEdge)) return tableFrom(lines);
  if (firstLine.startsWith(entryPrefix)) return { list: lines.reduce(addListLine, /** @type {NoticeEntry[]} */ ([])) };
  return withLead(lines.map((line) => line.trim()).join(' '));
}

/** @param {string} text @returns {NoticeBlock[]} */
export function blocksFromText(text) {
  const chunks = text.split(blankLines).filter((chunk) => chunk.trim());
  return chunks.map((chunk) => blockFrom(chunk.split('\n').map((line) => line.trimEnd())));
}

/** @param {NoticeEntry} entry */
function entryText(entry) {
  const items = (entry.items ?? []).map((item) => `${itemPrefix}${item}`);
  return [`${entryPrefix}${leadText(entry)}`, ...items].join('\n');
}

/** @param {string[]} cells */
function rowText(cells) {
  return `${tableEdge} ${cells.join(` ${tableEdge} `)} ${tableEdge}`;
}

/** @param {NoticeBlock} block */
function blockText(block) {
  if (block.list) return block.list.map(entryText).join('\n');
  if (block.table) return [block.table.headings, ...block.table.rows].map(rowText).join('\n');
  return leadText(block);
}

/** @param {NoticeBlock[]} blocks */
export function textFromBlocks(blocks) {
  return (blocks ?? []).map(blockText).join(blockSeparator);
}
