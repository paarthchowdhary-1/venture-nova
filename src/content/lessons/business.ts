import type { Lesson } from "./types";

export const businessLessons: Lesson[] = [
  {
    slug: "biz-pricing",
    stage: "business",
    title: "Revenue and pricing basics",
    minutes: 4,
    appliesTo: "all",
    summary:
      "Find a price that covers your costs and fits what customers value.",
    reading: `**Revenue** is the money that comes in. **Pricing** decides how much you charge for each sale.

## Three ways to think about a price

- **Cost-plus:** your cost to deliver, plus a markup for profit.
- **Competitor-based:** what similar options charge.
- **Value-based:** what the result is worth to your customer.

Check all three. Your **cost** is the floor, since charging less than that loses money. What customers will pay is the ceiling.

## Ask customers

Try the questions: "At what price would this feel too expensive?" and "At what price would you start to doubt the quality?" The answers give you a range.

## Do not default to the cheapest

A very low price can signal low quality and often leaves no profit. Competing on price alone is hard, because someone can always go lower.

## Practical tips

- Offer clear **packages** so customers can choose.
- It is easier to start a little higher and offer a discount than to raise prices later.
- Be clear about exactly what is included.
- Remember that **your time has value,** too.

Pricing is something you test and adjust, not a decision you make once.`,
    apply:
      "What are your costs to deliver {name} once? What range of prices do you think customers would accept?",
    quiz: [
      {
        prompt: "What is the lowest sensible price for something you sell?",
        options: [
          "Your cost to deliver it",
          "Zero",
          "Whatever competitors charge",
        ],
        correct: 0,
        explanation:
          "Charging below your cost means losing money on every sale.",
      },
      {
        prompt: "What does value-based pricing look at?",
        options: [
          "Only your costs",
          "How much the result is worth to the customer",
          "The lowest price in town",
        ],
        correct: 1,
        explanation:
          "It sets the price based on the benefit the customer receives.",
      },
      {
        prompt: "Why should you not always be the cheapest?",
        options: [
          "Customers dislike saving money",
          "It is usually illegal",
          "It can leave no profit and signal low quality",
        ],
        correct: 2,
        explanation:
          "Very low prices squeeze your profit and can make people doubt the quality.",
      },
    ],
  },
  {
    slug: "biz-costs-margins",
    stage: "business",
    title: "Costs and profit margins",
    minutes: 4,
    appliesTo: "all",
    summary: "Know exactly what each sale costs you and what you keep.",
    reading: `**Profit = revenue minus costs.** To know whether you are really making money, you need to track both.

## Two kinds of cost

- **Fixed costs:** stay the same no matter how much you sell, like a monthly website fee.
- **Variable costs:** grow with each sale, like materials, packaging, shipping, and payment fees.

## Margin

Your **margin** is the profit on each sale divided by the price.

Example: you sell a bracelet for $10. Materials and packaging cost $4, and the payment fee is $0.60. Your profit is $5.40, so your margin is 54 percent.

## Count everything

Include all the small costs: payment processing fees, shipping, tools, returns, and the value of your own time, even if you are not paying yourself yet.

## Break-even

**Break-even** is how many sales you need to cover your fixed costs.

> Break-even = fixed costs divided by profit per sale

If you spend $50 on a setup cost and earn $5 profit per bracelet, you need 10 sales to break even.

## Good habits

Record every sale and every expense in a simple spreadsheet. Do not spend money ahead of sales, and ask a parent or guardian for help with money decisions.`,
    apply:
      "List the costs of delivering {name} once. Which are fixed, and which are variable?",
    quiz: [
      {
        prompt: "What does profit equal?",
        options: [
          "Revenue minus costs",
          "Revenue plus costs",
          "Price times two",
        ],
        correct: 0,
        explanation:
          "Profit is what is left after you subtract all your costs from the money that came in.",
      },
      {
        prompt: "Which is a variable cost?",
        options: [
          "A monthly website fee",
          "The materials for each item you sell",
          "A one-time domain registration",
        ],
        correct: 1,
        explanation:
          "Variable costs rise as you sell more, like materials for every item.",
      },
      {
        prompt:
          "Fixed costs are $50 and you earn $5 profit per sale. What is break-even?",
        options: ["5 sales", "50 sales", "10 sales"],
        correct: 2,
        explanation:
          "50 divided by 5 is 10, so you need 10 sales to cover the fixed costs.",
      },
    ],
  },
  {
    slug: "biz-unit-economics",
    stage: "business",
    title: "Unit economics: does each sale make sense?",
    minutes: 4,
    appliesTo: "all",
    summary: "Check that you make money on a single customer before you grow.",
    reading: `**Unit economics** looks at the money you make or lose on **one sale** or **one customer.** It tells you whether the business works before you try to grow it.

## Key numbers

- **Revenue per customer:** what they pay you.
- **Cost to serve:** what it costs to make or deliver.
- **Cost to get the customer:** what you spend to find and win them (flyers, ads, free samples, your time).
- **Lifetime value:** the total profit a customer brings over time, including repeat purchases.

## The healthy rule

The profit from a customer should be **bigger than the cost of getting them.**

Example: you spend $6 on flyers and samples to win a customer. They spend $20, and it costs you $8 to serve them. Profit is $12, minus $6 to win them, leaves $6. That works.

If winning that customer costs $15, you **lose** money on each one.

## How to fix weak unit economics

- Raise prices
- Lower costs
- Find cheaper ways to reach customers, like referrals
- Encourage repeat purchases

## Why check before you scale

Growing a business that loses money on each sale just loses money faster. Fix the single unit first.`,
    apply:
      "Estimate for {name}: what does it cost you to win one customer, and what profit do you make from them?",
    quiz: [
      {
        prompt: "What does unit economics look at?",
        options: [
          "Profit or loss on a single sale or customer",
          "The total size of the company",
          "How many employees you have",
        ],
        correct: 0,
        explanation:
          "It zooms in on one customer to check that each one is worth having.",
      },
      {
        prompt:
          "It costs more to win a customer than you earn from them. What should you do?",
        options: [
          "Grow faster to make up for it",
          "Fix pricing, costs, or how you find customers first",
          "Ignore the numbers",
        ],
        correct: 1,
        explanation:
          "Scaling a losing model only multiplies the losses. Fix it before growing.",
      },
      {
        prompt: "What is customer lifetime value?",
        options: [
          "The price of their first item",
          "How long a customer lives",
          "The total profit a customer brings over time",
        ],
        correct: 2,
        explanation:
          "It counts all the profit from repeat purchases, not just the first sale.",
      },
    ],
  },
  {
    slug: "biz-service-pricing",
    stage: "business",
    title: "Pricing a service",
    minutes: 4,
    appliesTo: ["service"],
    summary: "Price your time fairly using packages and realistic hours.",
    reading: `Services sell your **time and skill,** so pricing them has its own tricks.

## Common ways to price a service

- **Hourly rate:** simple, but it caps what you can earn.
- **Per session or job:** easy for customers to understand.
- **Package:** a bundle of sessions at one price.
- **Subscription:** a regular monthly fee for ongoing help.

## Count all your time

A one-hour tutoring session may take **an hour and a half** once you include preparing, messaging, and travel. Price based on your **total** time, not just the hour with the customer.

## Check what others charge

Look at what similar services in your area charge, then decide where you fit based on your experience and the results you deliver.

## Why packages help

A package such as "four sessions plus a progress check" lets customers commit to a result, and it gives you steadier income. A small discount for the bundle is a fair way to reward that.

## Limited hours

You cannot work unlimited hours. To earn more, you can raise your price as you improve, or serve small groups instead of one person at a time.

## Be clear on the details

Write down your cancellation policy and payment terms.

Ask a parent or guardian about any rules for young people earning money where you live, including taxes.`,
    apply:
      "How long does one {name} job really take, including prep and messages? What would a fair price per hour be?",
    quiz: [
      {
        prompt: "When pricing a service, what should you count?",
        options: [
          "Prep and communication time as well as delivery time",
          "Only the time spent with the customer",
          "Nothing, because your time is free",
        ],
        correct: 0,
        explanation:
          "The real time includes everything you do around the session.",
      },
      {
        prompt: "Why does a package price for several sessions help?",
        options: [
          "It always lowers your costs",
          "Customers commit to a result, and you get steadier income",
          "It removes the need to be paid",
        ],
        correct: 1,
        explanation:
          "Packages help customers stick with it and give you more predictable work.",
      },
      {
        prompt: "How can you earn more when your hours are limited?",
        options: [
          "Work through the night",
          "Cut your prices a lot",
          "Raise your price or teach small groups",
        ],
        correct: 2,
        explanation:
          "Higher prices or group sessions let you earn more without adding hours.",
      },
    ],
  },
  {
    slug: "biz-product-supply",
    stage: "business",
    title: "Suppliers, shipping, and inventory",
    minutes: 4,
    appliesTo: ["physical_product"],
    summary:
      "Get materials, make products, and deliver them without losing money.",
    reading: `Behind every product is a chain: where the materials come from, how it is made, and how it reaches the customer.

## Suppliers

- Compare **at least three.**
- Ask about prices at different quantities and the **minimum order.**
- Ask about quality, delivery time, and reliability.
- Order **samples** before a big order.
- Be careful with large upfront payments to anyone you do not know, and involve an adult. Offers that look too good to be true often are.

## Inventory

Stock ties up your money in items that may not sell. Start small, track what sells, and reorder when it does.

## Shipping

Think about weight, packaging, cost, and delivery time. Decide whether to build shipping into the price or charge for it separately. Good packaging protects your product and makes a great first impression.

## Count the real cost per item

**Landed cost** is the product cost plus shipping and fees to get it to you. Use it, not just the factory price, in your calculations.

## Plan for problems

Returns and damaged items will happen. Decide in advance how you will handle them.

Test your whole process with a few orders before you have many.`,
    apply:
      "List three suppliers or sources you could compare for {name}, and the questions you would ask each.",
    quiz: [
      {
        prompt: "Why order samples before a big order?",
        options: [
          "To check the quality before spending a lot",
          "To get free products",
          "It is required by law",
        ],
        correct: 0,
        explanation:
          "A sample lets you catch quality problems before you commit your money.",
      },
      {
        prompt: "What does landed cost include?",
        options: [
          "Only the factory price",
          "The product cost plus shipping and fees",
          "Only your selling price",
        ],
        correct: 1,
        explanation:
          "It adds the extra costs to get the item to you, giving a truer picture of what each item costs.",
      },
      {
        prompt: "Why can holding a lot of inventory be risky?",
        options: [
          "Products spoil instantly",
          "Customers dislike seeing stock",
          "Your money is tied up in items that may not sell",
        ],
        correct: 2,
        explanation:
          "Unsold stock means money you cannot use for anything else.",
      },
    ],
  },
  {
    slug: "biz-software-pricing",
    stage: "business",
    title: "Pricing software: free, freemium, subscription",
    minutes: 4,
    appliesTo: ["software"],
    summary: "Choose a pricing model that matches how customers get value.",
    reading: `Software is cheap to copy, so the way you charge matters a lot. Here are the common models.

## Pricing models

- **One-time purchase:** pay once and keep it.
- **Subscription:** pay monthly or yearly for ongoing access.
- **Freemium:** a free basic version, with paid upgrades.
- **Ads:** free for users, with advertisers paying. This needs lots of users and needs extra care about privacy, especially with kids.
- **Marketplace fee:** you take a small percentage of each transaction.

## Match the model to the value

If customers get value over time, a **subscription** often fits. If it is a one-off need, a **one-time** price may fit better.

## Free is not free

Free users still cost you money for servers and support. Make sure your paying users can cover that.

## Test willingness to pay early

Even a small charge teaches you far more than "I would pay for that" ever will.

## Who pays?

Is it the user, a parent, or a school? Pricing and messaging change with the buyer.

## Watch your costs

Hosting, tools, and payment fees add up.

If your app takes payments or data from minors, there are legal rules. Ask an adult or a professional for help before you launch.`,
    apply:
      "Which pricing model fits {name} best, and who would pay? Write one reason for your choice.",
    quiz: [
      {
        prompt: "What does freemium mean?",
        options: [
          "A free basic version with paid upgrades",
          "Everything is free forever",
          "Only a premium version exists",
        ],
        correct: 0,
        explanation:
          "Freemium gives away a basic version and charges for extra features.",
      },
      {
        prompt: "Why test charging early?",
        options: [
          "To make a quick profit",
          "It shows whether people value it enough to pay",
          "App stores require it",
        ],
        correct: 1,
        explanation:
          "People saying they would pay is not the same as paying. A real charge shows true value.",
      },
      {
        prompt: "Why can free users still matter to your costs?",
        options: [
          "They never cost you anything",
          "They magically pay twice",
          "They cost money for servers and support",
        ],
        correct: 2,
        explanation:
          "Every user uses resources, so you need paying customers or another income source to cover them.",
      },
    ],
  },
  {
    slug: "biz-nonprofit-funding",
    stage: "business",
    title: "How nonprofits get funded",
    minutes: 4,
    appliesTo: ["nonprofit"],
    summary:
      "Understand donations, grants, sponsors, and the rules around them.",
    reading: `Even a free program costs time and money. Here are common ways nonprofits and social ventures get funded.

## Sources of funding

- **Donations:** gifts from individuals, including small online gifts.
- **Grants:** money from foundations, governments, or companies. You apply for them, and they are competitive.
- **Sponsorships:** local businesses support an event or program in return for recognition.
- **Fundraising events:** bake sales, fun runs, and similar.
- **Earned income:** selling something related to your mission, like workshops or merchandise.
- **In-kind gifts:** donated supplies, space, or services instead of cash.

## Start with a budget

Write down what your project will cost. Separate what you **need** from what you would **like.**

## Be transparent

Tell supporters how their money is used, and report back on what happened. Thank people.

## Know the rules

Fundraising, charity registration, handling other people's money, and tax-deductible gifts depend on where you live. Involve an adult and a qualified advisor.

A **fiscal sponsor** is an established nonprofit that can manage money and legal matters for your project while you get started.

Do not promise tax receipts unless you are officially able to give them.`,
    apply:
      "Estimate what running {name} for one month would cost. Which funding source would you try first?",
    quiz: [
      {
        prompt: "What is a fiscal sponsor?",
        options: [
          "An established nonprofit that can manage money and legal items for your project",
          "A person who pays all your costs",
          "A type of bank loan",
        ],
        correct: 0,
        explanation:
          "A fiscal sponsor lets a new project operate under an established organization's umbrella.",
      },
      {
        prompt: "What is an in-kind donation?",
        options: [
          "A cash gift in an envelope",
          "Donated supplies, space, or services rather than cash",
          "A government fine",
        ],
        correct: 1,
        explanation:
          "In-kind gifts are things like supplies or a free venue instead of money.",
      },
      {
        prompt: "What should you do before raising money?",
        options: [
          "Promise everyone tax receipts",
          "Collect first and figure it out later",
          "Make a budget and check the rules with an adult",
        ],
        correct: 2,
        explanation:
          "A budget shows how much you need, and an adult can help you follow the fundraising rules.",
      },
    ],
  },
  {
    slug: "biz-legal",
    stage: "business",
    title: "Legal and tax basics for young founders",
    minutes: 5,
    appliesTo: "all",
    summary: "An awareness lesson on contracts, permits, taxes, and copying.",
    reading: `**This is general information, not legal advice.** Rules differ by country, state, and age, so always talk to a parent or guardian and a qualified professional, such as an accountant, a lawyer, or a school or community business program.

## Age and contracts

In many places, minors cannot sign certain binding contracts or open some accounts alone. An adult may need to co-sign or manage them for you.

## Permits and rules

Some activities need a **business license or permit.** Selling certain items, such as food, cosmetics, or products for children, comes with safety and labeling rules.

## Taxes

Money you earn may be taxable depending on how much you earn and where you live. Keep good records and ask an adult or accountant.

## Intellectual property

Do not copy other people's names, logos, music, or images without permission. Check that your business name is not already in use. A name or logo that is too close to someone else's can cause problems.

## Privacy

Collecting personal information, especially from kids, can be regulated. Collect as little as possible.

## Written agreements

Simple written agreements prevent misunderstandings, especially when working with other people.

## Safety and responsibility

Think about what could go wrong with physical activities or products, and ask about insurance and liability.

When in doubt, ask before you act.`,
    apply:
      "What are two legal or safety questions about {name} that you should ask a parent or professional?",
    quiz: [
      {
        prompt: "Who should you ask about legal and tax questions?",
        options: [
          "A parent or guardian and a qualified professional",
          "Anyone on the internet",
          "Nobody until a problem happens",
        ],
        correct: 0,
        explanation:
          "Rules vary, so a trusted adult and a qualified professional can give you advice that fits your situation.",
      },
      {
        prompt: "What is often true about minors and contracts?",
        options: [
          "Minors can always sign any contract",
          "Minors may not be able to sign certain binding contracts alone",
          "Contracts never apply to businesses",
        ],
        correct: 1,
        explanation:
          "Many places limit what minors can sign, so adults often need to be involved.",
      },
      {
        prompt: "Using someone else's logo or images without permission is...",
        options: [
          "fine if you change the colors",
          "a good way to look established",
          "risky because it can break intellectual property rules",
        ],
        correct: 2,
        explanation:
          "Other people's work is protected, so you need permission to use it.",
      },
    ],
  },
  {
    slug: "biz-money-records",
    stage: "business",
    title: "Keeping your money safe and your records tidy",
    minutes: 4,
    appliesTo: "all",
    summary:
      "Simple habits that protect you and show how you are really doing.",
    reading: `Good money habits early save huge headaches later.

## Keep business and personal money separate

With a parent or guardian, set up a separate account, envelope, or tracking system for your venture. It lets you see whether the business is truly making money.

## Record everything

Write down **every sale and expense, the same day:** the date, what it was, who it was with, and the amount. A spreadsheet works fine. Keep receipts, and take photos of them.

## Pay yourself on purpose

Do not take out every dollar you earn. Leave money in the business for costs, and decide on a set share to take out. Build a small **buffer** for surprises.

## Take payments safely

- Use reputable payment tools **with an adult.**
- Never share your passwords.
- Do not send money to people you do not know.

## Watch for scams

A common one: a stranger "accidentally" overpays you and asks you to send back the difference. The original payment later turns out to be fake. Be suspicious of anything urgent or too good to be true.

## Review monthly

Once a month, look at your income, expenses, profit, and cash left.

Avoid casual loans, borrowing, or lending, especially between friends.`,
    apply:
      "How will you separate and record the money for {name}? Which adult will help you set it up?",
    quiz: [
      {
        prompt: "Why separate business money from personal money?",
        options: [
          "It makes it clear whether the business is really making money",
          "Banks require it for kids",
          "It just looks nicer",
        ],
        correct: 0,
        explanation:
          "Mixing them makes it hard to see your real profit or loss.",
      },
      {
        prompt: "Which is a scam warning sign?",
        options: [
          "A customer pays the exact price",
          "A stranger overpays and asks you to send back the extra",
          "A friend buys one item",
        ],
        correct: 1,
        explanation:
          "Overpayment scams rely on you refunding money before the original payment turns out to be fake.",
      },
      {
        prompt: "How often should you record sales and expenses?",
        options: [
          "Once a year",
          "Only when someone asks",
          "The same day, or as soon as you can",
        ],
        correct: 2,
        explanation:
          "Recording right away means you do not forget details and you always know where you stand.",
      },
    ],
  },
];
