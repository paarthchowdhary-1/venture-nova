import type { Lesson } from "./types";

export const feedbackLessons: Lesson[] = [
  {
    slug: "fb-collecting",
    stage: "feedback",
    title: "Collecting feedback the smart way",
    minutes: 3,
    appliesTo: "all",
    summary: "Ask at the right moment, keep it short, and record exact words.",
    reading: `**Feedback** is what customers tell you after they try your product or service. Getting good feedback is a skill.

## Ask at the right time

Right after someone uses it, while the memory is fresh. Waiting weeks gets you vague answers.

## Keep it light

Two or three questions is plenty:

- "What was the best part?"
- "What was frustrating or confusing?"
- "What would make it better?"

A powerful extra question is: **"How would you feel if you could no longer use this?"** (very disappointed, somewhat disappointed, or not disappointed). It shows how much people truly need what you made.

## Use more than one channel

A quick chat, a short form, or a call all work. Pick what is easiest for your customers.

## Make honesty safe

Thank people for feedback, and never argue. If you get defensive, people stop telling you the truth.

## Record it carefully

Write down the date, who said it, and their **exact words**, plus what they did. Keep it all in one place, like a spreadsheet. Ask permission before you quote anyone, and collect only the personal details you really need.`,
    apply:
      "Write the three feedback questions you would ask customers of {name}, and when you would ask them.",
    quiz: [
      {
        prompt: "When is the best time to ask for feedback?",
        options: [
          "Right after they use it",
          "Six months later",
          "Never, they will tell you if there is a problem",
        ],
        correct: 0,
        explanation:
          "Fresh memories give the most accurate and detailed answers.",
      },
      {
        prompt: "Why record feedback in the customer's own words?",
        options: [
          "It is required to ask permission",
          "It keeps their exact meaning and shows what they care about",
          "It makes your list longer",
        ],
        correct: 1,
        explanation:
          "Their exact words capture what they really mean and often make great messaging later.",
      },
      {
        prompt: "How should you respond to negative feedback?",
        options: [
          "Explain why they are wrong",
          "Ignore it unless more people say it",
          "Thank them and ask a follow-up question",
        ],
        correct: 2,
        explanation:
          "Thanking people keeps them honest, and a follow-up question uncovers the real problem.",
      },
    ],
  },
  {
    slug: "fb-sorting",
    stage: "feedback",
    title: "Sorting feedback: what to act on",
    minutes: 3,
    appliesTo: "all",
    summary: "Not all feedback deserves action. Find the patterns that matter.",
    reading: `Not every piece of feedback should change your product. If you try to please everyone, you will build a mess.

## Step 1: Group it

Put similar comments together into **themes.** Ten different people saying "the sign-up is confusing" is one theme.

## Step 2: Count and rate

For each theme, ask:

- **How many** people mentioned it?
- **How serious** is it? Does it stop people from using it, or is it a small annoyance?
- **Who** said it? Is that person your target customer, or someone outside your group?

## Step 3: Prioritize

Fix first what is **frequent, serious, and from your target customers.**

## Listen to the problem, not the suggested solution

When a customer says "Add a dark mode!" the real problem may be "it is hard to read at night." Ask questions to understand the need behind the request. Then you can choose the best solution yourself.

## Park the rest

Keep a running "ideas" list for things that are not urgent. Come back to them later.

## Say no politely

You can thank someone for a suggestion and still decide not to do it.`,
    apply:
      "Imagine three pieces of feedback on {name}. Which would you act on first, and why?",
    quiz: [
      {
        prompt: "Which feedback should usually get priority?",
        options: [
          "Frequent, serious, and from your target customers",
          "From whoever is loudest",
          "The easiest to do",
        ],
        correct: 0,
        explanation:
          "Frequency, seriousness, and fit with your target customer tell you what matters most.",
      },
      {
        prompt: "When a customer suggests a solution, what should you do?",
        options: [
          "Build it exactly as suggested",
          "Look for the problem behind the suggestion",
          "Ignore all suggestions",
        ],
        correct: 1,
        explanation:
          "The need behind a request is more valuable than the specific fix they propose.",
      },
      {
        prompt: "How does grouping similar comments help?",
        options: [
          "It hides complaints you dislike",
          "It makes your reports longer",
          "It shows which themes come up most",
        ],
        correct: 2,
        explanation: "Themes reveal patterns that single comments cannot.",
      },
    ],
  },
  {
    slug: "fb-criticism",
    stage: "feedback",
    title: "Handling criticism and staying motivated",
    minutes: 3,
    appliesTo: "all",
    summary: "Learn from tough feedback without letting it knock you down.",
    reading: `Criticism can sting, especially when you have worked hard. That is completely normal. Here is how to handle it.

## Separate yourself from your idea

Feedback on your product is not feedback on **you.** Even great founders hear lots of "this is not working."

## A calm process

- **Pause.** Do not reply right away.
- **Write down** exactly what was said.
- **Ask three questions:** Is it true? Is it useful? Is it from my target customer?
- **Keep the useful parts** and let the rest go.

## Some criticism is unfair

Some comments are just unkind or off the mark. You are allowed to ignore them. If someone is harassing or threatening you, tell a trusted adult and report it.

## Staying motivated

- Setbacks are **normal.** Every venture has them.
- Track **small wins** so you can see progress.
- Talk to someone supportive: a mentor, friend, or family member.
- Take breaks. Rest helps you think better.
- Remember **why** you started and the problem you care about.

Failure is information. Each test that does not work saves you time and money later.

Celebrate progress along the way, not just the finish line.`,
    apply:
      "What is one small win with {name} so far? Who could you share it with this week?",
    quiz: [
      {
        prompt: "What is the best first step after harsh feedback?",
        options: [
          "Pause and write down exactly what was said before replying",
          "Reply immediately",
          "Quit the project",
        ],
        correct: 0,
        explanation:
          "Pausing helps you respond calmly and learn from what was actually said.",
      },
      {
        prompt: "Useful criticism is usually...",
        options: [
          "anything negative",
          "truthful, helpful, and from your target customers",
          "only from famous people",
        ],
        correct: 1,
        explanation:
          "Criticism is most useful when it is true, actionable, and from the people you serve.",
      },
      {
        prompt: "What should you do if feedback is cruel or harassing?",
        options: [
          "Reply in kind",
          "Believe it is all true",
          "Tell a trusted adult or report it",
        ],
        correct: 2,
        explanation:
          "Harassment is not feedback. A trusted adult can help, and you can report it.",
      },
    ],
  },
];
