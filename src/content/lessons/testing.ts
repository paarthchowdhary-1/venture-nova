import type { Lesson } from "./types";

export const testingLessons: Lesson[] = [
  {
    slug: "test-hypothesis",
    stage: "testing",
    title: "Run a real test: hypothesis and success rule",
    minutes: 4,
    appliesTo: "all",
    summary: "A test is a question with a scoreboard you set in advance.",
    reading: `A good test is a **question with a scoreboard.** Without a scoreboard, you will bend the results to match your hopes.

## The ingredients

- **Hypothesis:** what you believe will happen. "I believe **[customer]** will **[do something]** because **[reason]**."
- **Metric:** the number that counts.
- **Threshold:** the result that means yes, no, or maybe.
- **Time and size:** how long the test runs and how many people take part.

## Example

"I believe at least 10 of the 30 classmates I show the study-group sign-up to will join the first session. I will check after one week."

That is clear. You will know whether it worked, and you cannot argue with yourself afterward.

## Rules for a good test

- Test **one main question** at a time.
- Decide the success rule **before** you start.
- Measure **behavior** (what people do), not just words.
- Keep it short.
- Write down the result, even if it is disappointing.

## After the test

Ask three things: Did we beat the threshold? Why or why not? What should we do next?

Keep a simple **test log** so you can look back at what you have learned.`,
    apply:
      "Write a test for {name}: I believe ___ will ___ because ___. Success means ___ out of ___ within ___.",
    quiz: [
      {
        prompt: "Why set a success threshold before you test?",
        options: [
          "So you cannot change the goalposts after seeing the results",
          "To make the test harder",
          "Because tests need numbers to be legal",
        ],
        correct: 0,
        explanation:
          "A threshold set in advance keeps you honest about what the results mean.",
      },
      {
        prompt: "What does a good hypothesis include?",
        options: [
          "Only what you hope will happen",
          "Who will do what, and why you think so",
          "A detailed marketing plan",
        ],
        correct: 1,
        explanation:
          "It names the customer, the action, and the reason, so it can be checked.",
      },
      {
        prompt: "Which is the better success metric?",
        options: [
          "People say they would definitely join",
          "Everyone I know likes the idea",
          "Ten out of thirty people actually sign up",
        ],
        correct: 2,
        explanation:
          "It counts real actions and gives a clear number to compare against.",
      },
    ],
  },
  {
    slug: "test-watch-users",
    stage: "testing",
    title: "Watch people actually use it",
    minutes: 4,
    appliesTo: "all",
    summary: "What people say and what they do are often very different.",
    reading: `What people **say** and what they **do** are often different. The best way to learn how your product really works is to **watch someone use it.** This is called **usability testing.**

## How to run one

- Find about **five people** from your target customer group.
- Give them a **task**, not instructions: "Find a study partner for chemistry."
- **Stay quiet** and watch. Notice where they hesitate, click the wrong thing, or look confused.
- Do not help or defend your design. If you jump in, you will miss the problem.
- Ask them to think out loud: "What are you thinking right now?"

## Take notes

Write down where each person struggled. Then count how many people hit the same problem. Five testers usually uncover most of the big issues.

## What to do with it

List the problems and rank them by how many people hit them and how serious they are. If someone is confused, that is a design problem, not a user problem.

## Works for anything

For a physical product, watch someone unbox and use it. For a service, watch how a customer experiences a session and where they seem unsure.

If your testers are under 18, get a guardian's permission first.`,
    apply:
      "Write one task you could give a tester to try with {name}, and what you would look for as they do it.",
    quiz: [
      {
        prompt: "During a usability test, what should you do?",
        options: [
          "Stay quiet and watch where they struggle",
          "Explain each step as they go",
          "Defend your design when they are confused",
        ],
        correct: 0,
        explanation:
          "If you help or explain, you hide the exact problems you need to find.",
      },
      {
        prompt:
          "Three out of five testers get stuck at the same step. That means...",
        options: [
          "those testers were not paying attention",
          "the design has a real problem worth fixing",
          "you should hide that step",
        ],
        correct: 1,
        explanation:
          "When several people hit the same wall, the design is the problem.",
      },
      {
        prompt: "Why watch people use it instead of just asking them?",
        options: [
          "People always lie",
          "Watching is cheaper",
          "What people say and what they do often differ",
        ],
        correct: 2,
        explanation:
          "People often do something different from what they say they would do.",
      },
    ],
  },
  {
    slug: "test-first-sale",
    stage: "testing",
    title: "Your first sale (or first real commitment)",
    minutes: 4,
    appliesTo: "all",
    summary:
      "The strongest proof someone values it is that they give something up.",
    reading: `A **first sale** proves that someone values what you made enough to give something up: money, time, or a promise. It is the strongest validation there is.

## Why it matters

A sale teaches you about **price**, about **how people actually buy**, and about **objections** you never imagined.

## How to get one

- Offer to your **best-fit** customers.
- Make a **clear offer with a price.**
- **Ask directly:** "Would you like to buy?" Many first-time founders never ask.
- Keep payment simple and safe. Use a method an adult approves, and never share personal bank details.

## If money is not part of it

For a free or nonprofit service, look for other real commitments: signing up, volunteering hours, showing up to an event, sharing contact details, or bringing a friend.

## If they say no

Ask why. Was it the price? The timing? Trust? Or do they simply not need it? Write it down.

Remember that a few sales early on is normal. Each "no" is data. Be honest, deliver what you promise, and say thank you.

**Keep it ethical:** use fair prices and never pressure anyone into buying.`,
    apply:
      "Who is the first person you would ask to buy (or commit to) {name}? Write exactly what you would say.",
    quiz: [
      {
        prompt: "Why is a first sale such strong evidence?",
        options: [
          "Someone valued it enough to give up money or a commitment",
          "It means you are rich",
          "It proves everyone wants it",
        ],
        correct: 0,
        explanation:
          "A real sale shows real value because the person gave something up for it.",
      },
      {
        prompt: "What should you do if someone says no?",
        options: [
          "Pressure them until they say yes",
          "Ask what held them back and record it",
          "Remove them from your list",
        ],
        correct: 1,
        explanation:
          "Their reason is useful data about price, timing, or trust.",
      },
      {
        prompt: "For a free service, what is a strong commitment?",
        options: [
          "A like on a post",
          "A friend saying it sounds nice",
          "Signing up and actually showing up",
        ],
        correct: 2,
        explanation:
          "Showing up costs time and effort, so it is real evidence of interest.",
      },
    ],
  },
  {
    slug: "test-fool-yourself",
    stage: "testing",
    title: "Don't fool yourself: bias and tiny samples",
    minutes: 4,
    appliesTo: "all",
    summary: "Common traps that make weak results look like proof.",
    reading: `It is surprisingly easy to fool yourself with a test. Watch out for these traps.

## Friends and family bias

They want to be nice. Test with **strangers who match your customer** whenever you can.

## Tiny samples

"Three out of four said yes" is not proof. Small numbers swing wildly. It is fine to learn from small tests, but be careful about betting everything on them.

## Leading questions

How you ask changes the answer. Keep your questions neutral.

## Cherry-picking

**Cherry-picking** means counting only the results that make you look good. Count everyone.

## Only hearing from survivors

If you only ask people who stuck around, you miss why others left. Ask the ones who left, too.

## Vanity metrics

Likes and views feel great, but they do not pay the bills. Track **real actions** like sign-ups, purchases, and repeat visits.

## How to defend yourself

- Write your plan and success rule in advance.
- Test with the right people.
- Count everyone, not just the happy ones.
- Track actions, not applause.
- Ask someone to play devil's advocate.

Your goal is the **truth**, not a win.`,
    apply:
      "Which of these traps are you most at risk of falling into with {name}? What will you do to avoid it?",
    quiz: [
      {
        prompt: "Why are friends and family weak testers?",
        options: [
          "They are often too polite to be fully honest",
          "They do not know anyone",
          "They always say no",
        ],
        correct: 0,
        explanation: "They care about you, so they tend to soften the truth.",
      },
      {
        prompt: "What is cherry-picking?",
        options: [
          "Choosing the cheapest materials",
          "Counting only the results that support what you hoped",
          "Testing only in the summer",
        ],
        correct: 1,
        explanation:
          "Picking only the good results hides what is really going on.",
      },
      {
        prompt: "Which of these is a vanity metric?",
        options: [
          "Number of people who paid",
          "Number of repeat customers",
          "Number of likes on a post",
        ],
        correct: 2,
        explanation:
          "Likes feel good but do not show that anyone will buy or come back.",
      },
    ],
  },
];
