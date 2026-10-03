import type { Lesson } from "./types";

export const mvpLessons: Lesson[] = [
  {
    slug: "mvp-what",
    stage: "mvp",
    title: "What is an MVP?",
    minutes: 3,
    appliesTo: "all",
    summary:
      "The smallest version that lets you test your riskiest assumption.",
    reading: `**MVP** stands for **Minimum Viable Product.** It is the smallest, simplest version of your idea that lets you test your riskiest assumption with real customers.

Both words matter:

- **Minimum:** cut everything you do not need in order to learn.
- **Viable:** it must really deliver the core benefit, even if roughly.

An MVP is *not* a finished product, and it is not a fancy demo. Its job is to **teach you something.**

## Examples

- Dropbox first made a short video showing how the product would work. People signed up before the software was finished.
- A tutoring business does not need a custom website. A simple booking form plus a few real sessions will teach you almost everything.

## How to build one

- Pick your **riskiest assumption.**
- Decide what you need to learn.
- Build the **smallest thing** that can answer that question, in days or a couple of weeks, not months.
- Put it in front of real people.

## Watch out

If you are spending more than a few weeks, it is probably too big. Adding features and polishing feels productive, but it delays the learning that actually matters.`,
    apply:
      "What is the riskiest assumption behind {name}, and what is the smallest thing you could make to test it this week?",
    quiz: [
      {
        prompt: "What is the main purpose of an MVP?",
        options: [
          "To learn whether your riskiest assumption holds",
          "To impress customers with polish",
          "To launch the full product",
        ],
        correct: 0,
        explanation:
          "An MVP is a learning tool. It exists to test your biggest guess as cheaply as possible.",
      },
      {
        prompt: "Which is closest to an MVP for a tutoring business?",
        options: [
          "A full website with payments, an app, and a logo",
          "A simple booking form and a few real sessions",
          "A thirty-page business plan",
        ],
        correct: 1,
        explanation:
          "It is quick to make and puts the real service in front of real customers.",
      },
      {
        prompt: 'What does "viable" mean in MVP?',
        options: [
          "It has every feature",
          "It looks professional",
          "It really delivers the core benefit, even if roughly",
        ],
        correct: 2,
        explanation:
          "A viable MVP has to actually work for the customer, even if it is simple.",
      },
    ],
  },
  {
    slug: "mvp-fake-it",
    stage: "mvp",
    title: "Test before you build: landing pages, pre-orders, and manual tests",
    minutes: 4,
    appliesTo: "all",
    summary: "Measure real demand without building the whole thing.",
    reading: `You can test whether people want something *before* you build it. Here are some honest ways to do it.

## Landing page

Make a simple one-page site explaining the benefit with a sign-up or "join the waitlist" button. Count how many visitors actually sign up. Always be honest that the product is coming soon.

## "Coming soon" button

Show a button for a feature and measure how many people click it, then tell them it is not ready yet.

## Pre-orders or deposits

This is the **strongest** signal because it involves real money. Handle payments with an adult's help, be fully transparent, and refund people if you cannot deliver.

## Concierge test

Do by hand what your product would do automatically. For example, match study partners yourself using a spreadsheet, before building any software.

## Mockup or demo video

Show how it would work and see who gets excited enough to sign up.

## Set your success rule first

Before you start, decide: "If 20 out of 100 visitors sign up, I will continue." That way the numbers decide, not your hopes.

**Be honest.** Never mislead people or take money for something you cannot deliver.`,
    apply:
      "Which of these tests could you run for {name} this week? Write the success rule you would use.",
    quiz: [
      {
        prompt: "What is a concierge test?",
        options: [
          "Doing the work by hand before you automate it",
          "Hiring a hotel concierge",
          "Building the full product in secret",
        ],
        correct: 0,
        explanation:
          "It lets you learn what people want without building anything complicated.",
      },
      {
        prompt: "Which is the strongest evidence of demand?",
        options: ["Page views", "Likes on a post", "Pre-orders or deposits"],
        correct: 2,
        explanation:
          "Money is the strongest signal because the person gave up something real.",
      },
      {
        prompt: "What should you do before running a landing page test?",
        options: [
          "Wait and see the numbers, then decide what they mean",
          "Decide what result will count as success",
          "Buy lots of ads",
        ],
        correct: 1,
        explanation:
          "A rule set in advance keeps you honest about the results.",
      },
    ],
  },
  {
    slug: "mvp-service-pilot",
    stage: "mvp",
    title: "Service MVP: run a pilot",
    minutes: 4,
    appliesTo: ["service"],
    summary:
      "Deliver your service to a few real customers in the simplest way.",
    reading: `For a service, your MVP is a **pilot:** you deliver the service to a few real customers in the simplest possible way.

## Keep it small

Aim for three to five customers over one to two weeks, or just a few sessions. Offer it free or at a discount in exchange for honest feedback, and be clear about that.

## Use simple tools

Text messages, a shared calendar, a Google Form, and a notes app are plenty. Do not build a website yet.

## Write everything down

For each customer, record:

- What you delivered
- How long it really took
- What went wrong
- How they reacted
- What they said they would pay

**Time per customer is gold.** It tells you later whether your prices can cover your time.

## Questions to ask at the end

- "What was the most valuable part?"
- "What was confusing or missing?"
- "Would you pay for this? How much?"

## Learn about yourself too

Did you enjoy delivering it? Could you do this every week?

**Stay safe:** get guardian permission when you serve other minors, and meet in public places or online with a trusted adult aware.`,
    apply:
      "Plan a pilot for {name}: who are your first 3 to 5 customers, and what exactly will you deliver?",
    quiz: [
      {
        prompt: "How big should a pilot be?",
        options: [
          "A few customers over a short time",
          "Fifty customers for a whole year",
          "Just you",
        ],
        correct: 0,
        explanation:
          "A small, short pilot is fast to run and still teaches you a lot.",
      },
      {
        prompt: "Why track how much time each customer takes?",
        options: [
          "To show customers how busy you are",
          "To see whether future prices can cover your time",
          "Because pilots must be timed by law",
        ],
        correct: 1,
        explanation:
          "Knowing your real time per customer shows whether the business can be profitable.",
      },
      {
        prompt: "What is a strong question to ask at the end of a pilot?",
        options: [
          "Can you promise to tell all your friends?",
          "Did you like me as a person?",
          "What was most valuable, and what would you pay for it?",
        ],
        correct: 2,
        explanation:
          "It tells you what to keep and what price people might accept.",
      },
    ],
  },
  {
    slug: "mvp-prototype",
    stage: "mvp",
    title: "Physical product MVP: prototypes and samples",
    minutes: 4,
    appliesTo: ["physical_product"],
    summary: "Build cheap early versions, each answering one question.",
    reading: `A **prototype** is an early version you build to learn from. Physical products usually go through three stages.

## 1. Rough prototype

Cardboard, paper, clay, or a 3D print. It tests size and shape and costs almost nothing.

## 2. Functional prototype

It works but is not pretty. Let people actually use it.

## 3. Sample

Close to the real thing. Good for photos and for your first buyers.

## Make each version answer a question

"Is it comfortable?" "Does the clasp hold?" "Can people figure it out without instructions?" If a prototype is not answering a question, you do not need to build it yet.

## Start small

Make a **small batch** of five to ten, not five hundred. You will learn about problems before you have spent a lot.

## Pre-sell

**Pre-selling** means taking orders before you make a big batch, so you know people really want it.

## Keep good notes

Record each version, what changed, and what you learned. Track the cost of every item, even tiny ones.

Watch real customers use your prototype and notice where they struggle.

Always ask a trusted adult before buying equipment or placing large orders.`,
    apply:
      "What is the first question you want a prototype of {name} to answer? What is the cheapest version that could answer it?",
    quiz: [
      {
        prompt: "Each prototype version should...",
        options: [
          "answer a specific question you have",
          "be as polished as possible",
          "use the most expensive materials",
        ],
        correct: 0,
        explanation:
          "Prototypes are for learning, so each one should answer something you do not know yet.",
      },
      {
        prompt: "Why make a small batch first?",
        options: [
          "Small batches are always cheaper per item",
          "You can learn and fix problems before spending a lot",
          "Customers never want more than ten",
        ],
        correct: 1,
        explanation:
          "Problems are much cheaper to fix when you have only made a few.",
      },
      {
        prompt: "What does pre-selling mean?",
        options: [
          "Selling old stock cheaply",
          "Giving products away for free",
          "Taking orders before you make a big batch, to confirm demand",
        ],
        correct: 2,
        explanation:
          "Orders before production are proof that people actually want it.",
      },
    ],
  },
  {
    slug: "mvp-no-code",
    stage: "mvp",
    title: "Software MVP: build without code (at first)",
    minutes: 4,
    appliesTo: ["software"],
    summary: "Test your app idea with mockups, forms, and manual work first.",
    reading: `You do not need to write code to test a software idea. Try these ways to get a first version in front of people quickly.

## Clickable prototype

Use a free design tool to make screens people can tap through. It looks real but takes hours, not months.

## Forms and spreadsheets

A Google Form plus a spreadsheet can act like a simple database and booking system.

## No-code builders

Tools such as Glide, Softr, Carrd, and Bubble let you make simple apps and sites without programming.

## Do it by hand

Behind the scenes, you can do the "smart" part yourself, such as matching users manually.

## Match the test to your question

- "Will people want this?" Use a landing page or mockup.
- "Can people use it?" Use a clickable prototype.
- "Does the core thing work?" Build only that one thing, possibly with code.

## Keep it small

Build only the **main user flow**, on one platform, and give yourself about two weeks.

## When to start coding

When people clearly want it and doing things by hand becomes too slow.

**Privacy:** avoid collecting sensitive information, and follow each platform's age rules.`,
    apply:
      "Which no-code or manual method could you use to test the main idea behind {name} within two weeks?",
    quiz: [
      {
        prompt:
          "To find out if people want your app, what is the cheapest test?",
        options: [
          "A landing page or clickable mockup",
          "A fully coded app",
          "Hiring developers",
        ],
        correct: 0,
        explanation:
          "A mockup or landing page costs almost nothing and shows whether people are interested.",
      },
      {
        prompt: "When does it make sense to start coding?",
        options: [
          "Immediately, before talking to anyone",
          "Once people clearly want it and doing it by hand is too slow",
          "Only after you have 10,000 users",
        ],
        correct: 1,
        explanation:
          "Coding is expensive, so wait until demand is proven and manual work stops being practical.",
      },
      {
        prompt: "What should your first version include?",
        options: [
          "Every feature on your list",
          "Just a logo and a name",
          "Only the one main thing users come to do",
        ],
        correct: 2,
        explanation: "Focus on the main flow. Everything else can wait.",
      },
    ],
  },
  {
    slug: "mvp-nonprofit-pilot",
    stage: "mvp",
    title: "Nonprofit MVP: a small pilot project",
    minutes: 4,
    appliesTo: ["nonprofit"],
    summary: "Run a small, measurable version of your program first.",
    reading: `Do not launch a huge program right away. Run a **pilot:** a small test of your project, such as one event, one school, ten families, or four weeks.

## Define your pilot

- Who will you serve?
- What exactly will you do?
- How will you know it worked? (This is your **outcome measure.**)
- What do you need: people, supplies, permission, adult supervision?

## Partner with an existing organization

Schools, libraries, community centers, and clubs already have trust, space, and people. Ask permission and follow their rules, especially when children are involved.

## Keep simple records

Track attendance, quick feedback, stories, and photos (only with permission). Collect only what you actually need.

## Debrief afterward

What worked? What did not? What would you change next time?

## Be careful with money

If you collect donations, involve an adult or an established organization. There are rules about fundraising and charity registration, so do not collect money casually.

A well-run pilot gives you real evidence to recruit volunteers, supporters, and partners.`,
    apply:
      "Describe a one-month pilot of {name}: who you would serve, what you would do, and how you would measure whether it helped.",
    quiz: [
      {
        prompt: "What is a pilot?",
        options: [
          "A small test of your program before scaling it",
          "A big launch event",
          "A fundraising campaign",
        ],
        correct: 0,
        explanation:
          "A pilot lets you learn on a small scale before you commit a lot of time and money.",
      },
      {
        prompt: "Why partner with an existing organization?",
        options: [
          "So you can avoid asking permission",
          "They can offer trust, people, and places, along with rules to follow",
          "So they can run everything instead of you",
        ],
        correct: 1,
        explanation:
          "Partners give you credibility and resources, and they help you do things safely.",
      },
      {
        prompt: "Before you collect donations, what should you do?",
        options: [
          "Start asking strangers on social media",
          "Wait until you are famous",
          "Involve an adult and check the rules for fundraising",
        ],
        correct: 2,
        explanation:
          "Fundraising has legal rules, and an adult can help you follow them.",
      },
    ],
  },
];
