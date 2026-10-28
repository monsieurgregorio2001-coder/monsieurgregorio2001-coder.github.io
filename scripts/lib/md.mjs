// Small HTML to Markdown converter for the plain-text twins (DIRECTION 3.6). It handles the tags this site uses.
const ent = (s) => s.replace(/&nbsp;/g, " ").replace(/&middot;/g, "·").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
export function htmlToMd(html, base = "https://monsieurgregorio2001-coder.github.io") {
  const h = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|canvas|template)[\s\S]*?<\/\1>/g, "")
    .replace(/<svg[\s\S]*?<\/svg>/g, "")
    .replace(/<span[^>]*class="[^"]*\bvh\b[^"]*"[^>]*>[\s\S]*?<\/span>/g, "")
    .replace(/<picture>[\s\S]*?<img[^>]*alt="([^"]*)"[^>]*>[\s\S]*?<\/picture>/g, (_, a) => (a ? `\n\n_Image: ${a}_\n\n` : ""))
    .replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, t) => {
      const url = href.startsWith("/") ? base + href : href;
      const txt = t.replace(/<[^>]+>/g, "").trim();
      return txt ? `[${txt}](${url})` : "";
    })
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/g, "\n\n# $1\n\n")
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, "\n\n## $1\n\n")
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, "\n\n### $1\n\n")
    .replace(/<dt[^>]*>([\s\S]*?)<\/dt>/g, "\n- **$1**: ")
    .replace(/<li[^>]*>/g, "\n- ")
    .replace(/<\/(p|div|section|article|ul|ol|dl|figure|header|footer|nav|main|details|summary|figcaption|tr)>/g, "\n\n")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/g, "**$2**")
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/g, "`$1`")
    .replace(/<\/(td|th)>/g, " | ")
    .replace(/<[^>]+>/g, "");
  return ent(h).replace(/[ \t]+\n/g, "\n").replace(/\n- \s+/g, "\n- ").replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}
