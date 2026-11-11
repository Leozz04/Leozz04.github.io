"""Build blog posts: <slug>/en.md + <slug>/zh.md -> <slug>/index.html, plus blog/index.html.
Needs pandoc. Run from anywhere: python3 blog/build.py"""
import html
import os
import subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
AUTHOR = "Ziqian Zhang"
POSTS = [  # newest first
    {"slug": "r2i", "date": "2026-11-11",
     "en": "R²I: What a Harness Is For When the Agent Is Smart Enough",
     "zh": "R²I：当 Agent 足够聪明时，Harness 还该做什么",
     "sum_en": "Resources, Rules, Insight: what a person should still hold when agents do the work, and five shifts for next-gen harnesses.",
     "sum_zh": "Resources、Rules、Insight：agent 干活时人还该掌握什么，以及下一代 harness 的五个转变。"},
]

HEAD = """<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{root}assets/style.css">
<link rel="stylesheet" href="{root}blog/blog.css">
</head>
<body>
<button class="theme-toggle" id="theme-toggle" type="button" aria-label="Toggle dark mode">◐</button>
"""

TAIL = """<footer class="post-foot">© 2026 {author}</footer>
<script>
(function () {{
  var root = document.documentElement;
  try {{ var t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; }} catch (_) {{}}
  document.getElementById("theme-toggle").addEventListener("click", function () {{
    var dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try {{ localStorage.setItem("theme", root.dataset.theme); }} catch (_) {{}}
  }});
  var btns = document.querySelectorAll("[data-set-lang]");
  function setLang(l) {{
    root.lang = l === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-lang]").forEach(function (el) {{ el.hidden = el.dataset.lang !== l; }});
    btns.forEach(function (b) {{ b.setAttribute("aria-pressed", b.dataset.setLang === l); }});
    try {{ localStorage.setItem("lang", l); }} catch (_) {{}}
  }}
  btns.forEach(function (b) {{ b.addEventListener("click", function () {{ setLang(b.dataset.setLang); history.replaceState(null, "", "#" + b.dataset.setLang); }}); }});
  var l = location.hash === "#zh" ? "zh" : location.hash === "#en" ? "en" : null;
  if (!l) {{ try {{ l = localStorage.getItem("lang"); }} catch (_) {{}} }}
  setLang(l === "zh" ? "zh" : "en");
}})();
</script>
</body>
</html>
"""

TOGGLE = ('<div class="lang-toggle" role="group" aria-label="Language">'
          '<button type="button" data-set-lang="en">English</button>'
          '<button type="button" data-set-lang="zh">中文</button></div>')


def md(path, prefix):
    return subprocess.run(["pandoc", path, "-f", "markdown", "-t", "html5", "--wrap=none", "--id-prefix=" + prefix],
                          check=True, capture_output=True, text=True).stdout


def build_post(p):
    d = os.path.join(HERE, p["slug"])
    body = {k: md(os.path.join(d, k + ".md"), k + "-") for k in ("en", "zh")}  # prefix keeps footnote ids unique per language
    out = [HEAD.format(lang="en", title=html.escape(p["en"]), desc=html.escape(p["sum_en"]), root="../../")]
    out.append('<main class="post">')
    out.append('<nav class="crumbs"><a href="../../">Home</a> · <a href="../">Blog</a></nav>')
    out.append(TOGGLE)
    for k in ("en", "zh"):
        out.append('<article data-lang="%s"%s>' % (k, "" if k == "en" else " hidden"))
        out.append('<img class="post-logo" src="img/logo.png" alt="R²I logo" width="160" height="160">')
        out.append('<header class="post-head"><h1>%s</h1><p class="byline">%s · <time datetime="%s">%s</time></p></header>'
                   % (html.escape(p[k]), AUTHOR, p["date"], p["date"]))
        out.append(body[k])
        out.append("</article>")
    out.append("</main>")
    out.append(TAIL.format(author=AUTHOR))
    open(os.path.join(d, "index.html"), "w", encoding="utf-8").write("\n".join(out))


def build_index():
    out = [HEAD.format(lang="en", title="Blog · " + AUTHOR, desc="Notes on agents, harnesses and research.", root="../")]
    out.append('<main class="post">')
    out.append('<nav class="crumbs"><a href="../">Home</a></nav>')
    out.append(TOGGLE)
    for k, h in (("en", "Blog"), ("zh", "博客")):
        out.append('<section data-lang="%s"%s><h1 class="index-title">%s</h1><ul class="post-list">' % (k, "" if k == "en" else " hidden", h))
        for p in POSTS:
            out.append('<li><time datetime="%s">%s</time><a href="%s/#%s">%s</a><p>%s</p></li>'
                       % (p["date"], p["date"], p["slug"], k, html.escape(p[k]), html.escape(p["sum_" + k])))
        out.append("</ul></section>")
    out.append("</main>")
    out.append(TAIL.format(author=AUTHOR))
    open(os.path.join(HERE, "index.html"), "w", encoding="utf-8").write("\n".join(out))


for p in POSTS:
    build_post(p)
build_index()
print("built", len(POSTS), "post(s) + index")
