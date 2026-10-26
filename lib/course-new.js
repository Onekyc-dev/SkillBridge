const makeQuiz = (topic, correct, wrongA, wrongB) => [
  { q: `What is a good first step when working on ${topic}?`, options: [correct, wrongA, wrongB, "Skip the instructions and guess"], answer: 0, why: "Start with the requirements, choose a sensible process, and check the result." },
  { q: `Which habit improves the quality of ${topic}?`, options: ["Never review your work", "Keep no record of changes", "Check accuracy and follow the brief", "Copy results without checking"], answer: 2, why: "Accuracy and following the brief make work more reliable." },
  { q: `If you are unsure about a task involving ${topic}, what should you do?`, options: ["Hide the problem", "Ask a clear question and verify the requirements", "Invent missing facts", "Share private information publicly"], answer: 1, why: "Clarifying requirements is safer than guessing or inventing information." }
];
const makeModules = (items) => items.map(([title, text, practice], index) => ({
  title, videoId: "", text, practice, quiz: makeQuiz(title.toLowerCase(), "Read the requirements and plan a clear, accurate result", "Publish immediately without checking", "Ignore the audience and goal")
}));

export const extraCourses = [
  {
    slug: "spreadsheet-skills-for-beginners", title: "Spreadsheet Skills for Beginners", category: "Data & Research", level: "Beginner", minutes: 60, duration: "About 1 hour", summary: "Build confidence with rows, columns, formulas, sorting, and everyday spreadsheet tasks.",
    modules: makeModules([
      ["Understand rows, columns, and cells", "Spreadsheets organize information into rows and columns. A cell is where one row and one column meet. Clear headings make a table easier to understand.", "Create a small table with headings for item, quantity, and price."],
      ["Enter and format data", "Consistent formats make information easier to scan. Use one date format, sensible column widths, and clear headings. Avoid merging cells inside a data table.", "Format a small list so headings, dates, and numbers are consistent."],
      ["Use basic formulas", "Formulas can calculate totals and averages. In many spreadsheet tools, formulas begin with an equals sign. Check cell references before relying on a result.", "Write down a formula that totals three item prices and explain how you would check it."],
      ["Sort, filter, and check", "Sorting changes the order of records, while filtering temporarily shows records that match a condition. Keep related rows together and check the result after sorting.", "Describe how you would find all orders marked Pending without deleting other orders."]
    ]), jobs: [{ name: "We Work Remotely", url: "https://weworkremotely.com/remote-jobs", note: "Browse remote roles and check each listing carefully.", cta: "Browse jobs" }]
  },
  {
    slug: "social-media-management-basics", title: "Social Media Management Basics", category: "Marketing & Media", level: "Beginner", minutes: 70, duration: "About 70 minutes", summary: "Learn content planning, audience awareness, community replies, and simple performance checks.",
    modules: makeModules([
      ["Understand the role", "Social media managers plan content, publish approved posts, respond to the community, and report useful results. The role is more than posting frequently.", "List three tasks you would agree with a client before managing an account."],
      ["Know the audience and goal", "A useful post has a clear audience and purpose. Goals might include awareness, conversation, support, or visits to a website.", "Choose one audience and write a clear goal for a post."],
      ["Build a content calendar", "A calendar helps teams plan topics, formats, owners, and publishing dates. Leave room for timely updates and approval.", "Draft a three-post weekly calendar with topic, format, and goal."],
      ["Reply safely and measure results", "Use a respectful voice, do not expose private details in public replies, and escalate threats or sensitive account issues. Measure results against the post's goal.", "Write a safe reply to a public complaint and name one metric you would review."]
    ]), jobs: [{ name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/", note: "Search for junior social media and content assistant roles.", cta: "Search jobs" }]
  },
  {
    slug: "beginner-graphic-design", title: "Beginner Graphic Design", category: "Design & Creative", level: "Beginner", minutes: 65, duration: "About 1 hour", summary: "Learn layout, contrast, typography, colour choices, and how to prepare a simple design brief.",
    modules: makeModules([
      ["Start with a design brief", "A brief explains the audience, message, format, deadline, and brand requirements. Clarify missing details before creating a design.", "Write a short brief for a square event announcement graphic."],
      ["Use hierarchy and spacing", "Visual hierarchy helps viewers notice the most important information first. Size, placement, contrast, and spacing guide the eye.", "Describe the order in which a viewer should read a simple event poster."],
      ["Choose readable type and colour", "Use a small number of type styles and maintain strong text contrast. Colour should support the message and remain readable on mobile screens.", "Choose two type styles and explain how you would check text contrast."],
      ["Review and export a design", "Check spelling, alignment, margins, image rights, and the requested dimensions before exporting. Keep an editable source copy when possible.", "Create a pre-delivery checklist for a social media graphic."]
    ]), jobs: [{ name: "Behance", url: "https://www.behance.net/joblist", note: "Explore creative opportunities and portfolio examples.", cta: "Explore opportunities" }]
  },
  {
    slug: "web-research-and-fact-checking", title: "Web Research & Fact-Checking Basics", category: "Data & Research", level: "Beginner", minutes: 60, duration: "About 1 hour", summary: "Find reliable sources, verify claims, record citations, and present research clearly.",
    modules: makeModules([
      ["Turn a request into research questions", "A clear question helps you search efficiently. Identify what must be known, the time period, and what evidence would answer the request.", "Turn a broad topic into three specific research questions."],
      ["Evaluate source reliability", "Check who published a source, its date, evidence, expertise, and whether other independent sources support the claim.", "Write a checklist for evaluating a webpage before using it as evidence."],
      ["Verify facts across sources", "Important claims should be checked against more than one credible source when possible. Distinguish a confirmed fact from an opinion or estimate.", "Explain how you would verify a statistic before including it in a report."],
      ["Record findings clearly", "A useful research note records the claim, source, date checked, and any limitation. Cite sources so another person can retrace your work.", "Draft a short research note template with source and verification fields."]
    ]), jobs: [{ name: "FlexJobs", url: "https://www.flexjobs.com/", note: "Explore research and administrative listings; review fees and terms before paying.", cta: "Browse listings" }]
  },
  {
    slug: "freelance-work-readiness", title: "Freelance Work Readiness", category: "Career Foundations", level: "Beginner", minutes: 65, duration: "About 1 hour", summary: "Prepare a simple service offer, scope work, communicate with clients, and avoid common scams.",
    modules: makeModules([
      ["Choose a service you can demonstrate", "A clear beginner service describes the task, deliverable, and intended client. Start with work you can practise and show honestly.", "Write a one-sentence service offer based on a skill you can demonstrate."],
      ["Define scope and deadlines", "Scope describes what is included, what is excluded, the deadline, and how changes will be handled. Confirm expectations in writing.", "Draft a short scope for a small task, including one boundary."],
      ["Communicate and price responsibly", "Ask questions early, agree on deliverables, and explain what affects price. Do not promise outcomes outside your control.", "Write a polite message asking a client to clarify an unclear request."],
      ["Spot scams and build proof", "Be cautious of upfront fees to obtain work, overpayment cheques, requests to move money, or pressure to share sensitive information. Build a portfolio using clearly labelled practice projects.", "List three warning signs of a suspicious job offer and one safe next step."]
    ]), jobs: [{ name: "Contra", url: "https://contra.com/opportunities", note: "Explore freelance opportunities and build a portfolio.", cta: "Browse opportunities" }]
  }
];
