// Renders content.js into the page. You normally don't need to edit this file.
(function () {
  const S = window.SITE;
  const $ = (id) => document.getElementById(id);

  const ICONS = {
    email: '<path d="M3 5h18v14H3z" fill="none" stroke="currentColor" stroke-width="2"/><path d="m3 6 9 7 9-7" fill="none" stroke="currentColor" stroke-width="2"/>',
    scholar: '<path d="M12 3 1 9l11 6 9-4.9V17h2V9z"/><path d="M5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.8z"/>',
    github: '<path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5"/>',
    linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/>',
    resume: '<path d="M6 2h9l5 5v15H6z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M14 2v6h6M9 13h8M9 17h8" fill="none" stroke="currentColor" stroke-width="2"/>',
  };
  const LABELS = { email: "Email", scholar: "Google Scholar", github: "GitHub", linkedin: "LinkedIn", resume: "CV / Resume" };

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const section = (id, title, body) => `<section id="${id}"><h2>${title}</h2>${body}</section>`;
  const list = (items) => (items && items.length ? `<ul>${items.map((d) => `<li>${d}</li>`).join("")}</ul>` : "");

  // ---- sidebar
  document.title = S.name;
  $("avatar").src = S.avatar;
  $("avatar").alt = S.name;
  $("name").innerHTML = esc(S.name) + (S.nameAlt ? ` <span class="name-alt">${esc(S.nameAlt)}</span>` : "");
  $("tagline").textContent = S.tagline;
  $("location").textContent = S.location;
  $("links").innerHTML = Object.entries(S.links)
    .filter(([, url]) => url)
    .map(([key, url]) => {
      const href = key === "email" && !url.startsWith("mailto:") ? "mailto:" + url : url;
      const external = /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : "";
      return `<a href="${esc(href)}"${external}><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[key] || ""}</svg><span>${LABELS[key] || key}</span></a>`;
    })
    .join("");

  // ---- main column
  const parts = [];

  parts.push(section("about", "About",
    S.about.map((p) => `<p>${p}</p>`).join("") +
    (S.interests.length ? `<div class="chips">${S.interests.map((i) => `<span>${esc(i)}</span>`).join("")}</div>` : "")));

  if (S.news.length) {
    parts.push(section("news", "News",
      `<dl class="news">${S.news.map((n) => `<dt>${esc(n.date)}</dt><dd>${n.text}</dd>`).join("")}</dl>`));
  }

  const pills = (links) => links
    ? `<p class="pills">${Object.entries(links).map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(k)}</a>`).join("")}</p>`
    : "";

  if (S.publications.length) {
    parts.push(section("publications", "Publications",
      S.publications.map((p) => `
        <article class="entry">
          <h3>${esc(p.title)}</h3>
          <p class="meta">${p.authors}</p>
          <p class="meta"><i>${esc(p.venue)}</i></p>
          ${pills(p.links)}
        </article>`).join("")));
  }

  if (S.research && S.research.length) {
    parts.push(section("research", "Research",
      S.research.map((r) => `
        <article class="entry">
          <h3>${esc(r.name)}${r.role ? `<span class="sub">${esc(r.role)}</span>` : ""}</h3>
          <p class="desc">${r.desc}</p>
          ${pills(r.links)}
        </article>`).join("")));
  }

  const timeline = (items, head) => items.map((e) => `
    <article class="entry">
      <div class="entry-head"><h3>${head(e)}</h3><span class="period">${esc(e.period || "")}</span></div>
      ${list(e.details)}
    </article>`).join("");

  if (S.experience.length) {
    parts.push(section("experience", "Experience", timeline(S.experience, (e) =>
      `${esc(e.role)}<span class="sub">${esc(e.org)}</span>`)));
  }

  if (S.education.length) {
    parts.push(section("education", "Education", timeline(S.education, (e) =>
      `${esc(e.school)}<span class="sub">${esc(e.degree)}${e.location ? " · " + esc(e.location) : ""}</span>`)));
  }

  if (S.projects.length) {
    parts.push(section("projects", "Code & Open Source",
      `<div class="cards">${S.projects.map((p) => `
        <a class="card" href="${esc(p.url)}" target="_blank" rel="noopener">
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.desc)}</p>
          <p class="tags">${(p.tags || []).map((t) => `<span>${esc(t)}</span>`).join("")}</p>
        </a>`).join("")}</div>`));
  }

  $("main").innerHTML = parts.join("");
  $("footer").textContent = `© ${new Date().getFullYear()} ${S.name}` + (S.footer ? ` · ${S.footer}` : "");

  // ---- theme toggle (remembers choice per browser)
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem("theme");
    if (saved) root.dataset.theme = saved;
  } catch (_) {}
  $("theme-toggle").addEventListener("click", () => {
    const dark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (_) {}
  });
})();
