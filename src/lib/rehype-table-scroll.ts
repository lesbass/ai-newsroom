import type { Element, Root, RootContent } from 'hast';

const LABEL = 'Table';

/**
 * Preferred width share for the columns used by the citation table in the
 * article "Sources" sections. URL cells carry very long unbreakable strings,
 * so they need a bounded column that wraps instead of stretching the table.
 */
const SOURCE_COLUMN_WEIGHTS: Record<string, number> = {
  '#': 5,
  Publisher: 15,
  Source: 26,
  Title: 26,
  Date: 11,
  Type: 9,
  URL: 37,
};

const SOURCE_COLUMN_FALLBACK_WEIGHT = 15;

function textContent(node: RootContent): string {
  if (node.type === 'text') return node.value;
  if (node.type !== 'element') return '';
  return node.children.map(textContent).join('');
}

function isElement(node: RootContent, tagName?: string): node is Element {
  return node.type === 'element' && (!tagName || node.tagName === tagName);
}

function findHeaderCells(table: Element): Element[] {
  const head = table.children.find((child) => isElement(child, 'thead'));
  const headerRow = head?.children.find((child) => isElement(child, 'tr'));
  if (!headerRow) return [];
  return headerRow.children.filter((child) => isElement(child, 'th'));
}

/**
 * Detect the citation table used by the article "Sources" sections. These
 * tables mix short labels with long URLs, so they get a generated colgroup
 * (bounded URL column) and per-cell labels for the stacked mobile layout.
 */
function isSourcesTable(headers: string[]): boolean {
  return headers.includes('Publisher') && headers.includes('URL');
}

function buildColgroup(headers: string[]): Element {
  return {
    type: 'element',
    tagName: 'colgroup',
    properties: {},
    children: headers.map((header) => ({
      type: 'element',
      tagName: 'col',
      properties: {
        style: `width: ${
          SOURCE_COLUMN_WEIGHTS[header] ?? SOURCE_COLUMN_FALLBACK_WEIGHT
        }%`,
      },
      children: [],
    })),
  };
}

function labelCells(table: Element, headers: string[]): void {
  const body = table.children.find((child) => isElement(child, 'tbody'));
  if (!body) return;
  for (const row of body.children) {
    if (!isElement(row, 'tr')) continue;
    let column = 0;
    for (const cell of row.children) {
      if (!isElement(cell, 'td')) continue;
      const label = headers[column];
      if (label) {
        cell.properties['data-label'] = label;
      }
      column += 1;
    }
  }
}

function prepareSourcesTable(table: Element, headers: string[]): void {
  table.children.unshift(buildColgroup(headers));
}

/**
 * Wrap every markdown `<table>` in a focusable scroll region and tag its data
 * cells with their column header.
 *
 * On phones the CSS turns these wrappers into stacked, labelled cards so prose
 * tables (and especially citation tables full of long URLs) stay readable
 * without horizontal panning. On wider viewports a table that still overflows
 * becomes a horizontal scroll area; a scroll container that is not
 * keyboard-focusable cannot be scrolled without a pointer (WCAG 2.1.1
 * Keyboard), so the wrapper gets `tabindex="0"` and a `region` role with an
 * accessible name. The `<table>` element itself keeps its native table
 * semantics — only the wrapper carries the landmark role.
 */
function wrapTables(children: RootContent[]): void {
  for (let i = 0; i < children.length; i++) {
    const node = children[i];
    if (node.type !== 'element') continue;

    if (node.tagName === 'table') {
      const headers = findHeaderCells(node).map((cell) =>
        textContent(cell).trim(),
      );
      const sources = isSourcesTable(headers);
      labelCells(node, headers);
      if (sources) prepareSourcesTable(node, headers);
      const wrapper: Element = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: sources
            ? ['table-scroll', 'sources-table']
            : ['table-scroll'],
          tabIndex: 0,
          role: 'region',
          'aria-label': LABEL,
        },
        children: [node],
      };
      children[i] = wrapper;
      continue;
    }

    if (node.children) wrapTables(node.children);
  }
}

export function rehypeTableScroll() {
  return (tree: Root) => {
    wrapTables(tree.children);
  };
}
