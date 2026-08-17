/* The group's rhythm, derived rather than hand-maintained.
 *
 * 1st, 2nd, 3rd Monday  -> regular meeting, 6:45–8:30 PM
 * 4th Monday            -> off
 * 5th Monday (when the month has one) -> optional social outing
 *
 * Because it's computed from the calendar, nobody has to remember to add next
 * year's dates.
 */

const MEET_START = { h: 18, m: 45 };
const MEET_END = { h: 20, m: 30 };

/** Every Monday in the given month, in order. */
function mondaysIn(year, month) {
  const out = [];
  const d = new Date(year, month, 1);
  d.setDate(d.getDate() + ((8 - d.getDay()) % 7)); // advance to the first Monday
  while (d.getMonth() === month) {
    out.push(new Date(d));
    d.setDate(d.getDate() + 7);
  }
  return out;
}

export const keyOf = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

/** Occurrences for one month, including the off week so it shows on the calendar. */
export function monthSchedule(year, month) {
  return mondaysIn(year, month).map((date, i) => {
    const type = i < 3 ? 'meeting' : i === 3 ? 'off' : 'social';
    const start = new Date(date);
    start.setHours(MEET_START.h, MEET_START.m, 0, 0);
    const end = new Date(date);
    end.setHours(MEET_END.h, MEET_END.m, 0, 0);
    return { key: keyOf(date), date, start, end, type, ordinal: i + 1 };
  });
}

/** A rolling window of occurrences, `months` deep, starting from `from`. */
export function upcoming(from = new Date(), months = 10) {
  const out = [];
  const cursor = new Date(from.getFullYear(), from.getMonth(), 1);
  for (let i = 0; i < months; i++) {
    out.push(...monthSchedule(cursor.getFullYear(), cursor.getMonth()));
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return out;
}

/** The next thing on the calendar — a meeting or social, never an off week.
 *  A meeting counts as "next" until it actually ends, so the app doesn't jump
 *  ahead to next month while everyone is still sitting in the living room. */
export function nextGathering(now = new Date()) {
  return upcoming(now, 12).find((o) => o.type !== 'off' && o.end >= now) || null;
}

/** The most recent meeting that has already happened — the sensible default
 *  when someone opens the notes page to write up a discussion. */
export function lastMeeting(now = new Date()) {
  const past = upcoming(new Date(now.getFullYear(), now.getMonth() - 3, 1), 6)
    .filter((o) => o.type === 'meeting' && o.end < now);
  return past[past.length - 1] || null;
}

const DATE_FMT = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
const SHORT_FMT = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

export const fmtDate = (d) => DATE_FMT.format(d);
export const fmtShort = (d) => SHORT_FMT.format(d);
export const fmtTime = () => '6:45 – 8:30 PM';

export function labelFor(occ) {
  if (occ.type === 'off') return 'Off week';
  if (occ.type === 'social') return 'Social outing';
  return ['First', 'Second', 'Third'][occ.ordinal - 1] + ' Monday';
}

/** Plain-language countdown for the dashboard: "tonight", "in 3 days", etc. */
export function countdown(occ, now = new Date()) {
  if (!occ) return '';
  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const days = Math.round((startOfDay(occ.date) - startOfDay(now)) / 86400000);
  if (days < 0) return 'happening now';
  if (days === 0) return occ.end < now ? 'wrapped up tonight' : 'tonight';
  if (days === 1) return 'tomorrow';
  if (days < 7) return `in ${days} days`;
  if (days < 14) return 'next week';
  return `in ${Math.round(days / 7)} weeks`;
}

/** Downloadable .ics so people can put the whole rhythm on their own calendar. */
export function toICS(occurrences, title = 'Newlyweds Small Group') {
  const stamp = (d) =>
    d.getFullYear() +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0') + 'T' +
    String(d.getHours()).padStart(2, '0') +
    String(d.getMinutes()).padStart(2, '0') + '00';

  const events = occurrences
    .filter((o) => o.type !== 'off')
    .map((o) =>
      [
        'BEGIN:VEVENT',
        `UID:${o.key}@christcovenant-newlyweds`,
        `DTSTART:${stamp(o.start)}`,
        `DTEND:${stamp(o.end)}`,
        `SUMMARY:${o.type === 'social' ? title + ' — Social' : title}`,
        'END:VEVENT',
      ].join('\r\n')
    );

  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Christ Covenant//Newlyweds//EN', ...events, 'END:VCALENDAR'].join('\r\n');
}
