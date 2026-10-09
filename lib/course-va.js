// Virtual Assistant Basics
// Each module holds its lesson text, a practice task, a diagram and a short quiz.
// Separate paragraphs with a blank line. Optional: videoId (YouTube) and start (seconds).
// For each quiz question, answer is the number of the correct option, counting from 0.
export const vaCourse = {
  "slug": "virtual-assistant-basics",
  "title": "Virtual Assistant Basics",
  "category": "Admin & Support",
  "level": "Beginner",
  "minutes": 120,
  "duration": "About 2 hours",
  "summary": "Learn the core skills clients hire virtual assistants for, from your first email to your first invoice.",
  "modules": [
    {
      "title": "What a virtual assistant does",
      "videoId": "",
      "text": "A virtual assistant (VA) is a self-employed person who supports a business owner or busy professional from a distance. You work from your own computer, and many VAs serve several clients at once.\n\nTypical tasks include managing email, scheduling meetings, researching, typing up notes, updating spreadsheets, answering customer messages and posting on social media. You don't need a degree. You need to be reliable, organized and quick to learn new tools.\n\nClients usually pay by the hour or a monthly fee for agreed hours. What they are really buying is their own time back, so the VAs who keep clients are the dependable ones.",
      "practice": "Write down five things you already do well, such as organizing, writing or researching. Next to each one, name a VA task it matches.",
      "diagram": {
        "type": "hub",
        "title": "What a virtual assistant can take off a client's plate",
        "center": "Virtual assistant",
        "items": [
          {
            "label": "Email",
            "note": "Sort, label and draft replies"
          },
          {
            "label": "Scheduling",
            "note": "Meetings, reminders, time zones"
          },
          {
            "label": "Research",
            "note": "Prices, contacts, quick lookups"
          },
          {
            "label": "Spreadsheets",
            "note": "Track orders, leads and invoices"
          },
          {
            "label": "Customer messages",
            "note": "First reply to common questions"
          },
          {
            "label": "Social media",
            "note": "Post and answer comments"
          }
        ]
      },
      "quiz": [
        {
          "q": "A client hires you for 10 hours a week. What are they mainly paying for?",
          "options": [
            "Their own time back",
            "A university-level qualification",
            "Your office equipment",
            "A fixed salary like an employee"
          ],
          "answer": 0,
          "why": "Clients hire VAs to free up their time. You are self-employed and bring your own tools."
        },
        {
          "q": "Which statement about virtual assistants is true?",
          "options": [
            "You must hold a degree",
            "You usually work for one employer only",
            "You often serve several clients from your own computer",
            "You must live in the same city as the client"
          ],
          "answer": 2,
          "why": "Many VAs work remotely for several clients at once. No degree or location is required."
        },
        {
          "q": "Which quality helps a new VA keep clients the longest?",
          "options": [
            "Knowing every software tool",
            "Being reliable",
            "Charging the lowest price",
            "Working only at night"
          ],
          "answer": 1,
          "why": "Clients stay with VAs they can depend on. Tools can be learned, trust is earned."
        }
      ]
    },
    {
      "title": "Setting up your workspace",
      "videoId": "",
      "text": "You do not need expensive equipment to start. A laptop or a good phone, a steady internet connection and a quiet place to work are enough. Clients care about whether you show up on time and do the work well.\n\nPlan for problems before they happen. Power cuts and weak networks are common in many places, so keep your devices charged, have a backup data plan or a second network, and know where you can work if your usual place goes offline. Tell a client early if you might be offline.\n\nKeep your files backed up. Save important work to cloud storage such as Google Drive, so a lost phone or a broken laptop does not mean lost work.",
      "practice": "List your device, your main internet source and one backup. Then write what you would do if the power went out during a client call.",
      "diagram": {
        "type": "hub",
        "title": "A simple, reliable setup",
        "center": "Your workspace",
        "items": [
          {
            "label": "Device",
            "note": "Laptop or a good phone"
          },
          {
            "label": "Internet",
            "note": "A main source plus a backup"
          },
          {
            "label": "Power",
            "note": "Charged devices, a power bank"
          },
          {
            "label": "Quiet place",
            "note": "For calls and focus"
          },
          {
            "label": "Cloud backup",
            "note": "Google Drive or similar"
          }
        ]
      },
      "quiz": [
        {
          "q": "A client call is in an hour and your network is weak. What is the best move?",
          "options": [
            "Hope for the best",
            "Prepare a backup network and warn the client early if there may be a problem",
            "Cancel without telling anyone",
            "Ask the client to pay for your data"
          ],
          "answer": 1,
          "why": "Preparing a backup and warning early shows you are dependable."
        },
        {
          "q": "Why save your work to cloud storage?",
          "options": [
            "It protects your work if a device is lost or breaks",
            "It makes files bigger",
            "Clients only accept cloud files",
            "It removes the need for passwords"
          ],
          "answer": 0,
          "why": "A backup in the cloud means a broken laptop is an inconvenience, not a disaster."
        },
        {
          "q": "What do clients care about most when it comes to your setup?",
          "options": [
            "The newest, most expensive laptop",
            "That you show up on time and do good work",
            "A big desk",
            "A fancy background"
          ],
          "answer": 1,
          "why": "Reliability matters far more than fancy equipment."
        }
      ]
    },
    {
      "title": "Managing email and inboxes",
      "videoId": "",
      "text": "Inbox management means keeping a client's email under control so nothing important is missed. Start by agreeing rules with the client: which emails you answer yourself, which you draft for approval, and which you flag for them.\n\nUse labels or folders such as Urgent, Waiting and Invoices. Unsubscribe from junk, and save template replies for questions that repeat. Check the inbox at set times instead of all day.\n\nNever delete anything without permission, and never share a client's private information. When you're unsure, ask first.",
      "practice": "Create a free Gmail account. Make three labels, then write a short template reply that says you received the message and will answer within 24 hours.",
      "diagram": {
        "type": "columns",
        "title": "Who decides what: sorting a client's email",
        "columns": [
          {
            "head": "Answer yourself",
            "tone": "good",
            "items": [
              "Meeting confirmations",
              "Receipts and delivery notices",
              "Questions the client already approved a reply for"
            ]
          },
          {
            "head": "Draft for approval",
            "items": [
              "Price or discount requests",
              "Complaints",
              "Anything new you haven't replied to before"
            ]
          },
          {
            "head": "Flag for the client",
            "tone": "bad",
            "items": [
              "Contracts and payments",
              "Anything unclear",
              "Private or sensitive messages"
            ]
          }
        ]
      },
      "quiz": [
        {
          "q": "An email asks the client for a discount. Under normal rules, what should you do?",
          "options": [
            "Reply offering 20% off",
            "Draft a reply and ask the client to approve it",
            "Delete it",
            "Forward it to the client's contacts"
          ],
          "answer": 1,
          "why": "Prices are the client's decision. You prepare the reply and let them approve it."
        },
        {
          "q": "You are not sure whether an old newsletter folder can be deleted. What is the best move?",
          "options": [
            "Delete it, it is probably junk",
            "Ask the client first",
            "Move it to your own email",
            "Leave it open on the screen"
          ],
          "answer": 1,
          "why": "Never delete anything without permission. Asking costs a minute, a wrong delete can cost the client a lot."
        },
        {
          "q": "Why check the inbox at set times instead of all day?",
          "options": [
            "You can ignore urgent messages",
            "You keep a predictable routine and still finish other tasks",
            "Clients prefer slow replies",
            "It uses less data"
          ],
          "answer": 1,
          "why": "A routine keeps replies steady while leaving time for the rest of your work."
        }
      ]
    },
    {
      "title": "Calendars and scheduling",
      "videoId": "",
      "text": "Scheduling sounds simple until time zones and double-bookings appear. Always write the time zone in every invitation, and use Google Calendar, which is free, to display more than one time zone.\n\nBefore booking, check the client's availability and leave a little time between meetings. Send a confirmation with the date, time, time zone and meeting link, such as Zoom or Google Meet. For important meetings, send a reminder the day before.\n\nScheduling tools like Calendly let other people pick open slots themselves, which saves long back-and-forth messages.",
      "practice": "In Google Calendar, create an event for tomorrow at 3pm, add a Google Meet link, and turn on a second time zone display.",
      "diagram": {
        "type": "flow",
        "title": "Booking a meeting without mix-ups",
        "steps": [
          {
            "label": "Check availability",
            "note": "The client's calendar and yours, with a gap between meetings."
          },
          {
            "label": "Pick a time and name the time zone",
            "note": "For example 3:00 pm Lagos time (WAT)."
          },
          {
            "label": "Send the invite with a meeting link",
            "note": "Zoom or Google Meet, plus date, time and time zone."
          },
          {
            "label": "Remind everyone the day before",
            "note": "Especially for important meetings."
          }
        ]
      },
      "quiz": [
        {
          "q": "You invite people in two countries to a call at \"3pm\". What is the problem?",
          "options": [
            "None, 3pm is the same everywhere",
            "The invite has no time zone, so people may read it differently",
            "Calls must be at noon",
            "A call needs two links"
          ],
          "answer": 1,
          "why": "A time without a time zone can mean different moments for different people."
        },
        {
          "q": "What should a meeting confirmation include?",
          "options": [
            "Only the date",
            "Only the link",
            "Date, time, time zone and meeting link",
            "Only the topic"
          ],
          "answer": 2,
          "why": "Everything someone needs to join should be in one message."
        },
        {
          "q": "What is the main advantage of a tool like Calendly?",
          "options": [
            "It records every meeting",
            "People pick open slots themselves, so there is less back-and-forth",
            "It writes your emails",
            "It is required by clients"
          ],
          "answer": 1,
          "why": "It replaces long messages like \"Are you free Tuesday?\" with a link."
        }
      ]
    },
    {
      "title": "Everyday tools",
      "videoId": "",
      "text": "Clients expect you to learn the tools they already use. Most fall into four groups: documents and spreadsheets (Google Docs and Sheets), task boards (Trello or Notion), messaging (Slack or WhatsApp) and video calls (Zoom or Google Meet).\n\nYou don't need to master everything. Learn the basics: create, share, comment, and move tasks between columns. Most tools have free plans and built-in tutorials, so skim the help pages when a client gives you a new one.\n\nName files clearly and keep them in shared folders so the client can always find them.",
      "practice": "Create a free Trello board with three columns called To do, Doing and Done. Add five tasks and move one to Done.",
      "diagram": {
        "type": "columns",
        "title": "The four kinds of tools clients expect you to know",
        "columns": [
          {
            "head": "Documents",
            "items": [
              "Google Docs",
              "Google Sheets",
              "Shared folders"
            ]
          },
          {
            "head": "Task boards",
            "items": [
              "Trello",
              "Notion",
              "Move cards: To do, Doing, Done"
            ]
          },
          {
            "head": "Messaging",
            "items": [
              "Slack",
              "WhatsApp",
              "Short, clear updates"
            ]
          },
          {
            "head": "Video calls",
            "items": [
              "Zoom",
              "Google Meet",
              "Test link before the call"
            ]
          }
        ]
      },
      "quiz": [
        {
          "q": "A client asks you to \"move the task to Done\". Which kind of tool are they using?",
          "options": [
            "A task board such as Trello",
            "A spreadsheet",
            "A video call app",
            "An email signature"
          ],
          "answer": 0,
          "why": "Task boards use columns such as To do, Doing and Done."
        },
        {
          "q": "A client uses a tool you have never seen. What is the best approach?",
          "options": [
            "Turn the job down",
            "Skim its help pages and learn the basics: create, share, comment",
            "Ask the client to switch tools",
            "Pretend you already know it"
          ],
          "answer": 1,
          "why": "Most tools share the same basics, and clients expect you to learn quickly."
        },
        {
          "q": "Which file name is best for a shared invoice?",
          "options": [
            "final.docx",
            "Invoice-Oct-2026-ClientName.docx",
            "doc1",
            "new new new"
          ],
          "answer": 1,
          "why": "A clear name lets anyone find the file without asking you."
        }
      ]
    },
    {
      "title": "Organizing files and notes",
      "videoId": "",
      "text": "Good organization saves hours. Give every client one folder, and inside it use clear sub-folders such as Invoices, Documents and Notes. Name files so you can understand them without opening them, for example Invoice-Oct-2026-ClientName.\n\nKeep notes about each client: how they like to be contacted, their deadlines, and their usual requests. Put them in one place, such as a simple document or a Notion page. Next week you will not remember every detail, but your notes will.\n\nUse templates for things you do often, like a weekly report or a reply to a new enquiry. A template keeps your work consistent and saves typing.",
      "practice": "Create a folder called Client-Example with three sub-folders, then write a one-page notes document about an imaginary client.",
      "diagram": {
        "type": "flow",
        "title": "Where does a new file go?",
        "steps": [
          {
            "label": "Name it clearly",
            "note": "So you know what it is without opening it."
          },
          {
            "label": "Open the client's folder",
            "note": "One folder per client."
          },
          {
            "label": "Choose the sub-folder",
            "note": "Invoices, Documents or Notes."
          },
          {
            "label": "Update your notes",
            "note": "If something important changed."
          }
        ]
      },
      "quiz": [
        {
          "q": "Which structure works best?",
          "options": [
            "One folder per client with clear sub-folders",
            "Everything on the desktop",
            "One huge folder for all clients",
            "Files named by date only"
          ],
          "answer": 0,
          "why": "A predictable structure means anything can be found in seconds."
        },
        {
          "q": "Why keep notes on each client?",
          "options": [
            "So you remember their preferences and deadlines without asking again",
            "Because clients must read them",
            "To store their passwords",
            "There is no real reason"
          ],
          "answer": 0,
          "why": "Notes make you look organized and save the client from repeating themselves."
        },
        {
          "q": "What is the main benefit of a template?",
          "options": [
            "It keeps your work consistent and saves time",
            "It makes replies longer",
            "It replaces talking to clients",
            "It hides mistakes"
          ],
          "answer": 0,
          "why": "Templates remove repeated typing and keep quality steady."
        }
      ]
    },
    {
      "title": "Research made simple",
      "videoId": "",
      "text": "Many clients ask you to find information: a list of suppliers, the price of a product, or contact details for a business. Start by writing down exactly what the client wants to know and when they need it.\n\nSearch with specific words, and open more than one source. Prefer official websites and well-known sources over random posts. If two sources disagree, say so instead of quietly picking one. Always note where each fact came from.\n\nPresent the result simply: a short summary at the top, then a table or list with links. The client should be able to use your research in a minute, without extra questions.",
      "practice": "Find the opening hours and phone number of three businesses in your town. Put them in a small table with a link to where you found each one.",
      "diagram": {
        "type": "flow",
        "title": "How to research well",
        "steps": [
          {
            "label": "Understand the question",
            "note": "What exactly is needed, and by when?"
          },
          {
            "label": "Search with specific words",
            "note": "Narrow searches give better results."
          },
          {
            "label": "Check at least two sources",
            "note": "Prefer official and well-known ones."
          },
          {
            "label": "Summarize with links",
            "note": "Short summary first, details after."
          }
        ]
      },
      "quiz": [
        {
          "q": "Two sources give different prices. What should you do?",
          "options": [
            "Pick the cheaper one without saying",
            "Report both and say where each came from",
            "Average them",
            "Leave it out"
          ],
          "answer": 1,
          "why": "Honest reporting lets the client decide. Never hide a disagreement."
        },
        {
          "q": "What is the best way to present research?",
          "options": [
            "A short summary on top, then a table or list with links",
            "One long paragraph with no sources",
            "A pile of screenshots",
            "Only a list of links"
          ],
          "answer": 0,
          "why": "Make it usable in a minute."
        },
        {
          "q": "What is the first step before you start searching?",
          "options": [
            "Open ten tabs",
            "Write down exactly what the client wants to know and by when",
            "Start copying anything you find",
            "Ask the client to search"
          ],
          "answer": 1,
          "why": "A clear question saves hours of wandering."
        }
      ]
    },
    {
      "title": "Communicating with clients",
      "videoId": "",
      "text": "A remote client can't see you working, so communication is how you build trust. Reply promptly during the hours you agreed, and if you will miss a deadline, say so before it passes.\n\nKeep messages short and clear: what you did, what you need, and by when. Confirm instructions in writing, for example \"Just to confirm, you'd like the report by Friday.\" Ask questions early rather than after finishing the work.\n\nStay polite and professional, check your spelling, and keep personal chat out of work messages.",
      "practice": "Write a three-line update to a client saying you finished sorting their inbox, two emails need their decision, and you will continue tomorrow.",
      "diagram": {
        "type": "flow",
        "title": "A client update that builds trust",
        "steps": [
          {
            "label": "What I did",
            "note": "\"Inbox sorted and three invoices filed.\""
          },
          {
            "label": "What I need from you",
            "note": "\"Two emails need your decision.\""
          },
          {
            "label": "What happens next, and when",
            "note": "\"I'll continue tomorrow morning.\""
          }
        ]
      },
      "quiz": [
        {
          "q": "You will miss a Friday deadline. What is the best move?",
          "options": [
            "Say nothing and hope they don't notice",
            "Tell the client before the deadline and give a new date",
            "Send it late without comment",
            "Blame the software"
          ],
          "answer": 1,
          "why": "Warning early lets the client plan. Silence is what damages trust."
        },
        {
          "q": "Which update is the clearest?",
          "options": [
            "Done.",
            "Inbox sorted. Two emails need your decision. I'll continue tomorrow.",
            "I have been working on a lot of things today.",
            "Busy day!"
          ],
          "answer": 1,
          "why": "It says what was done, what is needed and what comes next."
        },
        {
          "q": "Why confirm instructions in writing?",
          "options": [
            "It creates a record and prevents misunderstandings",
            "It looks formal",
            "Clients are legally required to receive it",
            "It saves data"
          ],
          "answer": 0,
          "why": "A written confirmation settles \"I thought you said...\" before it becomes a problem."
        }
      ]
    },
    {
      "title": "Handling mistakes and difficult clients",
      "videoId": "",
      "text": "Everyone makes mistakes. What matters is how you handle them. If you notice one, tell the client quickly, explain what happened in one or two sentences, and say how you will fix it. Do not hide it and do not make long excuses.\n\nSome clients are hard to work with: they change instructions, reply late or ask for extra work. Stay calm and polite. Write down what was agreed, and when something new is requested, say clearly that it is extra and agree on time and price before you start.\n\nKnow when to step away. If a client is rude, always pays late, or asks for something unsafe or dishonest, you can end the work politely. Finish what you were paid for, and move on.",
      "practice": "Write a short message to a client admitting you sent a report with a wrong figure. Explain the fix and say when the correct version will arrive.",
      "diagram": {
        "type": "flow",
        "title": "When you make a mistake",
        "steps": [
          {
            "label": "Notice it",
            "note": "Check your work before and after sending."
          },
          {
            "label": "Tell the client quickly",
            "note": "Do not wait for them to find it."
          },
          {
            "label": "Explain in one or two sentences",
            "note": "Short and honest, no long excuses."
          },
          {
            "label": "Fix it and give a time",
            "note": "\"The corrected report will reach you by 3pm.\""
          },
          {
            "label": "Change how you check",
            "note": "So it does not happen again."
          }
        ]
      },
      "quiz": [
        {
          "q": "You sent a report with a wrong number. What is the best response?",
          "options": [
            "Hope the client does not notice",
            "Tell them quickly, explain briefly and send a corrected version",
            "Blame the source of the data",
            "Wait until they ask"
          ],
          "answer": 1,
          "why": "Speed and honesty protect trust."
        },
        {
          "q": "A client keeps adding extra tasks beyond what you agreed. What do you do?",
          "options": [
            "Do them for free without saying anything",
            "Say it is extra work and agree on time and price first",
            "Stop answering messages",
            "Do half of them"
          ],
          "answer": 1,
          "why": "Clear boundaries, said politely, protect your time."
        },
        {
          "q": "A client is rude and pays late every time. What is a reasonable step?",
          "options": [
            "Politely end the work after finishing what you were paid for",
            "Insult them online",
            "Keep working for free",
            "Delete their files"
          ],
          "answer": 0,
          "why": "You can leave professionally. Never retaliate."
        }
      ]
    },
    {
      "title": "Keeping client data safe",
      "videoId": "",
      "text": "Clients trust you with private things: emails, passwords, customer lists, sometimes money details. Protecting them is part of your job. Use a strong, different password for every account, and a password manager if you can.\n\nTurn on two-step verification wherever it is offered. Be careful with messages that rush you to click a link or share a code. This is called phishing. If something feels strange, stop and check with the client through another channel before you act.\n\nShare only what is needed, with only the people who need it. Never post client information online, and delete files you no longer need when the work ends, if the client agrees.",
      "practice": "Turn on two-step verification for your email account. Then list which of your accounts still share a password, without writing the passwords themselves.",
      "diagram": {
        "type": "columns",
        "title": "Staying safe",
        "columns": [
          {
            "head": "Do",
            "tone": "good",
            "items": [
              "Use a strong, different password for each account",
              "Turn on two-step verification",
              "Check strange messages through another channel",
              "Share only what is needed"
            ]
          },
          {
            "head": "Don't",
            "tone": "bad",
            "items": [
              "Reuse one password everywhere",
              "Click rushed links or share codes",
              "Post client details online",
              "Keep files after the job without permission"
            ]
          }
        ]
      },
      "quiz": [
        {
          "q": "A message says: \"The client's account is locked. Click here and enter the code now!\" What do you do?",
          "options": [
            "Click quickly",
            "Stop and confirm with the client through another channel",
            "Forward it to friends",
            "Reply with the code"
          ],
          "answer": 1,
          "why": "Urgency is a classic phishing trick. Always verify first."
        },
        {
          "q": "Which password habit is best?",
          "options": [
            "One strong password for everything",
            "A different strong password for each account",
            "Your birthday",
            "Posting it so you don't forget"
          ],
          "answer": 1,
          "why": "If one account is hacked, the others stay safe."
        },
        {
          "q": "A project ends. What should you do with the client's files?",
          "options": [
            "Keep them and share with friends",
            "Delete or return them if the client agrees",
            "Upload them to a public site",
            "Sell them"
          ],
          "answer": 1,
          "why": "Do not keep private data you no longer need."
        }
      ]
    },
    {
      "title": "Using AI tools wisely",
      "videoId": "",
      "text": "AI assistants can help you draft emails, summarize long text and suggest ideas. Used well, they save time. Used badly, they can embarrass you, because they sometimes sound sure while being wrong.\n\nTreat AI output as a first draft. Read it, check facts such as names, dates and numbers, and change it so it sounds like you and fits the client. Never send AI text you have not read.\n\nDo not paste private client information into an AI tool unless the client has agreed. Names, contacts, money details and passwords stay out. Also be honest: if a client asks how you work, tell them you use AI tools to help.",
      "practice": "Ask an AI tool to draft a short thank-you email to a client. Then edit it: fix anything wrong and make it sound like you.",
      "diagram": {
        "type": "flow",
        "title": "Using AI as a helper, not a boss",
        "steps": [
          {
            "label": "Ask for a draft",
            "note": "Give clear instructions, with no private details."
          },
          {
            "label": "Read it carefully",
            "note": "Does it make sense for this client?"
          },
          {
            "label": "Check names, dates and numbers",
            "note": "AI can be confidently wrong."
          },
          {
            "label": "Edit it into your own voice",
            "note": "Make it sound like you."
          },
          {
            "label": "Send it",
            "note": "Only now."
          }
        ]
      },
      "quiz": [
        {
          "q": "An AI draft contains a date you are unsure about. What do you do?",
          "options": [
            "Send it, AI is always right",
            "Check the date against the client's records before sending",
            "Delete the date and say nothing",
            "Ask the AI again and trust the new answer"
          ],
          "answer": 1,
          "why": "You are responsible for what you send, not the tool."
        },
        {
          "q": "What should you avoid pasting into an AI tool without permission?",
          "options": [
            "Private client details such as contacts and money information",
            "A generic greeting",
            "A public quote",
            "A recipe"
          ],
          "answer": 0,
          "why": "Private information stays private, unless the client agrees."
        },
        {
          "q": "What is the best way to think about AI output?",
          "options": [
            "A first draft you must read and improve",
            "A finished answer",
            "Always wrong",
            "A replacement for talking to clients"
          ],
          "answer": 0,
          "why": "It speeds you up, but your judgement finishes the job."
        }
      ]
    },
    {
      "title": "Pricing and getting paid",
      "videoId": "",
      "text": "Decide your price before you talk to clients. Many VAs charge per hour. A simple way to start is to look at what other beginners ask on the platforms you use, then choose a fair price you can say without hesitation. You can raise it as you gain reviews.\n\nAgree on the work, the price and how you will be paid in writing before you start. Track your time honestly, even if it is only a note in a spreadsheet. Send a clear invoice with your name, the client's name, the dates, the hours or tasks, the total, and how to pay.\n\nKeep payments on the platform where you found the client when you can, because that protects both sides. Be careful with anyone who wants to pay outside the platform, or who pays more than agreed and asks for money back. Put a due date on every invoice, and follow up politely if it passes.",
      "practice": "Make a simple invoice in Google Docs or Sheets for 5 hours of imaginary work, with a clear total and a due date.",
      "diagram": {
        "type": "table",
        "title": "A simple invoice",
        "headers": [
          "Task",
          "Hours",
          "Rate per hour",
          "Total"
        ],
        "rows": [
          [
            "Inbox sorting",
            "3",
            "5",
            "15"
          ],
          [
            "Calendar setup",
            "1",
            "5",
            "5"
          ],
          [
            "Research",
            "2",
            "5",
            "10"
          ],
          [
            "All work",
            "6",
            "",
            "30"
          ]
        ],
        "caption": "Every invoice also shows your name, the client's name, the dates, how to pay and a due date."
      },
      "quiz": [
        {
          "q": "Why agree the work and price in writing before you start?",
          "options": [
            "It prevents disagreements later",
            "It is only for show",
            "It makes clients pay faster automatically",
            "Nobody needs it"
          ],
          "answer": 0,
          "why": "Written agreements settle \"I thought you meant...\" before it becomes a problem."
        },
        {
          "q": "A client asks to pay outside the platform to avoid fees. What is the best response?",
          "options": [
            "Agree straight away",
            "Be careful, and keep payment on the platform when you can",
            "Ask for double",
            "Accept only cash"
          ],
          "answer": 1,
          "why": "The platform protects both of you if something goes wrong."
        },
        {
          "q": "Which details belong on an invoice?",
          "options": [
            "Your name, the client's name, dates, work done, total, how to pay and a due date",
            "Only the total",
            "Your bank PIN",
            "The client's password"
          ],
          "answer": 0,
          "why": "A clear invoice gets paid faster. Never include PINs or passwords."
        }
      ]
    },
    {
      "title": "Landing your first client",
      "videoId": "",
      "text": "Start by listing the services you will offer, such as inbox management, scheduling and data entry, and decide a simple price. Set up a clean profile on one or two of the platforms from the job list at the end of this course, with a clear photo, a short bio and examples of your work.\n\nApply every day with a short personal message that mentions what the client needs. Don't copy and paste the same message. Expect many applications before the first reply, and be willing to take small tasks first to earn early reviews.\n\nProtect yourself. Never pay to get a job. Be careful of anyone who sends you a cheque and asks you to send part of it back. Keep payments on the platform, and don't share bank details until there is a real agreement. If an offer sounds too good, it probably is.",
      "practice": "Write a three-sentence profile bio saying who you are, what you can do for a client, and why they can rely on you.",
      "diagram": {
        "type": "flow",
        "title": "From zero to your first client",
        "steps": [
          {
            "label": "Choose your services",
            "note": "Inbox management, scheduling, data entry."
          },
          {
            "label": "Set up a clean profile",
            "note": "Clear photo, short bio, examples of your work."
          },
          {
            "label": "Apply every day",
            "note": "A short personal message each time."
          },
          {
            "label": "Take small first tasks",
            "note": "They earn the reviews that unlock bigger work."
          },
          {
            "label": "Collect reviews and raise your price",
            "note": "Repeat clients are the goal."
          }
        ]
      },
      "quiz": [
        {
          "q": "A \"client\" sends you a cheque larger than the job pays and asks you to send back the difference. What do you do?",
          "options": [
            "Send the difference quickly",
            "Refuse. This is a well-known scam",
            "Deposit it and send the money",
            "Ask for even more work"
          ],
          "answer": 1,
          "why": "The cheque eventually bounces, but the money you sent is real and gone."
        },
        {
          "q": "Which is the best way to apply for jobs?",
          "options": [
            "Send the same message to 100 jobs",
            "Send a short personal message that mentions what the client needs",
            "Send no message",
            "Write a long life story"
          ],
          "answer": 1,
          "why": "A personal message shows you read the job and care about it."
        },
        {
          "q": "After a week of applications you have no replies. What is realistic?",
          "options": [
            "You are not suited to this work",
            "This is normal. Keep applying and take small tasks to earn reviews",
            "Pay a service to find you jobs",
            "Stop for a year"
          ],
          "answer": 1,
          "why": "Many applications are needed before the first reply. Never pay to get a job."
        }
      ]
    }
  ],
  "jobs": [
    {
      "name": "We Work Remotely",
      "url": "https://weworkremotely.com/remote-jobs/search?term=virtual+assistant",
      "note": "Remote job board. Roles are posted by real companies.",
      "tip": "Open the page, read the top listing, and apply to one that fits.",
      "cta": "See VA jobs"
    },
    {
      "name": "Remote.co",
      "url": "https://remote.co/remote-jobs/virtual-assistant/",
      "note": "Curated remote roles, including virtual assistant work.",
      "tip": "Check the job post date and apply to the newest ones first.",
      "cta": "See VA jobs"
    },
    {
      "name": "Contra",
      "url": "https://contra.com/opportunities",
      "note": "Freelance platform with no commission and less crowding.",
      "tip": "Create a free profile and add your practice samples first.",
      "cta": "Browse opportunities"
    },
    {
      "name": "PeoplePerHour",
      "url": "https://www.peopleperhour.com/freelance-jobs",
      "note": "Freelance marketplace. Search for virtual assistant projects.",
      "tip": "Make a free profile, then search \"virtual assistant\".",
      "cta": "Browse projects"
    },
    {
      "name": "Guru",
      "url": "https://www.guru.com/m/find/freelance-jobs/virtual-assistant/",
      "note": "Freelance marketplace with flexible payment options.",
      "tip": "Sign up free, then send short, personal proposals.",
      "cta": "See VA jobs"
    },
    {
      "name": "FlexJobs",
      "url": "https://www.flexjobs.com/search?search=virtual+assistant",
      "note": "Hand-screened listings. Charges job seekers a subscription fee.",
      "tip": "You can view the search for free. Paying is your choice, never a requirement.",
      "cta": "See VA jobs"
    }
  ]
};
