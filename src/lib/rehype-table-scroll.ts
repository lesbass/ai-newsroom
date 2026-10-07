import type { Element, Root } from 'hast';

const LABEL = 'Table, scroll horizontally to see more';

/**
 * Wrap every markdown `<table>` in a focusable horizontal-scroll region.
 *
 * Wide tables overflow their column and become a horizontal scroll area on
 * narrow viewports. A scroll container that is not keyboard-focusable cannot
 * be scrolled without a pointer (WCAG 2.1.1 Keyboard), so the wrapper gets
 * `tabindex="0"` and a `region` role with an accessible name. The `<table>`
 * element itself keeps its native table semantics — only the wrapper carries
 * the landmark role.
 */
function wrapTables(children: Element['children']): void {
  for (let i = 0; i < children.length; i++) {
    const node = children[i];
    if (node.type !== 'element') continue;

    if (node.tagName === 'table') {
      const wrapper: Element = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['table-scroll'],
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
