# VentureNova PRD: 4-day MVP launch sprint

**One-liner:** VentureNova is the AI startup coach for teen founders.
**Status:** v1, Oct 6 2026. **Owner:** Paarth. **Stack:** see "Build rules".

## Problem
Teens (12-18) have business ideas but no structure. Generic checklists let them click through lessons without ever testing the idea on a real person, so "progress" means nothing.

## Users
- **Primary:** students 12-18 with a business idea, using it free, alone or in a class.
- **Secondary:** teachers and club advisors (FBLA, intro to business) who share the link, and parents.
- **Hard constraint:** nothing in the product involves users paying.

## Sprint goal
A teacher shows VentureNova to **20-60 students in one class**, and each one gets through the core loop with no blocking bugs and the AI budget intact.

**Success (within 7 days of the class):**
- >= 70% of signups create a venture
- >= 50% pass at least one lesson
- >= 30% log at least one task, interview or hypothesis
- 0 blocking bugs; AI spend under $10; signup to dashboard in under 60 seconds

## Core loop (built, must stay solid)
Sign up (name, email, password, no verification) -> describe a venture -> roadmap for its type -> lessons + quiz (passing a stage's lessons advances the stage) -> real-world tasks with evidence -> AI coach -> validation (interviews, hypotheses, evidence) -> progress, health score and next best action.

## In scope: sprint work
**P0 (must ship)**
1. **Class-day readiness:** works on school Chromebooks and Wi-Fi (test the site is not blocked); Supabase kept awake or upgraded (free tier pauses after ~7 days idle); coach daily cap lowered from 80 to 30 messages per student.
2. **Error monitoring:** know within minutes when something breaks in production (Vercel or Sentry).
3. **First-run experience:** a new student with zero ventures sees a clear 3-step start, not an empty dashboard.
4. **Feedback loop:** an in-app "Report a problem / suggest something" form saved to a table the admin can read.
5. **Basic usage analytics:** count signup, venture created, lesson passed, task done, coach message, stored in Supabase (no third-party trackers).

**P1 (if time allows)**
6. **Class code:** a teacher creates a code, students join it, and the teacher sees a read-only roster with progress. Joining is opt-in by the student.
7. **Tasks linked to evidence:** "Interview 5 people" can only be marked done once 5 interviews are logged.

## Out of scope
Payments or paid plans, native apps, parent accounts, comments or social feeds, public gallery or leaderboards, multiple languages, custom branding per school.

## Build rules (for Claude Code)
- Next.js 16 App Router, TypeScript, Tailwind v4 with the tokens in `globals.css`, Biome. Import alias `~/`.
- Read env only through `src/env.ts`. Schema changes only via `npx supabase migration new`, with RLS, one policy per operation and role, never `FOR ALL`. See `CLAUDE.md` and `.claude/rules/`.
- Content lives in code: `src/content/` (50 lessons, 25 tasks, roadmaps per venture type).
- Verify before shipping: `npx tsc --noEmit` and `npx biome check src/`.

## Safety and privacy (non-negotiable; users are minors)
- Collect first name and email only. Never show names, emails, interviews or evidence on public pages. Public founder pages are opt-in and `noindex`.
- The coach never gives personal financial, tax, loan or legal advice and never writes the founder's work for them.
- Admin access is read-only, and every view of private content is written to `admin_access_log`.

## Plan
- **Day 1:** P0.1 and P0.2. **Day 2:** P0.3 and P0.4. **Day 3:** P0.5, then P1 items. **Day 4:** dry run with 5 real students, fix the top issues, hand the link to the teacher.

## Risks and open questions
- Under-13 users and US child-privacy rules (COPPA): get legal advice before a large push.
- No email verification means spam or fake signups are possible. Add a bot-check if they appear.
- AI cost spikes: $10 monthly cap; raise it before a big class.
- Terms and Privacy pages are drafts and need review.
