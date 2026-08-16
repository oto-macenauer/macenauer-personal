---
name: blog-share
description: >
  Write the LinkedIn post announcing a macenauer.net blog article, and verify
  the link preview actually works. Use when the user says "share this",
  "write the LinkedIn post", "post about this article", or after publishing a
  post. Also use to diagnose a broken or stale LinkedIn preview card.
---

# blog-share

Produces the share copy and proves the preview card renders before the user
posts it.

## 1. Write the post copy

Read the article first. Write to `src/content/blog/<slug>/share/linkedin.md`
(create the directory; it is not published).

Structure:

- **Hook — one line, under ~140 characters.** LinkedIn truncates behind "…see
  more", and this line is all most people read. It must stand alone and must
  not be the article title restated. The strongest hooks are a surprising
  number, a belief that turned out wrong, or the moment something broke.
- **3–6 short lines of body.** Single-sentence paragraphs separated by blank
  lines — LinkedIn collapses ordinary line breaks and a wall of text is
  scrolled past. Give away the useful part; do not tease.
- **One call to action**, plain: "Full post:" followed by the URL.
- **3–5 hashtags**, lowercase-ish and specific (`#dotnet`, `#kubernetes`), not
  `#motivation` or `#innovation`.

Apply the same banned-phrasing list as `blog-draft`'s `STYLE.md` — LinkedIn is
where that register is most tempting and most obvious. No "🚀 Excited to
share", no "Thoughts?", no engagement bait.

The article URL is `https://www.macenauer.net/blog/<slug>/`.

## 2. Verify the preview

A LinkedIn card is built from the Open Graph tags on the live page. Check them
against the **deployed** URL, not localhost — LinkedIn cannot see localhost:

```bash
curl -s https://www.macenauer.net/blog/<slug>/ | grep -E 'og:(title|description|image|type)'
```

Assert all of:

- `og:title`, `og:description` and `og:image` are present
- `og:image` is an **absolute** URL — a relative one silently yields no card
- the image actually resolves and is 1200×630:
  ```bash
  curl -sI https://www.macenauer.net/og/<slug>.png | head -3
  ```
- `og:type` is `article`

If the page 404s, the post has not deployed yet — it may still be `draft: true`
(drafts are excluded from production builds), or the container has not been
rebuilt: `docker compose up -d --build`.

## 3. Tell the user to re-scrape

LinkedIn caches preview cards aggressively and **will keep serving a stale or
empty card** after the page is fixed. Editing the post does not clear it. The
only reliable fix is:

https://www.linkedin.com/post-inspector/

Tell the user to paste the article URL there and hit inspect before composing
the LinkedIn post. This step is not optional — it is the single most common
reason a correct page still shares badly.

## 4. Optional variants

If asked, add Bluesky (300 characters, no hashtag padding) and X variants to
the same file under their own headings. Keep the hook identical so the
messaging is consistent.

## Output

Show the user the copy in the chat as well as writing the file — they will
paste it into LinkedIn by hand. Report the verification results plainly: which
OG tags resolved, the card dimensions, and the Post Inspector reminder.
