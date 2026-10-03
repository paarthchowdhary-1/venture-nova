import type { Lesson } from "./types";

export const validationLessons: Lesson[] = [
  {
    slug: "val-what-is",
    stage: "validation",
    title: "What validation really means",
    minutes: 3,
    appliesTo: "all",
    summary: "Collect evidence from real people before you build a lot.",
    reading: `**Validation** means gathering evidence that real people have the problem and want your solution, *before* you spend a lot of time or money building.

The key word is **evidence**. "My friends think it's great" is an opinion, and usually a polite one. Evidence is what people actually do.

Here is a ladder of evidence, from weakest to strongest:

- **Compliments:** "Cool idea!" They cost the person nothing to say.
- **Stories:** Someone describes in detail how the problem hurts them.
- **Time:** They agree to meet again, or introduce you to others.
- **Money or commitment:** They pre-order, pay a deposit, or sign up with real contact details.

The more it costs someone to give it, the more you can trust it.

Validation is not one giant test. It is a series of small checks, each one answering a question like "Does this problem really exist?" or "Would someone pay for this?"

And here is the best part: if your checks show the idea needs to change, that is a success. You just saved months of work on the wrong thing.`,
    apply:
      "What is one thing a real person could DO (not just say) that would prove someone wants {name}?",
    quiz: [
      {
        prompt: "Which is the strongest evidence for your idea?",
        options: [
          "Friends say it sounds great",
          "Someone pre-orders it",
          "A stranger says it is a cool idea",
        ],
        correct: 1,
        explanation:
          "Paying, even a small deposit, is the strongest signal because it costs the person something real.",
      },
      {
        prompt: "What does validation mean?",
        options: [
          "Collecting evidence from real people before building a lot",
          "Getting everyone to say they like your idea",
          "Finishing your product",
        ],
        correct: 0,
        explanation:
          "Validation is about evidence from real people, gathered before you invest heavily.",
      },
      {
        prompt: "Why are compliments weak evidence?",
        options: [
          "People never mean them",
          "They cost the person nothing to give",
          "They only come from friends",
        ],
        correct: 1,
        explanation:
          "Saying something nice is free, so it does not show that anyone would act.",
      },
    ],
  },
  {
    slug: "val-interviews",
    stage: "validation",
    title: "How to run a customer interview",
    minutes: 4,
    appliesTo: "all",
    summary: "Short conversations that teach you about customers' real lives.",
    reading: `A **customer interview** is a short conversation, usually 10 to 20 minutes, with someone who might have your problem. The goal is to learn about their life, not to pitch your idea.

## How to do it

- **Find five people who really match your customer.** Friends and family are the easiest, but not the most honest.
- **Say it is research.** "I'm learning about how students study. Can I ask you a few questions?"
- **Start with their world.** Ask them to tell you about the last time they dealt with the problem.
- **Listen far more than you talk.** Aim to speak about one-fifth of the time.
- **Dig deeper.** Follow up with "Why?" and "What happened next?"
- **Take notes.** Or ask permission to record.
- **Finish with:** "Who else should I talk to?"

## Common mistakes

- Pitching your idea instead of listening.
- Asking leading questions like "Wouldn't it be great if...?"
- Rushing to fill awkward silences. Silence often makes people say the most useful things.

After about five interviews, patterns start to show up.

**Safety first:** if you are under 18, do interviews with a parent or guardian knowing about them, and use public places or video calls with a trusted adult aware. Never meet strangers alone in private.`,
    apply:
      "Who are three people who match your target customer for {name}? Write their first names and where you could meet them safely.",
    quiz: [
      {
        prompt: "How much of an interview should you spend talking?",
        options: [
          "Most of it, so they understand your idea",
          "About half",
          "Very little, around a fifth",
        ],
        correct: 2,
        explanation:
          "Interviews are for listening. The less you talk, the more you learn.",
      },
      {
        prompt: "Which is the best way to open a question?",
        options: [
          "Tell me about the last time you studied for a big test",
          "Would you buy my app?",
          "Don't you think studying alone is hard?",
        ],
        correct: 0,
        explanation:
          "Asking about a real past event gets you honest details instead of polite guesses.",
      },
      {
        prompt: "Who should you interview?",
        options: [
          "Only your closest friends",
          "People who actually match your target customer",
          "Anyone available, no matter who they are",
        ],
        correct: 1,
        explanation:
          "Feedback only helps if it comes from the kind of person you want to serve.",
      },
    ],
  },
  {
    slug: "val-honest-questions",
    stage: "validation",
    title: "Questions that get honest answers",
    minutes: 3,
    appliesTo: "all",
    summary: "Ask about the past, not the future, and never lead the witness.",
    reading: `People are polite, and they want to help you. So if you ask "Do you like my idea?" almost everyone says yes. That feels nice and teaches you nothing.

Good questions ask about **what really happened**. Bad questions ask people to **predict the future**, which people are surprisingly bad at.

- **Weak:** "Would you use an app that finds study partners?"
- **Strong:** "When was the last time you studied with someone? How did you find them?"

The strong version gets you a real story, with real details you can learn from.

## Questions that work

- "How do you handle this today?"
- "What is the hardest part?"
- "What have you tried so far?"
- "What did that cost you in time or money?"
- "Why?" (the most powerful follow-up)

## Rules of thumb

- Ask about specific moments in the past.
- Ask what they already do about the problem.
- Do not mention your idea until the end, if at all.
- Avoid **leading questions**, which hint at the answer you want, like "Isn't it frustrating when...?"

If someone sighs or laughs while answering, that is a clue. Ask more about it.`,
    apply:
      "Write three questions you could ask about the problem behind {name}. Each should be about something that already happened.",
    quiz: [
      {
        prompt: "Which question is more likely to get an honest answer?",
        options: [
          "Would you buy this?",
          "When did you last deal with this problem, and what did you do?",
          "Don't you agree this is really annoying?",
        ],
        correct: 1,
        explanation:
          "It asks about a real past event, so the answer comes from experience, not politeness.",
      },
      {
        prompt:
          "Why are questions about the past better than questions about the future?",
        options: [
          "People are bad at predicting what they would do",
          "Past questions are shorter",
          "Questions about the future are rude",
        ],
        correct: 0,
        explanation:
          "What people actually did is a far better guide than what they imagine they would do.",
      },
      {
        prompt: "Which of these is a leading question?",
        options: [
          "What have you tried so far?",
          "How often does this happen?",
          "Isn't it frustrating when group chats never reply?",
        ],
        correct: 2,
        explanation:
          "It hints at the answer you want, which pushes people to agree with you.",
      },
    ],
  },
  {
    slug: "val-surveys",
    stage: "validation",
    title: "Surveys: useful, but limited",
    minutes: 3,
    appliesTo: "all",
    summary: "Use surveys to check how common a pattern is after interviews.",
    reading: `A **survey** asks the same questions to many people, usually with a free tool like Google Forms. Surveys are powerful, but only when used at the right time.

## What surveys are good for

- Checking how **common** a pattern is after interviews.
- Seeing how people **rank** a list of problems.
- Reaching more people quickly.

## What surveys are bad for

- **Discovering new problems.** People can only answer what you ask.
- **Understanding why.** A multiple-choice answer rarely tells the story behind it.

That is why the order matters: **interviews first, survey second.** Interviews help you learn what to ask. A survey then tells you how widespread it is.

## Tips for a good survey

- Keep it short: 5 to 8 questions, under two minutes.
- Mix multiple choice with one open question.
- Ask about behavior: "How many times did you do this last month?"
- Avoid biased wording that pushes toward an answer.
- Share it beyond your friends.

**Privacy:** do not collect names or contact details unless you really need them. If you are surveying other kids, check with a teacher or parent about the rules first.`,
    apply:
      "What is one multiple-choice question about behavior you could put in a survey for {name}?",
    quiz: [
      {
        prompt: "When is the best time to use a survey?",
        options: [
          "Before talking to anyone",
          "After interviews, to see how common the patterns are",
          "Instead of doing any interviews",
        ],
        correct: 1,
        explanation:
          "Interviews teach you what matters. Surveys then show how widespread it is.",
      },
      {
        prompt: "What does a good survey look like?",
        options: [
          "Long and detailed so you get every answer",
          "Full of hypothetical questions about the future",
          "Short and focused on what people actually do",
        ],
        correct: 2,
        explanation:
          "Short surveys get finished, and behavior questions give more reliable answers than hypotheticals.",
      },
      {
        prompt: "What is a weakness of surveys?",
        options: [
          "They cannot show why people behave a certain way",
          "They cannot reach more than five people",
          "They always cost money",
        ],
        correct: 0,
        explanation:
          "Surveys count answers well, but the reasons behind them usually need a conversation.",
      },
    ],
  },
  {
    slug: "val-reading-evidence",
    stage: "validation",
    title: "Reading the evidence (and knowing when to change course)",
    minutes: 4,
    appliesTo: "all",
    summary:
      "Look for patterns, beat your own bias, and decide what to do next.",
    reading: `After a round of interviews or tests you will have a pile of notes. How do you make sense of them without fooling yourself?

## Look for patterns, not single stories

If one person out of ten mentions something, it is interesting. If seven out of ten mention it, it is real.

## Weigh the evidence

Sort what you heard into **strong signals** (people took action, paid, or spent time) and **weak signals** (compliments and "maybe someday").

## Beware confirmation bias

**Confirmation bias** is the habit of noticing evidence that supports what you hoped and ignoring the rest. Everyone does it. The best defense is to decide in advance what would convince you that you are wrong. For example: "If fewer than three of ten people have this problem, I will rethink the idea."

## Three possible outcomes

- **The evidence supports you:** keep going and test the next assumption.
- **The evidence is mixed:** narrow your customer or your problem and test again.
- **The evidence says no:** change the idea, or pick a different problem.

That last outcome is not failure. It is the whole point of validating early.`,
    apply:
      "Finish this sentence for {name}: I will rethink my idea if the evidence shows that ___.",
    quiz: [
      {
        prompt: "What is confirmation bias?",
        options: [
          "Only noticing evidence that supports what you hoped",
          "Asking too many questions",
          "Confirming appointments with customers",
        ],
        correct: 0,
        explanation:
          "It is the habit of seeing what you want to see and skipping the rest.",
      },
      {
        prompt: "Why write down what would prove you wrong before you test?",
        options: [
          "To make the test longer",
          "So you cannot explain away disappointing results afterward",
          "Because investors require it",
        ],
        correct: 1,
        explanation:
          "A rule set in advance stops you from moving the goalposts when the results come in.",
      },
      {
        prompt:
          "Seven out of ten interviews mention the same problem. That is...",
        options: [
          "a pattern worth taking seriously",
          "a coincidence",
          "proof you should stop",
        ],
        correct: 0,
        explanation:
          "Repeated answers across many people are a pattern. One-off stories are not.",
      },
    ],
  },
];
