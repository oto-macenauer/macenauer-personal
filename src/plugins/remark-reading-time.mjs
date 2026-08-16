import { visit } from 'unist-util-visit';

/** Average adult reading speed for technical prose. */
const WORDS_PER_MINUTE = 220;

/**
 * Computes reading time from the parsed Markdown rather than the raw file, so
 * frontmatter, HTML comments and directive syntax are not counted as words.
 * Code blocks are skipped — nobody reads them at prose speed.
 */
export function remarkReadingTime() {
  return (tree, file) => {
    let words = 0;

    visit(tree, (node) => {
      if (node.type === 'code' || node.type === 'inlineCode') return 'skip';
      if (node.type !== 'text') return;
      words += node.value.split(/\s+/).filter(Boolean).length;
    });

    const frontmatter = file.data.astro.frontmatter;
    frontmatter.wordCount = words;
    frontmatter.readingTime = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  };
}
