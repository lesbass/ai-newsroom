import type { Element, Root } from 'hast';
import { visit } from 'unist-util-visit';

export function rehypeLazyImages() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'img') {
        const props = node.properties || {};
        if (typeof props.loading !== 'string') {
          props.loading = 'lazy';
        }
        if (typeof props.decoding !== 'string') {
          props.decoding = 'async';
        }
        node.properties = props;
      }
    });
  };
}
