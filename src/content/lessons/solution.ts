import type { Lesson } from "./types";

export const solutionLessons: Lesson[] = [
  {
    slug: "sol-value-prop",
    stage: "solution",
    title: "Your value proposition",
    minutes: 4,
    appliesTo: "all",
    summary: "A clear promise of the benefit customers get and why choose you.",
    reading: `A **value proposition** is a clear promise: what benefit your customer gets, and why they should pick you over the other options.

Here is a simple template:

> For **[customer]** who **[need]**, **[name]** is a **[category]** that **[key benefit]**. Unlike **[alternative]**, we **[main difference]**.

Example: "For busy high schoolers who struggle to find study partners, StudyBuddy is an app that matches you with classmates for upcoming tests. Unlike a messy group chat, it only shows people who are studying the same material this week."

## Tips

- **Lead with the outcome,** not the technology. "Go from a C to a B" beats "AI-powered matching."
- **Use your customers' own words** from the interviews you did. They know what sounds right.
- **Be specific.** "Better" and "easier" do not mean much without a comparison.
- **Be honest.** Never promise something you cannot deliver.

## A quick test

Show it to someone in your target group for five seconds. Can they tell you what you offer and why it is different? If not, simplify it.`,
    apply:
      "Fill in the template for {name}: For ___ who ___, {name} is a ___ that ___. Unlike ___, we ___.",
    quiz: [
      {
        prompt: "What should a strong value proposition focus on?",
        options: [
          "The benefit the customer gets",
          "How hard you worked",
          "Which technology you used",
        ],
        correct: 0,
        explanation: "Customers care about what they get, not how it is built.",
      },
      {
        prompt: "Where can you find the best words for your value proposition?",
        options: [
          "A thesaurus",
          "The words your customers used in interviews",
          "Whatever sounds fanciest",
        ],
        correct: 1,
        explanation:
          "Customers' own language feels natural and makes your message instantly recognizable to them.",
      },
      {
        prompt: 'Why include the "Unlike..." part?',
        options: [
          "To criticize competitors",
          "It is required for a good value proposition",
          "It shows why someone should pick you over what they do today",
        ],
        correct: 2,
        explanation:
          "A difference gives people a reason to switch from what they already use.",
      },
    ],
  },
  {
    slug: "sol-benefits",
    stage: "solution",
    title: "Benefits, not features",
    minutes: 3,
    appliesTo: "all",
    summary: "Customers buy what a product does for them, not what it has.",
    reading: `A **feature** is what your product has or does. A **benefit** is what that does *for the customer.* People buy benefits.

- Feature: "Waterproof backpack." Benefit: "Your books stay dry on rainy walks to school."
- Feature: "Weekly reminders." Benefit: "You never forget to study before a quiz."
- Feature: "Handmade in small batches." Benefit: "Nobody else at school will have the same one."

A handy trick is the phrase **"so you can"**: take a feature and add "so you can..." until you reach something the customer actually cares about.

## Why this matters for building

It is tempting to add more and more features. But every feature makes your solution harder to build, test, and explain. A smaller solution is faster to test.

## Sort your features

List every feature you can think of, then label each one:

- **Must-have:** delivers the core benefit. Without it, the product does not work.
- **Nice-to-have:** adds a bit of delight, but could wait.
- **Cut:** does not help your main customer.

Build the must-haves first. Keep nice-to-haves for later, after real customers have used the basics.`,
    apply:
      'List five features of {name}. Rewrite each as a benefit using "so you can..." and mark which are must-haves.',
    quiz: [
      {
        prompt: "Which of these is a benefit rather than a feature?",
        options: [
          "Has a 2000mAh battery",
          "Your phone lasts all day without charging",
          "Made with an aluminum case",
        ],
        correct: 1,
        explanation:
          "A benefit describes what changes for the customer, in this case a phone that lasts all day.",
      },
      {
        prompt: 'How can the phrase "so you can..." help you?',
        options: [
          "It turns a feature into a benefit",
          "It lets you add more features",
          "It raises your price",
        ],
        correct: 0,
        explanation:
          'Adding "so you can" pushes you to say what the feature actually does for the person.',
      },
      {
        prompt: "What should you do with nice-to-have features at the start?",
        options: [
          "Build them first to impress customers",
          "Hide them from customers forever",
          "Leave them for later",
        ],
        correct: 2,
        explanation:
          "Must-haves come first. Nice-to-haves can wait until real customers have tried the basics.",
      },
    ],
  },
  {
    slug: "sol-service-design",
    stage: "solution",
    title: "Designing your service",
    minutes: 4,
    appliesTo: ["service"],
    summary:
      "Decide exactly what you deliver, how, and how much you can handle.",
    reading: `A **service** is something you do for someone: tutoring, dog walking, lawn care, design, social media help. Because it is delivered by *you*, you need to design the whole experience.

## Define the details

- What exactly is included, and what is not?
- How long does it take, and how often?
- How do customers book and pay?
- How will they know it worked?

## Make a one-page "service menu"

Write the name, what is included, how long it takes, your idea of the price, and how to book.

## Package it

"I'll tutor math" is vague. "4-week algebra boost: four one-hour sessions, a practice plan, and a progress check" is clear. Clear packages are easier for customers to understand and for you to deliver.

## Know your capacity

You only have so many hours. Decide how many customers you can handle each week, and be ready to say "I'm full right now."

## Reliability wins

Showing up on time and communicating clearly matter more than almost anything else. People remember reliable.

## Stay safe

Meet in public places or online with a parent or guardian aware. Set clear boundaries, and get guardian permission when you serve other minors.`,
    apply:
      "Write a short service menu for {name}: what is included, how long it takes, and how many customers you can handle each week.",
    quiz: [
      {
        prompt: "Why define exactly what is included in your service?",
        options: [
          "So you and the customer share the same expectations",
          "So it sounds complicated",
          "It automatically lets you charge more",
        ],
        correct: 0,
        explanation:
          "Clear scope prevents confusion and disappointment on both sides.",
      },
      {
        prompt: 'Why is a package better than "I\'ll help with anything"?',
        options: [
          "It is cheaper to buy",
          "It is easier to understand, sell, and deliver",
          "Customers prefer vague offers",
        ],
        correct: 1,
        explanation:
          "A clear package tells customers exactly what they get and tells you exactly what to deliver.",
      },
      {
        prompt: "Because you deliver the service yourself, what should you do?",
        options: [
          "Take on as many customers as possible",
          "Never say no to anyone",
          "Decide how many customers you can handle each week",
        ],
        correct: 2,
        explanation:
          "Your time is limited. Overbooking leads to late, rushed work and unhappy customers.",
      },
    ],
  },
  {
    slug: "sol-product-design",
    stage: "solution",
    title: "Designing a physical product",
    minutes: 4,
    appliesTo: ["physical_product"],
    summary: "Define what it must do, sketch it, and set a target cost.",
    reading: `Before you make anything, decide what your product must do. Work through these steps.

## 1. List your core requirements

What must it do for the customer? Think about size, durability, comfort, safety, and look.

## 2. Sketch it

Draw rough pictures from a few angles and label the sizes. Sketches are cheap and easy to change, so make lots of them.

## 3. Think about materials

What is it made from? Consider cost, availability, and safety. This matters even more for products that touch skin or food, or that are used by young children.

## 4. Set a target cost

Decide the most you can spend to make one, so you can still price it profitably. If it costs twelve dollars to make and customers will only pay ten, there is no business yet.

## 5. Study what already exists

What do similar products do well? Where do they fall short?

Put all of this on a one-page spec: name, purpose, size, materials, and estimated cost. It will change as you build prototypes, and that is normal.

**Safety first:** products used by kids, worn on the skin, or involving food often have legal safety rules. Ask a trusted adult and research the rules before you sell anything.`,
    apply:
      "Sketch {name} and write its three most important requirements. What is the most you could spend to make one?",
    quiz: [
      {
        prompt: "Why set a target cost early?",
        options: [
          "To make sure you can sell it at a profit",
          "To make the product look cheap",
          "It is required by law",
        ],
        correct: 0,
        explanation:
          "If it costs more to make than people will pay, you lose money on every sale.",
      },
      {
        prompt: "What is a sketch's job at this stage?",
        options: [
          "To be the final design",
          "To get ideas out so you can discuss and improve them",
          "To replace testing with real people",
        ],
        correct: 1,
        explanation:
          "Sketches are cheap, so you can try many ideas before building anything.",
      },
      {
        prompt:
          "For products used by kids, worn on skin, or involving food, you should...",
        options: [
          "skip safety rules while you are small",
          "wait until you are famous to check the rules",
          "check the safety rules before you sell",
        ],
        correct: 2,
        explanation:
          "Safety rules exist to protect people, and they apply even to small sellers.",
      },
    ],
  },
  {
    slug: "sol-software-flows",
    stage: "solution",
    title: "Designing an app or website: user flows",
    minutes: 4,
    appliesTo: ["software"],
    summary: "Map the steps a user takes before you write any code.",
    reading: `Before you write code, map out what your user will actually do.

## User flow

A **user flow** is the path from "arrives" to "got what they came for." For a study-partner app it might be:

> Open the app, choose a class, see matches, send a request, start chatting.

Draw it as boxes and arrows on paper.

## Wireframes

A **wireframe** is an ugly sketch of each screen showing the main elements. No colors, no polish. You can use paper, a whiteboard, or a free design tool.

## Questions to ask

- What is the **one thing** users come here to do?
- How many taps or clicks does it take?
- What can be removed?

A short main path makes a better experience. Features outside that path can wait.

## User stories

Write each feature as: "As a **[user]**, I want to **[action]** so that **[benefit]**."

## Test the drawings

Show your sketches to real people before you build. Changing a drawing takes minutes. Changing finished code takes days.

**Privacy:** if your app collects information from minors, plan what you collect and why, and collect as little as possible. Many places have special rules for young users, so check with an adult or a professional before you launch.`,
    apply:
      "Draw the main user flow for {name} in 4 to 6 steps. What is the one thing a user comes to do?",
    quiz: [
      {
        prompt: "What does a user flow show?",
        options: [
          "The steps a user takes to reach their goal",
          "How your code is organized",
          "Your marketing plan",
        ],
        correct: 0,
        explanation:
          "It maps the path from arriving to getting what the person came for.",
      },
      {
        prompt: "Why sketch before coding?",
        options: [
          "Sketches are required by app stores",
          "Changing a drawing is far cheaper than changing code",
          "Code can never be changed",
        ],
        correct: 1,
        explanation:
          "Fixing a sketch takes minutes. Fixing built software takes much longer.",
      },
      {
        prompt: "What does a shorter main path usually give the user?",
        options: [
          "More confusion",
          "Fewer features forever",
          "An easier experience",
        ],
        correct: 2,
        explanation:
          "Fewer steps to the goal means less effort and less chance of getting lost.",
      },
    ],
  },
  {
    slug: "sol-theory-of-change",
    stage: "solution",
    title: "Theory of change: how will you create impact?",
    minutes: 4,
    appliesTo: ["nonprofit"],
    summary: "Connect what you do to the change you want to see.",
    reading: `A nonprofit or social-impact venture exists to create **change**, not profit. A **theory of change** explains how your activities lead to the change you want.

Follow the chain:

> Problem, then **Activities** (what you do), then **Outputs** (what you can count), then **Outcomes** (how people's lives change), then **Impact** (long-term change).

Here is an example:

- **Problem:** Some kids do not have the school supplies they need.
- **Activities:** Collect and hand out backpacks.
- **Outputs:** 200 backpacks delivered.
- **Outcomes:** Kids arrive at class prepared and feel more confident.
- **Impact:** Better school success over time.

## The key difference

**Outputs are what you did. Outcomes are what changed for people.** Handing out 200 backpacks is an output. Whether kids actually do better is an outcome. Be careful not to confuse them.

## Test your assumptions

"If we give backpacks, attendance will improve" is an assumption. Check it with short before-and-after surveys or by listening to stories.

## Involve the people you want to help

They know what they need better than you do. Ask them, and let them help shape your project.`,
    apply:
      "Write the chain for {name}: the problem, your activities, one output, and one outcome you hope to see.",
    quiz: [
      {
        prompt: "Which of these is an output?",
        options: [
          "200 backpacks given out",
          "Students feel more confident",
          "Higher graduation rates in ten years",
        ],
        correct: 0,
        explanation:
          "An output is something you can count that you did. The others are changes in people.",
      },
      {
        prompt: "What is the difference between outputs and outcomes?",
        options: [
          "They mean the same thing",
          "Outcomes are always easier to measure",
          "Outputs count what you did, and outcomes show how people's lives changed",
        ],
        correct: 2,
        explanation:
          "Outputs measure your effort. Outcomes measure whether it actually helped.",
      },
      {
        prompt: "What is the best way to learn what people need?",
        options: [
          "Guess based on what you would want",
          "Ask and involve the people you want to help",
          "Copy another charity exactly",
        ],
        correct: 1,
        explanation: "The people you serve know their own needs best.",
      },
    ],
  },
];
