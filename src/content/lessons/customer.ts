import type { Lesson } from "./types";

export const customerLessons: Lesson[] = [
  {
    slug: "cust-segments",
    stage: "customer",
    title: "Narrowing down: who exactly is your customer?",
    minutes: 3,
    appliesTo: "all",
    summary:
      '"Everyone" is not a customer. Pick a specific group to start with.',
    reading: `"Everyone" is not a customer. If you try to serve everyone, your message connects with no one.

A **customer segment** is a specific group of people who share a problem and behave in similar ways. You can narrow a group down by:

- **Who they are:** age, role, interests
- **Where they are:** school, neighborhood, online community
- **Their situation:** when and why the problem shows up
- **What they care about:** speed, price, style, trust

Compare these:

- Too broad: "Students"
- Much better: "10th graders at my school who are preparing for AP exams and currently study alone"

## Why start narrow?

- It is **easier to find them.** You know where they hang out.
- It is **easier to write messages** that make them say "that's me."
- It is **easier to build exactly what they need.**

You can always expand later. Many big companies started with one small, specific group and won them completely first.

## A quick test

Could you name 20 real people who fit your segment? Could you reach them this week? If not, narrow it further.`,
    apply:
      "Describe the first small group you would serve with {name} in one sentence. Include who, where, and their situation.",
    quiz: [
      {
        prompt: "Why start with a narrow customer segment?",
        options: [
          "It is easier to reach them and build what they need",
          "Big groups never buy anything",
          "Narrow groups always pay more",
        ],
        correct: 0,
        explanation:
          "A narrow group is easy to find and easy to understand, so you can serve them really well.",
      },
      {
        prompt: "Which is the best customer description?",
        options: [
          "Everyone who likes fashion",
          "Teens",
          "Girls in grades 9 to 11 at my school who thrift shop and want unique outfits",
        ],
        correct: 2,
        explanation:
          "It names who they are, where they are, and what they care about.",
      },
      {
        prompt: "What is a quick test of a good segment?",
        options: [
          "Does it sound impressive?",
          "Could you name 20 real people in it and reach them this week?",
          "Is it the biggest group possible?",
        ],
        correct: 1,
        explanation:
          "If you cannot name and reach real people, the segment is still too vague.",
      },
    ],
  },
  {
    slug: "cust-needs",
    stage: "customer",
    title: "What your customer is really trying to get done",
    minutes: 4,
    appliesTo: "all",
    summary: "People don't buy products. They hire them to make progress.",
    reading: `Here is a powerful idea: people do not really buy products. They **hire** products to get a **job** done.

"Job" here means progress someone wants to make in a particular situation.

A famous example: a fast-food chain discovered that many milkshakes were bought early in the morning by people commuting to work. The job was not "enjoy a milkshake." It was "make a boring drive more interesting and keep me full until lunch." The milkshake was not competing with other milkshakes. It was competing with bananas, bagels, and boredom.

For a tutoring service, the job is rarely "learn math." It is often "feel confident before the test" or "stop my parents worrying about my grade."

## Why this helps

- It shows your **real competition:** anything that gets the job done.
- It shows what **matters most:** speed, price, comfort, or how it makes them feel.
- It reveals **emotional and social jobs**, like looking good to friends.

## Questions to ask

- What are they trying to get done?
- What is happening in their life when they start looking for a solution?
- What would success feel like?`,
    apply:
      "What job is your customer hiring {name} to do? Finish the sentence: When I ___, I want to ___, so I can ___.",
    quiz: [
      {
        prompt: 'What does "jobs to be done" mean?',
        options: [
          "The tasks you must complete to build your business",
          "The progress your customer wants to make in a situation",
          "Part-time jobs for teenagers",
        ],
        correct: 1,
        explanation:
          "A customer's job is the progress they want to make, and they hire a product to help.",
      },
      {
        prompt:
          "A student buying study help before a test may mainly want to...",
        options: [
          "feel confident and prepared",
          "own a tutor",
          "learn every part of the subject",
        ],
        correct: 0,
        explanation:
          "The emotional job, feeling ready, is often more important than the stated one.",
      },
      {
        prompt: "Why does this idea help you see your real competition?",
        options: [
          "Only identical products compete with you",
          "Competition does not really matter",
          "Anything that gets the job done competes with you",
        ],
        correct: 2,
        explanation:
          "Your customer can solve the job many ways, so every alternative is competition.",
      },
    ],
  },
  {
    slug: "cust-user-buyer",
    stage: "customer",
    title: "The user and the buyer may be different people",
    minutes: 3,
    appliesTo: "all",
    summary:
      "The person who uses it and the person who pays can want different things.",
    reading: `The person who **uses** your product and the person who **pays** for it are not always the same.

- Tutoring: the student uses it, the **parent** pays.
- Kids' toys: the child uses it, the **parent** buys.
- School software: students use it, the **school** pays.
- Snacks sold at school: the student uses it **and** buys it.

If you only think about the user, you can forget what the buyer cares about. Buyers often worry about **price, safety, trust, and proof that it works.** Users care more about **fun, ease, and how it feels.**

## Four roles to map

- **User:** who uses it?
- **Buyer:** who pays?
- **Decider:** who says yes?
- **Influencer:** whose opinion matters (a friend, a teacher, an online creator)?

## Why it matters

Your message has to speak to each role. A sock brand might show style to teens (the users) and quality and value to parents (the buyers).

If you are a teen selling to other teens who spend their own money, the user and buyer may be the same person. Check who actually holds the money, and interview **both** roles when they are different.`,
    apply:
      "For {name}, who is the user, who is the buyer, and who might influence the decision?",
    quiz: [
      {
        prompt: "In a tutoring business for kids, who is usually the buyer?",
        options: ["The student", "The parent or guardian", "The teacher"],
        correct: 1,
        explanation:
          "Parents or guardians usually pay, even though the student is the one using the service.",
      },
      {
        prompt: "Why does the difference between user and buyer matter?",
        options: [
          "They may care about very different things",
          "Users never matter",
          "It makes no difference",
        ],
        correct: 0,
        explanation:
          "Buyers might care about price and safety, users about fun and ease. You need to win both.",
      },
      {
        prompt: "What should you do when the user and buyer are different?",
        options: [
          "Only talk to the users",
          "Only advertise to the buyers",
          "Learn what both care about and talk to both",
        ],
        correct: 2,
        explanation:
          "If you ignore either one, you can build something nobody ends up buying or using.",
      },
    ],
  },
  {
    slug: "cust-competition",
    stage: "customer",
    title: "Know your competition (including doing nothing)",
    minutes: 4,
    appliesTo: "all",
    summary: "Every way customers solve the problem today is competition.",
    reading: `**Competition** is every way your customers solve the problem today. It comes in three kinds:

- **Direct competitors:** similar products or services (another tutoring company).
- **Indirect competitors:** different ways to meet the same need (YouTube videos, study groups).
- **Doing nothing:** a workaround, or just putting up with the problem. This is often your biggest competitor.

## Competition is a good sign

If nobody else is doing it, that often means there is no demand, or you have not looked hard enough. Existing competition shows people will pay to solve this problem.

## How to research

- Search for how people solve it right now.
- Ask in interviews: "What do you do today?"
- List five to eight alternatives. For each, write the price, what it does well, and what it does badly.

## Find your gap

Look for what competitors do poorly or ignore, especially for **your specific customer segment.** Maybe the big tutoring companies are expensive and impersonal, and you can offer affordable help from someone close in age.

Do not just copy the leader. Stand out by who you serve, your price, how convenient you are, the quality, or your personality. And be honest about what others do well.`,
    apply:
      "List three ways your customers solve the problem behind {name} today, including doing nothing. What is each one bad at?",
    quiz: [
      {
        prompt: 'Why does "doing nothing" count as competition?',
        options: [
          "Customers may keep their workaround instead of switching to you",
          "It is free",
          "It is the same as a rival product",
        ],
        correct: 0,
        explanation:
          "Getting people to change their habits is hard, so their current way is your toughest competitor.",
      },
      {
        prompt:
          "You search and find zero competitors. This most likely means...",
        options: [
          "you have found a perfect market",
          "either nobody wants it, or you have not looked hard enough",
          "you should rush to patent it",
        ],
        correct: 1,
        explanation:
          "No competition usually signals missing demand or incomplete research.",
      },
      {
        prompt: "What is a good way to stand out from competitors?",
        options: [
          "Copy the leader exactly",
          "Charge the lowest price in every case",
          "Serve a specific group or need that others handle poorly",
        ],
        correct: 2,
        explanation:
          "A focused gap lets you be clearly better for a particular group.",
      },
    ],
  },
  {
    slug: "cust-first-ten",
    stage: "customer",
    title: "Finding your first ten customers",
    minutes: 4,
    appliesTo: "all",
    summary: "Win a handful of real customers one at a time.",
    reading: `Do not think about thousands of customers yet. Think about **ten.** Your first customers will teach you more than any later ones.

## Where to find them

Go where the problem already lives:

- School clubs and teams
- Local groups and community centers
- Online communities where your customer already spends time
- Introductions from people you already know ("Do you know anyone who...?")

## Do things that do not scale

Message people personally. Offer to help one person at a time. A small, clear offer works well: "I'm starting a ___ for ___. Can I show you? The first five people get it free in exchange for honest feedback."

## Keep track

Use a simple sheet with name, how you found them, status, and notes. This keeps you organized and honest about how it is really going.

## Handling "no"

Thank them and, if they are willing, ask what held them back. Every "no" is information.

## Stay safe and respectful

Meet in public places or on calls with a trusted adult aware. Do not share personal details. Follow school and platform rules about advertising, and always accept a no politely.`,
    apply:
      "Name three places (online or in person) where the first ten customers for {name} already gather.",
    quiz: [
      {
        prompt: "Why focus on your first ten customers?",
        options: [
          "Ten is enough to make a big profit",
          "Bigger numbers are impossible to reach",
          "They teach you the most about what really works",
        ],
        correct: 2,
        explanation:
          "Early customers give detailed, honest feedback that shapes everything you do next.",
      },
      {
        prompt: "Where should you look for your first customers?",
        options: [
          "Random places with lots of people",
          "Where your customers already gather",
          "Only inside your own household",
        ],
        correct: 1,
        explanation:
          "Going where the problem already lives is faster than trying to attract people from scratch.",
      },
      {
        prompt: "What should you do when someone says no?",
        options: [
          "Thank them and ask what held them back",
          "Keep arguing until they agree",
          "Ignore it and move on",
        ],
        correct: 0,
        explanation: "A polite follow-up turns a no into useful information.",
      },
    ],
  },
];
