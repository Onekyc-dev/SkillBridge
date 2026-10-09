// Diagrams and quizzes, matched to each module by position (first entry = module 1).
// answer = number of the correct option, counting from 0.
export const extras = {
  "virtual-assistant-basics": [
    {
      diagram: {
        type: "hub",
        title: "What a virtual assistant can take off a client's plate",
        center: "Virtual assistant",
        items: [
          { label: "Email", note: "Sort, label and draft replies" },
          { label: "Scheduling", note: "Meetings, reminders, time zones" },
          { label: "Research", note: "Prices, contacts, quick lookups" },
          { label: "Spreadsheets", note: "Track orders, leads and invoices" },
          { label: "Customer messages", note: "First reply to common questions" },
          { label: "Social media", note: "Post and answer comments" },
        ],
      },
      quiz: [
        { q: "A client hires you for 10 hours a week. What are they mainly paying for?", options: ["Their own time back", "A university-level qualification", "Your office equipment", "A fixed salary like an employee"], answer: 0, why: "Clients hire VAs to free up their time. You are self-employed and bring your own tools." },
        { q: "Which statement about virtual assistants is true?", options: ["You must hold a degree", "You usually work for one employer only", "You often serve several clients from your own computer", "You must live in the same city as the client"], answer: 2, why: "Many VAs work remotely for several clients at once. No degree or location is required." },
        { q: "Which quality helps a new VA keep clients the longest?", options: ["Knowing every software tool", "Being reliable", "Charging the lowest price", "Working only at night"], answer: 1, why: "Clients stay with VAs they can depend on. Tools can be learned, trust is earned." },
      ],
    },
    {
      diagram: {
        type: "columns",
        title: "Who decides what: sorting a client's email",
        columns: [
          { head: "Answer yourself", tone: "good", items: ["Meeting confirmations", "Receipts and delivery notices", "Questions the client already approved a reply for"] },
          { head: "Draft for approval", items: ["Price or discount requests", "Complaints", "Anything new you haven't replied to before"] },
          { head: "Flag for the client", tone: "bad", items: ["Contracts and payments", "Anything unclear", "Private or sensitive messages"] },
        ],
      },
      quiz: [
        { q: "An email asks the client for a discount. Under normal rules, what should you do?", options: ["Reply offering 20% off", "Draft a reply and ask the client to approve it", "Delete it", "Forward it to the client's contacts"], answer: 1, why: "Prices are the client's decision. You prepare the reply and let them approve it." },
        { q: "You are not sure whether an old newsletter folder can be deleted. What is the best move?", options: ["Delete it, it is probably junk", "Ask the client first", "Move it to your own email", "Leave it open on the screen"], answer: 1, why: "Never delete anything without permission. Asking costs a minute, a wrong delete can cost the client a lot." },
        { q: "Why check the inbox at set times instead of all day?", options: ["You can ignore urgent messages", "You keep a predictable routine and still finish other tasks", "Clients prefer slow replies", "It uses less data"], answer: 1, why: "A routine keeps replies steady while leaving time for the rest of your work." },
      ],
    },
    {
      diagram: {
        type: "flow",
        title: "Booking a meeting without mix-ups",
        steps: [
          { label: "Check availability", note: "The client's calendar and yours, with a gap between meetings." },
          { label: "Pick a time and name the time zone", note: "For example 3:00 pm Lagos time (WAT)." },
          { label: "Send the invite with a meeting link", note: "Zoom or Google Meet, plus date, time and time zone." },
          { label: "Remind everyone the day before", note: "Especially for important meetings." },
        ],
      },
      quiz: [
        { q: "You invite people in two countries to a call at \"3pm\". What is the problem?", options: ["None, 3pm is the same everywhere", "The invite has no time zone, so people may read it differently", "Calls must be at noon", "A call needs two links"], answer: 1, why: "A time without a time zone can mean different moments for different people." },
        { q: "What should a meeting confirmation include?", options: ["Only the date", "Only the link", "Date, time, time zone and meeting link", "Only the topic"], answer: 2, why: "Everything someone needs to join should be in one message." },
        { q: "What is the main advantage of a tool like Calendly?", options: ["It records every meeting", "People pick open slots themselves, so there is less back-and-forth", "It writes your emails", "It is required by clients"], answer: 1, why: "It replaces long messages like \"Are you free Tuesday?\" with a link." },
      ],
    },
    {
      diagram: {
        type: "columns",
        title: "The four kinds of tools clients expect you to know",
        columns: [
          { head: "Documents", items: ["Google Docs", "Google Sheets", "Shared folders"] },
          { head: "Task boards", items: ["Trello", "Notion", "Move cards: To do, Doing, Done"] },
          { head: "Messaging", items: ["Slack", "WhatsApp", "Short, clear updates"] },
          { head: "Video calls", items: ["Zoom", "Google Meet", "Test link before the call"] },
        ],
      },
      quiz: [
        { q: "A client asks you to \"move the task to Done\". Which kind of tool are they using?", options: ["A task board such as Trello", "A spreadsheet", "A video call app", "An email signature"], answer: 0, why: "Task boards use columns such as To do, Doing and Done." },
        { q: "A client uses a tool you have never seen. What is the best approach?", options: ["Turn the job down", "Skim its help pages and learn the basics: create, share, comment", "Ask the client to switch tools", "Pretend you already know it"], answer: 1, why: "Most tools share the same basics, and clients expect you to learn quickly." },
        { q: "Which file name is best for a shared invoice?", options: ["final.docx", "Invoice-Oct-2026-ClientName.docx", "doc1", "new new new"], answer: 1, why: "A clear name lets anyone find the file without asking you." },
      ],
    },
    {
      diagram: {
        type: "flow",
        title: "A client update that builds trust",
        steps: [
          { label: "What I did", note: "\"Inbox sorted and three invoices filed.\"" },
          { label: "What I need from you", note: "\"Two emails need your decision.\"" },
          { label: "What happens next, and when", note: "\"I'll continue tomorrow morning.\"" },
        ],
      },
      quiz: [
        { q: "You will miss a Friday deadline. What is the best move?", options: ["Say nothing and hope they don't notice", "Tell the client before the deadline and give a new date", "Send it late without comment", "Blame the software"], answer: 1, why: "Warning early lets the client plan. Silence is what damages trust." },
        { q: "Which update is the clearest?", options: ["Done.", "Inbox sorted. Two emails need your decision. I'll continue tomorrow.", "I have been working on a lot of things today.", "Busy day!"], answer: 1, why: "It says what was done, what is needed and what comes next." },
        { q: "Why confirm instructions in writing?", options: ["It creates a record and prevents misunderstandings", "It looks formal", "Clients are legally required to receive it", "It saves data"], answer: 0, why: "A written confirmation settles \"I thought you said...\" before it becomes a problem." },
      ],
    },
    {
      diagram: {
        type: "flow",
        title: "From zero to your first client",
        steps: [
          { label: "Choose your services", note: "Inbox management, scheduling, data entry." },
          { label: "Set up a clean profile", note: "Clear photo, short bio, examples of your work." },
          { label: "Apply every day", note: "A short personal message each time." },
          { label: "Take small first tasks", note: "They earn the reviews that unlock bigger work." },
          { label: "Collect reviews and raise your price", note: "Repeat clients are the goal." },
        ],
      },
      quiz: [
        { q: "A \"client\" sends you a cheque larger than the job pays and asks you to send back the difference. What do you do?", options: ["Send the difference quickly", "Refuse. This is a well-known scam", "Deposit it and send the money", "Ask for even more work"], answer: 1, why: "The cheque eventually bounces, but the money you sent is real and gone." },
        { q: "Which is the best way to apply for jobs?", options: ["Send the same message to 100 jobs", "Send a short personal message that mentions what the client needs", "Send no message", "Write a long life story"], answer: 1, why: "A personal message shows you read the job and care about it." },
        { q: "After a week of applications you have no replies. What is realistic?", options: ["You are not suited to this work", "This is normal. Keep applying and take small tasks to earn reviews", "Pay a service to find you jobs", "Stop for a year"], answer: 1, why: "Many applications are needed before the first reply. Never pay to get a job." },
      ],
    },
  ],
  "data-entry-basics": [
    {
      diagram: {
        type: "flow",
        title: "The life of a data entry task",
        steps: [
          { label: "Source", note: "A document, form, invoice or image." },
          { label: "Type or copy", note: "Into a spreadsheet or database." },
          { label: "Check", note: "Compare with the source." },
          { label: "Submit", note: "Only after the check." },
        ],
      },
      quiz: [
        { q: "What do employers value most in data entry?", options: ["Creative flair", "Accuracy and consistency", "Speed at any cost", "Personal opinions"], answer: 1, why: "The whole point of the work is that the data can be trusted." },
        { q: "Which of these is a typical data entry task?", options: ["Typing invoice figures into a spreadsheet", "Designing a company logo", "Managing a team of 20", "Selling cars"], answer: 0, why: "Moving information from one place to another is the core of the job." },
      ],
    },
    {
      diagram: {
        type: "columns",
        title: "Rushing versus working steadily",
        columns: [
          { head: "Rushing", tone: "bad", items: ["Many typing errors", "Client has to redo the work", "You lose trust and future jobs"] },
          { head: "Steady and accurate", tone: "good", items: ["Few errors", "Client accepts the work first time", "You get repeat work and bigger tasks"] },
        ],
      },
      quiz: [
        { q: "You type fast but make many mistakes. What should you do?", options: ["Keep going, speed is what counts", "Slow down until errors drop, then build speed", "Skip the checking", "Turn off the spell checker"], answer: 1, why: "Accuracy first, speed second." },
        { q: "Why does accuracy matter more than speed?", options: ["Mistakes create extra work for the client and cost you trust", "Clients never measure speed", "Slow typists are paid more", "There is no difference"], answer: 0, why: "A fast file full of errors is worse than a slower clean one." },
        { q: "Which habit helps your typing the most?", options: ["Typing with one finger", "Practising without looking at the keys, with short breaks", "Typing for hours without a break", "Looking only at the keyboard"], answer: 1, why: "Steady practice and rest build speed without causing mistakes." },
      ],
    },
    {
      diagram: {
        type: "table",
        title: "A clean spreadsheet",
        headers: ["Name", "Amount", "Date"],
        rows: [["Ada Obi", "12,500", "2026-03-12"], ["Tunde Bello", "8,000", "2026-03-14"], ["Chioma Eze", "15,250", "2026-03-15"]],
        caption: "The header row stays frozen at the top, each column holds one type of information, and every date uses the same style.",
      },
      quiz: [
        { q: "Why freeze the header row?", options: ["So it stays visible while you scroll", "So nobody can edit the sheet", "So the sheet sorts itself", "So the file is smaller"], answer: 0, why: "You always know which column you are typing into." },
        { q: "Which formula adds the numbers in cells B2 to B11?", options: ["=SUM(B2:B11)", "=ADD(B2,B11)", "=PLUS(B2:B11)", "=TOTAL"], answer: 0, why: "SUM with a range is the standard way to add a column." },
        { q: "A date column holds 12/03/2026, March 12 and 12-3-26. What is the problem?", options: ["There is none", "The formats are inconsistent. Use one style all the way down", "Dates cannot go in sheets", "There are too many dates"], answer: 1, why: "Mixed formats break sorting and filters, and can be misread." },
      ],
    },
    {
      diagram: {
        type: "flow",
        title: "Check before you submit",
        steps: [
          { label: "Re-read the batch", note: "Slowly, not just a glance." },
          { label: "Compare a sample with the source", note: "Pick entries at random." },
          { label: "Run the spell checker", note: "On text columns." },
          { label: "Look for duplicates and blanks", note: "Ask the client before deleting anything." },
          { label: "Submit", note: "Now the work is ready." },
        ],
      },
      quiz: [
        { q: "You find two identical rows. What do you do first?", options: ["Delete one right away", "Check with the client before deleting", "Delete both", "Ignore them"], answer: 1, why: "Duplicates can be on purpose. Confirm before you remove data." },
        { q: "What is the best way to check a 500-row batch?", options: ["Trust that it is fine", "Compare a sample with the source and run a spell check", "Retype everything", "Skip it to save time"], answer: 1, why: "A sample check plus tools catches most errors without redoing the work." },
        { q: "You find blank cells in a required column. What is the best move?", options: ["Fill them with guesses", "Flag them to the client", "Delete those rows", "Hide the column"], answer: 1, why: "Never invent data. Tell the client what is missing." },
      ],
    },
    {
      diagram: {
        type: "columns",
        title: "Real job or scam?",
        columns: [
          { head: "Looks real", tone: "good", items: ["Free to apply", "Clear task and agreed pay", "Established platform with reviews", "Payment goes through the platform"] },
          { head: "Warning signs", tone: "bad", items: ["Asks you to pay a fee or buy training", "Offers you high pay for little work", "Wants a private chat straight away", "Asks for bank details before any work"] },
        ],
      },
      quiz: [
        { q: "A job asks you to pay for \"training materials\" before you start. What do you do?", options: ["Pay it, it is a small amount", "Treat it as a warning sign and do not pay", "Pay half now and half later", "Ask a friend to pay"], answer: 1, why: "Real employers do not charge you to get a job." },
        { q: "Which of these is a warning sign?", options: ["A listing on an established platform with reviews", "An unasked offer with high pay for very little work", "A clear task with agreed pay", "A client with good reviews"], answer: 1, why: "Offers that seem too good, especially unasked, are a classic scam pattern." },
        { q: "When should you share personal and bank details?", options: ["As soon as someone asks", "Only after the work and payment are clearly agreed", "Never, with anyone", "Before applying"], answer: 1, why: "Wait until the job is real and the terms are clear." },
      ],
    },
  ],
};
