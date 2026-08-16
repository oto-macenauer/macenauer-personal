import { visit } from 'unist-util-visit';

/**
 * Turns remark-directive containers into callout markup:
 *
 *   :::warn
 *   Do not run this against production.
 *   :::
 *
 * Rendered as <aside class="callout callout-warn" aria-label="Warning">.
 * Styling lives in global.css.
 *
 * Deliberately strict: an unrecognised directive throws at build time rather
 * than rendering as stray text. A typo like `:::warning` is then a failed
 * build instead of a broken published post.
 */
const LABELS = {
  note: 'Note',
  tip: 'Tip',
  warn: 'Warning',
};

export function remarkCallout() {
  return (tree, file) => {
    visit(tree, (node) => {
      const isDirective =
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective';

      if (!isDirective) return;

      if (node.type !== 'containerDirective' || !(node.name in LABELS)) {
        const known = Object.keys(LABELS)
          .map((n) => `:::${n}`)
          .join(', ');
        throw new Error(
          `Unknown directive ":${node.name}" in ${file.path}. ` +
            `Supported callouts are ${known}.`
        );
      }

      const data = node.data ?? (node.data = {});
      data.hName = 'aside';
      data.hProperties = {
        class: `callout callout-${node.name}`,
        'aria-label': LABELS[node.name],
      };
    });
  };
}
