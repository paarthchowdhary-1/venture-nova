import type { Lesson } from "./types";

export const ideaLessons: Lesson[] = [
  {
    slug: "idea-good-idea",
    stage: "idea",
    title: "What makes a good business idea?",
    minutes: 3,
    appliesTo: "all",
    summary:
      "A good idea solves a real problem for people who care enough to act.",
    reading: `Most people think a good idea is one that sounds clever. In business, a good idea is one that **solves a real problem for real people who care enough to do something about it.**

Three questions help you test any idea:

- **Is the problem real?** It should regularly annoy, cost, or frustrate people.
- **Who has it, and how often?** The best problems hit many people, or hit a smaller group hard and often.
- **Are people already trying to fix it?** If they spend time or money on workarounds, the problem is real.

Take studying for tests. Students already pay tutors, watch videos, and text friends for help. That tells you the problem matters to them. Now compare that to a robot that folds socks. It sounds fun, but very few people would pay to solve that problem.

Notice that a good idea does not have to be new. Plenty of successful businesses do something familiar a little better, for a more specific group, or in a nicer way.

So stop asking "Is this cool?" and start asking **"Who has this problem, and what do they do about it today?"**`,
    apply:
      "Think about {name}. Who has the problem it solves, and what do they do about it today?",
    quiz: [
      {
        prompt: "What makes an idea a good one for a business?",
        options: [
          "It is completely new and nobody has done it",
          "It solves a real problem for people who care enough to act",
          "You personally think it is cool",
        ],
        correct: 1,
        explanation:
          "Business ideas succeed when real people have a real problem and care enough to act on it. Being new or cool is not required.",
      },
      {
        prompt:
          "People already pay for workarounds to a problem. This is a sign that...",
        options: [
          "the problem is probably real",
          "the market is too crowded to enter",
          "you must copy the existing solution exactly",
        ],
        correct: 0,
        explanation:
          "If people already spend time or money working around a problem, it clearly matters to them.",
      },
      {
        prompt: "Which question is most useful to ask about your idea?",
        options: [
          "Could I build it by next week?",
          "How impressive does it sound?",
          "Who has this problem, and what do they do about it today?",
        ],
        correct: 2,
        explanation:
          "This question points you at real people and real behavior, which is what a business depends on.",
      },
    ],
  },
  {
    slug: "idea-start-with-problem",
    stage: "idea",
    title: "Start with the problem, not the solution",
    minutes: 3,
    appliesTo: "all",
    summary: "Describe the problem clearly before you fall in love with a fix.",
    reading: `Many first-time founders fall in love with a solution: "an app that...", "a gadget that...". Then they go looking for a problem to attach it to. That usually ends with a product nobody needs.

Flip it. **Start with the problem**, and treat your solution as your current best guess at fixing it.

Here is a simple way to write a problem statement:

> [Specific people] struggle with [specific problem] because [reason].

For example: "High school students struggle to find reliable study partners because they only know people in their own classes."

Why this matters: if your first solution fails, a clear problem tells you what to aim at next. You can try a different fix without starting over.

A good problem statement is:

- **Specific.** "People need a better way to study" is too fuzzy.
- **Observable.** You could actually watch it happen.
- **Free of your solution.** It describes the pain, not your product.

Be careful with huge problems like "pollution" or "boredom". Shrink them until you can name a particular group in a particular situation.`,
    apply:
      "Write the problem {name} solves in one sentence, without mentioning your solution: who struggles with what, and why?",
    quiz: [
      {
        prompt: "Which is the best problem statement?",
        options: [
          "People need a better way to study",
          "Students in AP classes struggle to find study partners because they only know people from their own sections",
          "We should build a study-matching app",
        ],
        correct: 1,
        explanation:
          "It names a specific group, a specific problem, and a reason, and it does not smuggle in a solution.",
      },
      {
        prompt: "Why start with the problem instead of the solution?",
        options: [
          "If your first solution fails, you still know what to aim at",
          "Solutions are never worth building",
          "It makes your idea sound more impressive",
        ],
        correct: 0,
        explanation:
          "A clear problem outlasts any one solution, so you can keep trying fixes without starting over.",
      },
      {
        prompt: "A problem statement should NOT...",
        options: [
          "name who has the problem",
          "describe something you could observe happening",
          "include your solution inside it",
        ],
        correct: 2,
        explanation:
          "Once the solution is baked into the problem, you stop noticing other ways to fix it.",
      },
    ],
  },
  {
    slug: "idea-one-sentence",
    stage: "idea",
    title: "Explain your idea in one sentence",
    minutes: 3,
    appliesTo: "all",
    summary: "If you can't say it simply, you don't understand it yet.",
    reading: `If you cannot explain your idea in one sentence, you probably do not fully understand it yet, and nobody else will either.

Try this template:

> I'm helping **[who]** to **[do or solve what]** by **[how]**.

Examples:

- "I'm helping busy parents find reliable math tutors by matching them with honors students from nearby high schools."
- "I'm helping teens who like thrifting find unique outfits by curating a monthly secondhand clothing box."

Some rules for a good one-sentence version:

- **Include who.** If you cannot say who it is for, the idea is still too vague.
- **Skip jargon.** A friend who has never heard of your idea should get it in about ten seconds.
- **Be concrete.** "A platform that leverages synergy" says nothing.

Here is a quick test. Say your sentence to someone who knows nothing about it, then ask them to repeat it back in their own words. If they get it wrong, the sentence needs work.

Your sentence is not final. It will change as you learn more, and that is a good sign.`,
    apply:
      "Write {name} as one sentence using the template: I'm helping ___ to ___ by ___.",
    quiz: [
      {
        prompt: "What is the main benefit of writing a one-sentence version?",
        options: [
          "It forces you to be clear about who it is for and what it does",
          "Investors require exactly one sentence",
          "It means you can skip research",
        ],
        correct: 0,
        explanation:
          "Squeezing your idea into one sentence exposes any fuzzy thinking.",
      },
      {
        prompt: "Which part should always be in your one-sentence version?",
        options: [
          "The technology you will use",
          "Who you are helping",
          "How much money you will make",
        ],
        correct: 1,
        explanation:
          "Knowing who you are helping keeps everything else grounded in a real customer.",
      },
      {
        prompt: "How can you tell if your sentence is clear enough?",
        options: [
          "It contains impressive vocabulary",
          "It is longer than thirty words",
          "Someone unfamiliar can repeat it back correctly",
        ],
        correct: 2,
        explanation:
          "If a newcomer can restate it accurately, it is clear. Fancy words usually make it worse.",
      },
    ],
  },
  {
    slug: "idea-assumptions",
    stage: "idea",
    title: "Your idea is full of assumptions",
    minutes: 4,
    appliesTo: "all",
    summary: "Find what you are guessing, then test the riskiest guess first.",
    reading: `An **assumption** is something you believe is true but have not checked. Every idea is built on them:

- "Teenagers want this."
- "Parents will pay for it."
- "I can make it for five dollars."
- "People will find out about it."

Assumptions are dangerous because they are invisible until one of them breaks. The fix is to bring them into the open.

## How to find them

Finish this sentence five times: **"For this to work, it must be true that..."**

## How to pick which to test first

Rate each assumption on two things:

- **How badly does the idea fail if this is wrong?**
- **How little evidence do I have so far?**

The assumption that scores high on both is your **riskiest assumption**. Test that one first.

For a study-partner app, the list might include "students struggle to find partners", "they would use an app instead of a group chat", and "enough students at one school will join to make it useful." The riskiest might be that students actually want to study with people they do not know yet.

Testing the riskiest assumption early can save you months of work on the wrong thing.`,
    apply:
      "List five things that must be true for {name} to work. Circle the one you have the least evidence for.",
    quiz: [
      {
        prompt: "What is an assumption?",
        options: [
          "A fact backed by data",
          "Something you believe but have not checked",
          "A plan for next year",
        ],
        correct: 1,
        explanation:
          "Assumptions are beliefs you have not tested yet. Facts are things you have evidence for.",
      },
      {
        prompt: "Which assumption should you test first?",
        options: [
          "The one that would break the idea if wrong and that you have little evidence for",
          "The easiest one to test",
          "The one you feel most sure about",
        ],
        correct: 0,
        explanation:
          "High risk plus low evidence is where you are most likely to be wrong, so that is where testing pays off most.",
      },
      {
        prompt: "Which of these is an assumption rather than a fact?",
        options: [
          "I sold twelve items last week",
          "Three people told me they pay for tutoring",
          "Everyone at school will want one",
        ],
        correct: 2,
        explanation:
          "Nobody has checked that everyone wants one. The other two are things that actually happened.",
      },
    ],
  },
  {
    slug: "idea-young-founder",
    stage: "idea",
    title: "Being a young founder: safety, time, and trusted adults",
    minutes: 4,
    appliesTo: "all",
    summary: "How to build something real while staying safe and balanced.",
    reading: `Starting something at 12 to 18 is absolutely possible, and it has real advantages: fresh eyes, lots of time to learn, and nobody expects you to know everything yet. It also comes with a few things worth handling smartly from day one.

## Bring in a trusted adult

A parent, guardian, teacher, or mentor can help you avoid expensive mistakes. In many places, adults are needed for things like opening bank accounts, signing contracts, and taking payments. Ask early, not after something goes wrong.

## Protect your privacy and others'

Do not share your home address or personal details publicly. Be careful with information from other kids. Follow the rules and age limits of any website or app you use.

## Protect your time

School, sleep, and friends come first. Set a weekly time budget, such as four hours, and stick to it.

## Be careful with money

Start with small tests. Do not spend money you cannot afford to lose.

## Be honest

Never pretend to be older than you are, and never mislead customers.

VentureNova gives guidance, not legal or financial advice. For money, legal, or safety questions, ask a trusted adult or a qualified professional.`,
    apply:
      "Who is one trusted adult you could tell about {name}? Write down how many hours per week you can realistically give it.",
    quiz: [
      {
        prompt: "When should you involve a trusted adult?",
        options: [
          "Early, especially for money, contracts, and accounts",
          "Only if something goes wrong",
          "Never, doing it alone shows commitment",
        ],
        correct: 0,
        explanation:
          "Adults can spot problems before they get expensive, and some things legally require one.",
      },
      {
        prompt:
          "Which is a good way to protect yourself online while building your venture?",
        options: [
          "Post your home address so customers can find you",
          "Keep personal info private and follow each platform's rules",
          "Use a fake age to join any platform you like",
        ],
        correct: 1,
        explanation:
          "Keeping personal details private and following age rules protects you and your venture.",
      },
      {
        prompt: "What is the best way to manage your time?",
        options: [
          "Set a weekly time budget that leaves room for school and rest",
          "Work late every night until it is finished",
          "Skip schoolwork during launch weeks",
        ],
        correct: 0,
        explanation:
          "A realistic time budget keeps your venture going without wrecking school or sleep.",
      },
    ],
  },
];
