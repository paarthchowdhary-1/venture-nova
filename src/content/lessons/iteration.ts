import type { Lesson } from "./types";

export const iterationLessons: Lesson[] = [
  {
    slug: "iter-pivot",
    stage: "iteration",
    title: "Pivot, persevere, or stop",
    minutes: 4,
    appliesTo: "all",
    summary: "Decide what to do next using evidence, not mood.",
    reading: `After you have tested your idea, you have three choices.

## Persevere

The evidence is good. Keep going and improve what you have.

## Pivot

Change **one major thing** while keeping what you learned. You might change your customer, your problem, your solution, your price, or how you reach people. For example, a tutoring service for "all students" might pivot to focus only on 8th graders preparing for high school entrance exams, because that group showed the most interest.

## Stop

Sometimes the problem is not important enough, you cannot solve it, or you realize you do not want to do this. Stopping is allowed, and it frees your time for the next idea.

## Signals

**Consider a pivot when:**

- Customers use it differently than you planned.
- A different group is much more interested.
- You hear the same objection again and again.
- Lots of people are interested, but nobody pays.

**Consider persevering when:**

- Your numbers are improving.
- Customers ask for more.
- People refer their friends.

## How to decide

Do not pivot because of one bad day, and do not persevere out of pride. Use the **evidence you wrote down**, and set a date to review it. Whatever you choose, write a short note on what you learned.`,
    apply:
      "Based on what you know so far about {name}, would you persevere, pivot, or stop? What evidence supports that?",
    quiz: [
      {
        prompt: "What does it mean to pivot?",
        options: [
          "Change a major part of your plan based on what you learned",
          "Give up entirely",
          "Start over and forget everything",
        ],
        correct: 0,
        explanation:
          "A pivot keeps your learning but changes something big, like the customer or the solution.",
      },
      {
        prompt: "Which is a signal to consider pivoting?",
        options: [
          "Customers keep asking for more",
          "Referrals are growing every week",
          "Many people show interest but nobody will pay",
        ],
        correct: 2,
        explanation:
          "Interest without payment means something about the offer, price, or customer is off.",
      },
      {
        prompt: "How should you decide what to do next?",
        options: [
          "Based on your mood today",
          "Using the evidence you collected, with a set review date",
          "Whatever the last person said",
        ],
        correct: 1,
        explanation:
          "Evidence and a scheduled review keep one good or bad day from steering the decision.",
      },
    ],
  },
  {
    slug: "iter-small-fast",
    stage: "iteration",
    title: "Improve in small, fast steps",
    minutes: 3,
    appliesTo: "all",
    summary: "Change one thing, test it, learn, and repeat.",
    reading: `Big redesigns are slow and risky. Small changes teach you faster.

## The loop

> **Change** one thing, **measure** the result, **learn** from it, then decide what to change next.

## Change one thing at a time

If you change your price, your name, and your photos all at once, you will never know which change caused the result. One change at a time gives you a clear answer.

## Examples

- Show two different headlines to two groups and compare sign-ups.
- Try a $5 price for a week and a $7 price the next.
- Move a confusing step earlier or later in your process.

## Keep cycles short

Aim for days, not months. The faster you learn, the faster you improve.

## Keep an experiment log

For each experiment, write the change, what you expected, what happened, and what you learned.

## Prioritize with "impact times ease"

List your ideas and rate each by how much it could help (impact) and how easy it is to do (ease). Start with **high impact, low effort.**

And remember: when something works, stop fiddling with it.`,
    apply:
      "What is one small change you could test on {name} this week, and what result would tell you it worked?",
    quiz: [
      {
        prompt: "Why change only one thing at a time?",
        options: [
          "So you know what caused the result",
          "It is slower, which is safer",
          "Changes are cheaper that way",
        ],
        correct: 0,
        explanation:
          "If several things change at once, you cannot tell which one made the difference.",
      },
      {
        prompt: "Which approach is better?",
        options: [
          "Rebuild everything and launch in six months",
          "Make a small change and test it within days",
          "Wait until everything is perfect",
        ],
        correct: 1,
        explanation:
          "Short cycles mean you learn quickly and avoid wasting months on the wrong thing.",
      },
      {
        prompt: 'What does prioritizing by "impact times ease" mean?',
        options: [
          "Do the hardest changes first",
          "Choose changes at random",
          "Do the high-impact, low-effort changes first",
        ],
        correct: 2,
        explanation:
          "You get the biggest gains for the least work by starting there.",
      },
    ],
  },
  {
    slug: "iter-metrics",
    stage: "iteration",
    title: "The numbers that matter (and the ones that don't)",
    minutes: 4,
    appliesTo: "all",
    summary: "Track a few meaningful numbers instead of drowning in data.",
    reading: `**Metrics** are numbers that show how your venture is doing. Early on, track only a few.

## Five useful kinds

- **Reach:** how many people find or try it
- **Action:** how many do the key thing you want (sign up, buy, book)
- **Return:** how many come back
- **Revenue or impact:** money earned, or the difference you make
- **Referrals:** how many bring others

## Pick one main number

Choose a single number to focus on for this month, such as "number of paying customers" or "sessions completed." It keeps you from chasing everything at once.

## Useful versus vanity

"1,000 views" feels great but tells you very little. "12 sign-ups out of 1,000 visitors (1.2 percent)" tells you something you can act on. **Ratios and percentages** are usually more helpful than raw counts.

## Make it a habit

Track your numbers weekly in a simple sheet. Look at **trends** over time, not single days.

## If you are a nonprofit

Track outcomes as well as outputs: how much did people's situations improve, not just how many you reached?

Do not track so many things that you stop doing the work.`,
    apply:
      "What is the one main number you would track for {name} this month, and how will you count it?",
    quiz: [
      {
        prompt: "Why choose one main number to focus on?",
        options: [
          "It keeps your focus on what matters right now",
          "You are not allowed to track more",
          "It lets you avoid math",
        ],
        correct: 0,
        explanation:
          "A single focus number keeps you from spreading your attention across everything.",
      },
      {
        prompt: "Which is more useful?",
        options: [
          "1,000 page views",
          "12 sign-ups out of 1,000 visitors",
          "Lots of likes",
        ],
        correct: 1,
        explanation:
          "A ratio of real actions tells you how well something is working and can be improved.",
      },
      {
        prompt: 'What does "retention" measure?',
        options: [
          "How many people see an ad",
          "How much you spend on supplies",
          "How many customers come back",
        ],
        correct: 2,
        explanation:
          "Retention tells you whether people liked it enough to return.",
      },
    ],
  },
];
