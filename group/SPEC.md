# Newlyweds Small Group — App Spec

Christ Covenant · led by Jason & Meredith Malec · 9 couples, 18 people.

This folder is the **source of truth** for the group's roster and meeting
rhythm. The app itself is built in Lovable (React + Tailwind + shadcn/ui) on a
Supabase backend; this spec is what was handed to it, kept in git so the data
and the rules survive independently of any one platform.

- `assets/roster.js` — every name, cell, email, and couple grouping
- `assets/schedule.js` — meeting-date logic, derived from the calendar
- `assets/photos/` — couple photos, named by couple id

**Live app:** [The Covenant Connect](https://lovable.dev/projects/3b91ede3-ee96-40d2-b053-51637687772a) (Lovable project `3b91ede3-ee96-40d2-b053-51637687772a`)

---

## The group

| | |
|---|---|
| **Meets** | 1st, 2nd, and 3rd Mondays |
| **Time** | 6:45 – 8:30 PM |
| **4th Monday** | Off |
| **5th Monday** | Optional social outing, when the month has one |

Meeting dates are **computed, never hand-entered**. A month's Mondays are
enumerated in order: #1–#3 are meetings, #4 is the off week (still shown on the
calendar, marked off, so nobody turns up), #5 is a social.

## The roster

Nine couples, listed in roster order. Photo filenames match the couple `id`.

| Couple | Husband | Wife | Photo |
|---|---|---|---|
| Popp | Josh · (616) 649-5306 · joshlizziepopp@gmail.com | Lizzie · (734) 807-2421 · lizzie.lietaert@gmail.com | `popp.jpg` |
| Sanderfer | Christian · (402) 770-8649 · csanderfer21@gmail.com | Laura · (615) 587-3201 · laura.duncan.216@gmail.com | `sanderfer.jpg` |
| Matistic | Ben · (404) 394-4668 · Benmatistic15@gmail.com | Callye Ann · (706) 616-4662 · callyeann@gmail.com | **needed** |
| Braddy | Cooper · (678) 628-5753 · aucooper10@gmail.com | Kelley · (678) 674-8040 · kelleyhcantrell@gmail.com | `braddy.jpg` |
| Tsang | Michael · (540) 230-1185 · mcftsang@gmail.com | Abigail · (704) 728-6833 · agpeck28@gmail.com | `tsang.jpg` |
| Keyes | Thomas · (865) 809-8966 · thomaskeyes25@gmail.com | Holly · (865) 385-1174 · hollyhagood98@gmail.com | **needed** |
| Whitmire | Ben · (770) 707-6492 · benwhitmire1@gmail.com | Libby · *cell needed* · libbystipppuffer@gmail.com | `whitmire.jpg` |
| Walker | Connor · (470) 201-7557 · connorreedwalker@gmail.com | Kennison · (912) 227-3707 · kennison.blackerby@gmail.com | `walker.jpg` |
| Malec *(leaders)* | Jason · (404) 395-1584 · jason.malec@gmail.com | Meredith · (404) 395-1650 · meredithmalec@gmail.com | `malec.jpg` |

**Outstanding:** photos for the Matistics and the Keyeses (neither couple made
the first gathering), and Libby Whitmire's cell number.

## Access & privacy

The app holds 18 people's cell numbers alongside their prayer requests, so it is
never public.

- **Sign-in:** Supabase magic link — you type your email, click the link, you're
  in. No passwords to set, forget, or reset.
- **Allowlist:** only the 18 roster addresses can complete sign-in. Someone who
  finds or is forwarded the URL gets nowhere without an invited inbox.
- **Prayer requests are visible to the whole group** — that was an explicit
  call. Not leaders-only.
- **Leaders** (Jason & Meredith) can edit the roster and remove any post; that
  is the only elevated permission.
- **Two ways in.** Tap the emailed link, *or* type the 6-digit code from the
  same email straight into the app. The code path exists because tapping a
  magic link on a phone often opens a different browser than the one you
  started in, which silently drops the session — a large share of "the link
  didn't work" reports are exactly that. Typing six digits into the app you
  already have open avoids the problem, and works even if the redirect URLs
  are misconfigured.
- Row-level security on every table: signed-in members read group content,
  authors edit their own, leaders override.
- `anon` has **no table grants at all**, so an anonymous request is refused at
  the permission layer before RLS is consulted. RLS is the second line of
  defense rather than the only one — a future table added without RLS still
  won't leak.
- `noindex` plus the repo-wide `robots.txt` keep it out of search results.

### One-time backend setting

Supabase auth URLs live in project settings, not in code or migrations, so they
have to be set by hand once:

- **Site URL** → the app's own URL (it ships defaulted to `localhost:3000`,
  which sends every sign-in link to a server that isn't there)
- **Redirect URLs** → add the preview URL, and the published URL once published

List those URLs explicitly. A `https://*.lovable.app/**` wildcard would let a
sign-in token be delivered to any app on that shared domain, which is not a
trade worth making for something holding eighteen people's phone numbers.

### Verified, not assumed

Checked by querying the database directly rather than trusting the build
summary: 14 tables, RLS on all 14, all 42 policies scoped to `authenticated`,
every INSERT gated by `is_member() AND author_id = auth.uid()` (which also stops
posting under someone else's name), `group-media` bucket private, zero `anon`
grants, roster seeded 18/18 with the allowlist matching and no strays.

## Features

**Profiles** — a card per couple: photo, both names, tap-to-call cells,
tap-to-email addresses, wedding date, how they met, and a short "about us" each
couple maintains themselves.

**Calendar** — auto-generated dates with the off weeks and socials marked. Each
person RSVPs yes/no; the meeting shows who's coming. Host and snack are assigned
per meeting so it isn't a group text every month. One-tap `.ics` export puts the
whole rhythm on a personal calendar.

**Prayer requests** — anyone posts a request or a praise. Others tap "I prayed
for this" (shows a count, not a leaderboard) and leave short encouragements.
Requests can be marked answered, which moves them to an "answered" view worth
scrolling back through.

**Discussion notes** — notes attach to a specific meeting date, with the passage
and topic. Anyone can add; everyone can read. The archive doubles as the record
of what the group has worked through.

**Resource library** — books, podcasts, articles, sermons. Whoever suggests it
says why in a sentence. Upvotes and comments so good ones surface.

**Group feed** — photos and short posts between meetings. Reactions and
comments. This is the "interact socially" piece.

**Dashboard** — next gathering with a plain-language countdown ("tonight", "in
3 days"), who's hosting, unanswered prayer requests, and recent activity.

## Design

Warm and unfussy, not corporate SaaS and not a stock church template. Deep ink
navy, warm cream, muted brass accent. A serif for headings, clean sans for
everything else. Mobile-first — this gets opened on a phone from a couch.
