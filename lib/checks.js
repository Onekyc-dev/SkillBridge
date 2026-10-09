// Five-question skill checks for the "I already have this skill" feature.
// answer = number of the correct option, counting from 0.
export const checks = {
  "virtual-assistant-basics": [
    {
      "q": "A client in another country asks you to send a meeting invite for 4pm. What should the invite include?",
      "options": [
        "Only \"4pm\"",
        "The time with its time zone, plus a meeting link",
        "Only the meeting link",
        "The date only"
      ],
      "answer": 1,
      "why": "A time without a time zone can mean different moments for different people."
    },
    {
      "q": "You will miss a deadline tomorrow. What do you do?",
      "options": [
        "Say nothing and hope",
        "Tell the client today and give a new date",
        "Send it late without comment",
        "Blame your internet"
      ],
      "answer": 1,
      "why": "Warning early lets the client plan."
    },
    {
      "q": "A new \"client\" sends a cheque larger than agreed and asks you to send back the difference. What do you do?",
      "options": [
        "Send the difference quickly",
        "Refuse. This is a well-known scam",
        "Deposit it and send the money",
        "Ask for more work"
      ],
      "answer": 1,
      "why": "The cheque later bounces, but the money you sent is gone."
    },
    {
      "q": "You get an urgent message: \"A client's account is locked. Click here and enter the code!\" What do you do?",
      "options": [
        "Click and enter the code",
        "Confirm with the client through another channel first",
        "Forward it to a friend",
        "Reply with the code"
      ],
      "answer": 1,
      "why": "Urgency is a classic phishing trick."
    },
    {
      "q": "Two sources give different phone numbers for a supplier. What do you tell the client?",
      "options": [
        "Pick one quietly",
        "Report both and say where each came from",
        "Leave the number out",
        "Make up a middle number"
      ],
      "answer": 1,
      "why": "Honest reporting lets the client decide."
    }
  ],
  "data-entry-basics": [
    {
      "q": "Which formula adds the numbers in cells B2 to B11?",
      "options": [
        "=SUM(B2:B11)",
        "=ADD(B2,B11)",
        "=PLUS(B2:B11)",
        "=TOTAL"
      ],
      "answer": 0,
      "why": "SUM with a range is the standard way to add a column."
    },
    {
      "q": "You find two identical rows in a client's file. What do you do?",
      "options": [
        "Delete one right away",
        "Check with the client before deleting",
        "Delete both",
        "Ignore them forever"
      ],
      "answer": 1,
      "why": "Duplicates can be on purpose. Confirm before removing data."
    },
    {
      "q": "A job asks you to pay for training before you can start. What do you do?",
      "options": [
        "Pay it, it is small",
        "Treat it as a warning sign and do not pay",
        "Pay half now",
        "Ask a friend to pay"
      ],
      "answer": 1,
      "why": "Real employers do not charge you to get a job."
    },
    {
      "q": "A required field is missing in the source document. What do you do?",
      "options": [
        "Guess a value",
        "Flag it to the client",
        "Enter random data",
        "Delete the record"
      ],
      "answer": 1,
      "why": "Never invent data."
    },
    {
      "q": "You type fast but make many mistakes. What is the best fix?",
      "options": [
        "Keep going, speed is what counts",
        "Slow down until errors drop, then build speed",
        "Skip checking",
        "Turn off the spell checker"
      ],
      "answer": 0,
      "why": "Accuracy first, speed second."
    }
  ],
  "content-writing-basics": [
    {
      "q": "A client wants a product description for a phone. What should you do first?",
      "options": [
        "Start writing immediately",
        "Learn who the reader is and what they need",
        "Copy another shop's text",
        "Add as many words as possible"
      ],
      "answer": 1,
      "why": "Know the reader before you write."
    },
    {
      "q": "Which headline is strongest?",
      "options": [
        "Stuff to Know",
        "Our Thoughts",
        "5 Ways to Make Your Phone Battery Last Longer",
        "Things"
      ],
      "answer": 2,
      "why": "It tells the reader exactly what they get."
    },
    {
      "q": "You find a statistic online with no source. What do you do?",
      "options": [
        "Use it anyway",
        "Check it with a trusted source or leave it out",
        "Make the number bigger",
        "Quote an anonymous post"
      ],
      "answer": 1,
      "why": "Only publish facts you can trust."
    },
    {
      "q": "After finishing a draft, the best next step is to:",
      "options": [
        "Send it to the client at once",
        "Edit it in rounds and read it aloud",
        "Add more adjectives",
        "Delete the headline"
      ],
      "answer": 1,
      "why": "Editing turns a draft into good work."
    },
    {
      "q": "A new client asks you to pay a fee to start working. You should:",
      "options": [
        "Pay it",
        "Refuse. Real clients do not charge you to work",
        "Pay half",
        "Pay with a gift card"
      ],
      "answer": 1,
      "why": "Never pay to get a job."
    }
  ],
  "customer-service-basics": [
    {
      "q": "A customer writes that they were charged twice. What do you do first?",
      "options": [
        "Tell them it is not possible",
        "Read carefully and confirm the facts",
        "Close the chat",
        "Offer a free gift"
      ],
      "answer": 1,
      "why": "Understand the facts before you answer."
    },
    {
      "q": "Which reply is best for an angry customer?",
      "options": [
        "Calm down.",
        "That is not our fault.",
        "I understand how frustrating this is. Here is what I will do.",
        "Read the policy."
      ],
      "answer": 2,
      "why": "Acknowledge, then solve."
    },
    {
      "q": "You cannot give a refund. What is the best way to say it?",
      "options": [
        "No refunds.",
        "Explain kindly and offer an alternative such as a replacement",
        "Ignore them",
        "Blame the customer"
      ],
      "answer": 1,
      "why": "An alternative keeps the customer feeling helped."
    },
    {
      "q": "What is a help desk ticket?",
      "options": [
        "A single customer request tracked in a system",
        "A paid fine",
        "A travel pass",
        "A type of template"
      ],
      "answer": 0,
      "why": "Tickets keep each request from getting lost."
    },
    {
      "q": "A company wants you to pay for training before hiring you. You should:",
      "options": [
        "Pay quickly",
        "Refuse. Real employers do not charge you to work",
        "Ask for a discount",
        "Pay half now"
      ],
      "answer": 1,
      "why": "Never pay to get a job."
    }
  ]
};
