import type { Lesson } from "./types";

export const growthLessons: Lesson[] = [
  {
    slug: "grow-marketing",
    stage: "growth",
    title: "Marketing basics: message, channel, offer",
    minutes: 4,
    appliesTo: "all",
    summary:
      "Help the right people find out about you, and why they should care.",
    reading: `**Marketing** is helping the right people learn about you and why they should care. It comes down to three things.

## 1. Message

What you say. Lead with the **benefit,** in your customers' own words.

## 2. Channel

Where you say it: school flyers, Instagram, a local group, email, or simply word of mouth. Choose **one or two** channels where your customers already spend time, and do them well. Doing five things badly beats nothing, but doing two things well beats five.

## 3. Offer

What you want people to do, and why now. A clear **call to action** helps: "Message me to book a free trial session."

## Test cheaply

Try one flyer or one post, and track what happens. When a new customer arrives, ask: **"How did you hear about us?"** The answers tell you which channel works.

## Keep it honest

- Do not make false claims or fake reviews.
- Follow each platform's rules, including age limits and advertising rules.
- Ask permission before using anyone's photo.

## Be consistent

Regular, steady marketing beats occasional bursts. A weekly post or a monthly flyer drop builds momentum.`,
    apply:
      "What is the main message for {name}, which one or two channels would you use, and what is your call to action?",
    quiz: [
      {
        prompt: "What are the three basics of marketing in this lesson?",
        options: [
          "Message, channel, and offer",
          "Logo, color, and font",
          "Price, place, and luck",
        ],
        correct: 0,
        explanation:
          "You need to know what to say, where to say it, and what you want people to do.",
      },
      {
        prompt: "Why choose only one or two channels?",
        options: [
          "Platforms only allow two",
          "You can do them well, where your customers already are",
          "More channels never help",
        ],
        correct: 1,
        explanation:
          "Focusing on a couple of channels lets you do them well instead of spreading yourself thin.",
      },
      {
        prompt: "How do you learn which channel works?",
        options: [
          "Guess based on your favorite app",
          "Always pick the trendiest platform",
          "Ask new customers how they heard about you and track it",
        ],
        correct: 2,
        explanation:
          "Customers can tell you directly where they found you, which is real evidence.",
      },
    ],
  },
  {
    slug: "grow-word-of-mouth",
    stage: "growth",
    title: "Word of mouth and referrals",
    minutes: 3,
    appliesTo: "all",
    summary: "Make it easy and natural for happy customers to bring others.",
    reading: `Most early growth comes from people telling other people. You can make that happen on purpose.

## Earn it first

Deliver something worth talking about. Fix problems quickly. Happy customers refer friends without being asked.

## Ask at the right time

Ask right after a customer has a good result: **"Do you know anyone else who might like this?"** Do not wait months.

## Make sharing easy

Give people a simple link or a short message they can forward. If sharing takes effort, most people will not do it.

## Say thank you or reward fairly

A thank-you note, or a small discount for both the person who refers and the new customer, can encourage referrals. Keep it honest and fair.

## Collect testimonials

Ask happy customers if you can share their kind words. Always ask permission before using someone's name or photo, and be extra careful with information about kids.

## Show real results

Before-and-after stories and honest photos, used with permission, are very convincing.

## Never fake it

Fake reviews or made-up testimonials are dishonest, and they can wreck your reputation if people find out.

## Be part of the community

Help people in the groups where your customers hang out. Being useful before you sell builds trust.`,
    apply:
      "Write the exact sentence you would use to ask a happy customer of {name} to refer a friend.",
    quiz: [
      {
        prompt: "When is the best moment to ask for a referral?",
        options: [
          "Right after a customer has a good result",
          "Before they have tried it",
          "Months later",
        ],
        correct: 0,
        explanation:
          "People are happiest and most willing to share right after something goes well.",
      },
      {
        prompt: "What does making sharing easy mean?",
        options: [
          "Requiring customers to fill out a long form",
          "Giving them a simple link or message they can forward",
          "Keeping your contact details private",
        ],
        correct: 1,
        explanation:
          "The easier it is to share, the more people will actually do it.",
      },
      {
        prompt: "What is wrong with faking reviews?",
        options: [
          "Nothing, everyone does it",
          "It is required to rank on platforms",
          "It is dishonest and damages trust",
        ],
        correct: 2,
        explanation:
          "Fake reviews mislead customers and can destroy your reputation.",
      },
    ],
  },
  {
    slug: "grow-brand-story",
    stage: "growth",
    title: "Brand and storytelling",
    minutes: 4,
    appliesTo: "all",
    summary: "Be easy to remember and easy to trust.",
    reading: `Your **brand** is what people think and feel when they hear your name. It is built by what you do consistently: your name, your look, your voice, your quality, and how you treat people.

## Stories stick

People remember stories much better than facts. Your **founder story** can be simple: why you care about this problem. "I struggled to find study partners in 10th grade, so I built a way to find them."

## A simple story structure

> **Problem**, then **struggle**, then **solution**, then **result.**

## Brand basics

- **A clear name.** Easy to say and spell. Check that it is not already taken, and that it is not too close to someone else's.
- **Consistent colors and fonts** so people recognize you.
- **A voice.** Friendly, serious, funny? Pick one and keep it.
- **A one-line tagline** that says what you do.

## Consistency builds trust

When your posts, packaging, and messages all feel like the same person, people trust you more. Real photos and real stories (with permission) beat stock images.

## The most important part

A brand is a promise. **Keep it.** A great logo cannot make up for broken promises.

Before you commit to a name, search for it online and check that the website address and social handles are available.`,
    apply:
      "Write the two-sentence founder story for {name}: what problem did you notice, and why do you care?",
    quiz: [
      {
        prompt: "What is a brand mostly?",
        options: [
          "What people think and feel about you from consistent experiences",
          "Only a logo",
          "A legal document",
        ],
        correct: 0,
        explanation:
          "A brand grows from everything you do repeatedly, not just how it looks.",
      },
      {
        prompt: "Which is a simple story structure?",
        options: [
          "Price, discount, deadline",
          "Problem, struggle, solution, result",
          "Rules, laws, warnings",
        ],
        correct: 1,
        explanation:
          "Problem, struggle, solution, result is easy to follow and easy to remember.",
      },
      {
        prompt: "Why check a name before committing to it?",
        options: [
          "Longer names are always better",
          "Names never matter",
          "To confirm it is easy to say and not already taken or too similar",
        ],
        correct: 2,
        explanation:
          "A name that is clear and available avoids confusion and legal problems later.",
      },
    ],
  },
  {
    slug: "grow-pitch",
    stage: "growth",
    title: "Pitching your venture",
    minutes: 4,
    appliesTo: "all",
    summary: "Explain what you do, with proof, in under two minutes.",
    reading: `A **pitch** is a short, clear explanation of your venture to someone you want something from: a customer, a parent, a mentor, a teacher, or a sponsor.

## A 60 to 90 second structure

1. **Hook:** a surprising fact or a short story that gets attention.
2. **Problem:** who has it, and how much it hurts.
3. **Solution:** what you do, in simple words.
4. **Proof:** evidence from your work. This is where your interviews, tests, and sales pay off.
5. **Ask:** exactly what you want. Feedback? A first order? A spot at an event? A mentor?

## Tips

- **Evidence beats adjectives.** "Seven of ten students I interviewed struggled to find partners" is stronger than "this is a huge, amazing opportunity."
- **Practice out loud,** ideally in front of someone, and record yourself.
- Keep any slides to a minimum, or skip them.
- **Speak to one person,** even when there are several.
- **End clearly** with your ask.

## Handling questions

Say "good question" and answer honestly. If you do not know, say "I don't know yet, here is how I will find out." That is a great answer.

Pitching is a skill. It gets better with repetition.`,
    apply:
      "Write a five-part, 60-second pitch for {name}: hook, problem, solution, proof, and ask.",
    quiz: [
      {
        prompt: "What makes a pitch most convincing?",
        options: [
          "Evidence like customer quotes and numbers",
          "Big, exciting adjectives",
          "Long slides with lots of text",
        ],
        correct: 0,
        explanation:
          "Real evidence from your work is much more persuasive than claims.",
      },
      {
        prompt: "How should you end a pitch?",
        options: [
          "With a long apology",
          "With a clear ask of what you want from the listener",
          "With silence",
        ],
        correct: 1,
        explanation: "A clear ask tells listeners exactly how they can help.",
      },
      {
        prompt:
          "What should you do if you do not know the answer to a question?",
        options: [
          "Make up a confident-sounding answer",
          "Quickly change the subject",
          "Admit it and explain how you will find out",
        ],
        correct: 2,
        explanation:
          "Honesty builds trust, and a plan to find out shows you take it seriously.",
      },
    ],
  },
];
