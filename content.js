// ============================================================
//  All homepage content lives here. Edit this file, commit, push.
//  Leave a field as "" (or an empty list []) to hide it.
//  Text fields allow basic HTML (<a>, <b>, <i>).
// ============================================================

window.SITE = {
  name: "Ziqian Zhang",
  nameAlt: "", // e.g. Chinese name, shown next to the English name
  tagline: "CS & Math @ Lehigh University",
  location: "Bethlehem, PA",
  avatar: "https://avatars.githubusercontent.com/u/144947899?v=4", // or "assets/avatar.jpg"

  links: {
    email: "ziz227@lehigh.edu",
    scholar: "https://scholar.google.com/citations?user=in3GN9cAAAAJ",
    github: "https://github.com/Leozz04",
    linkedin: "https://www.linkedin.com/in/ziqian-zhang-64b646290/",
    resume: "assets/resume.pdf", // synced from codex-ziqian, see README
  },

  about: [
    "I'm an undergraduate at <b>Lehigh University</b>, double-majoring in Computer Science and Mathematics " +
      "(expected graduation January 2027). I work on <b>LLM evaluation</b> and <b>reinforcement learning</b> for language models, " +
      "and on medical AI.",
    "I was co-first author of <b>RankLLM</b> (ICLR 2026), which ranks LLMs by how hard the questions they answer correctly are. " +
      "I'm currently a student research intern at the <b>Xing Lab, Stanford Medicine</b>, and I'm building " +
      "<a href=\"https://openlair.github.io/red-flag-research.github.io/\" target=\"_blank\" rel=\"noopener\">Red-flag Research</a>, " +
      "an OpenLAIR project that screens conference submissions for automated-research attacks on peer review.",
  ],

  interests: [
    "LLM evaluation",
    "Reinforcement learning for LLMs",
    "Medical AI",
    "Research integrity",
  ],

  // Newest first.
  news: [
    { date: "2026-10", text: "Launched <a href=\"https://openlair.github.io/red-flag-research.github.io/\" target=\"_blank\" rel=\"noopener\">Red-flag Research</a>: public screening of ICLR 2027 submissions for paper laundering." },
    { date: "2026-06", text: "Joined the Xing Lab, Department of Radiation Oncology, Stanford Medicine, as a student research intern." },
    { date: "2026", text: "<b>RankLLM</b> accepted at ICLR 2026 (co-first author)." },
  ],

  // authors: wrap your own name in <b>…</b>. links: any label → URL.
  publications: [
    {
      title: "RankLLM: Weighted Ranking of LLMs by Quantifying Question Difficulty",
      authors: "<b>Ziqian Zhang</b>*, Xingjian Hu*, et al. &nbsp;(* equal contribution)",
      venue: "International Conference on Learning Representations (ICLR) 2026",
      links: {
        arXiv: "https://arxiv.org/abs/2602.12424",
        code: "https://github.com/Leozz04/EIP",
      },
    },
  ],

  // Research projects. links: any label → URL.
  research: [
    {
      name: "Red-flag Research",
      role: "OpenLAIR",
      desc: "Screens conference submissions for automated-research attacks, starting with paper laundering in ICLR 2027. " +
        "Each submission is checked against earlier public papers; close matches without clear credit are flagged for a person " +
        "to compare side by side. A flag is a lead for human review, not a verdict.",
      links: {
        homepage: "https://openlair.github.io/red-flag-research.github.io/",
        live: "https://openlair.github.io/red-flag-research.github.io/live/",
      },
    },
    {
      name: "RankLLM",
      role: "Co-first author · LAIR Lab, Lehigh",
      desc: "Bidirectional score propagation on a directed model–question bipartite graph, with a convergence proof via " +
        "Perron–Frobenius. Evaluated on 30 LLMs and 35,550 questions: 90% agreement with human difficulty judgments, " +
        "outperforms IRT baselines, converges in 0.006 s on consumer hardware, and keeps ρ > 0.99 under perturbation.",
      links: { paper: "https://arxiv.org/abs/2602.12424", code: "https://github.com/Leozz04/EIP" },
    },
    {
      name: "Medical-R1",
      role: "Co-author · LAIR Lab, Lehigh",
      desc: "Structured rewards for four answer types across 70 clinical calculators on MedCalc-Bench. Trained 10 models " +
        "(3B–14B) with GRPO, RLOO and REINFORCE++ in a customized VERL stack over 65+ runs, with SFT→RL warm-start, " +
        "layer-wise ablations and model merging.",
    },
  ],

  // Positions. Newest first.
  experience: [
    {
      role: "Student Research Intern",
      org: "Xing Lab, Dept. of Radiation Oncology, Stanford Medicine · Prof. Lei Xing",
      period: "Jun 2026 – Present",
      details: [
        "WSI biomarker prediction and 3D CT segmentation. Built interpretable feature-map-based MIL with strict TCGA→CPTAC " +
          "external validation, improving external AUROC by 2+ points across biomarkers and MIL architectures.",
        "WSI manuscript submitted to <i>Nature Biomedical Engineering</i>.",
      ],
    },
    {
      role: "Founding Engineer",
      org: "Vibe-researcher (AI-Researcher + Research-Agent)",
      period: "Jan 2026 – Present",
      details: [
        "Multi-agent MVP that turns natural-language research ideas into curated paper sets, innovation graphs and standardized benchmark instances.",
      ],
    },
    {
      role: "Co-founder & Engineer",
      org: "Mygrants.ai",
      period: "Oct 2025 – Present",
      details: [
        "Grant discovery and proposal platform: researcher profiles from crawled publications, semantic grant–faculty matching, " +
          "COA list generation and collaborative LaTeX editing. Cut proposal preparation from weeks to hours.",
      ],
    },
    {
      role: "Undergraduate Research Assistant",
      org: "LAIR Lab, Lehigh University · Prof. Lichao Sun",
      period: "May 2024 – May 2026",
      details: ["RankLLM (co-first author, ICLR 2026) and Medical-R1 (co-author)."],
    },
  ],

  education: [
    {
      school: "Lehigh University",
      degree: "B.A., double major in Computer Science and Mathematics",
      period: "Aug 2023 – Jan 2027",
      location: "Bethlehem, PA",
      details: ["GPA 3.94 / 4.00 · Dean's List"],
    },
  ],

  // Code and open-source cards.
  projects: [
    {
      name: "EIP / RankLLM code",
      url: "https://github.com/Leozz04/EIP",
      desc: "Difficulty-aware model ranking from a model × question response matrix, plus the benchmark pipeline that builds the matrix.",
      tags: ["Python", "LLM evaluation"],
    },
    {
      name: "rubric-eval · OpenAI Agents SDK adapter",
      url: "https://github.com/Kareem-Rashed/rubric-eval/pull/14",
      desc: "Dependency-free adapter that captures Agents SDK runs as evaluation cases, keeping tool, search and handoff traces. In review.",
      tags: ["Open source", "Agents"],
    },
  ],

  footer: "Last updated: Oct 2026",
};
