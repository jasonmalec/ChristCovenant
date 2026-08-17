/* Roster for the Christ Covenant newlyweds small group.
 *
 * This is the one file to edit when someone joins, leaves, or changes a number.
 * Everything else in the app reads from here.
 *
 * `photo` is a path relative to assets/photos/. If the file isn't there yet the
 * app quietly falls back to a monogram avatar, so a missing photo never breaks
 * a page — it just looks a little plainer.
 */

export const GROUP = {
  name: 'Newlyweds Small Group',
  church: 'Christ Covenant',
  leaders: 'Jason & Meredith Malec',
  meetsWhat: '1st, 2nd & 3rd Mondays',
  meetsWhen: '6:45 – 8:30 PM',
  // 4th Monday is intentionally off. A 5th Monday, when the calendar gives us
  // one, is an optional social outing rather than a regular meeting.
  offWeekNote: '4th Monday off',
  fifthWeekNote: '5th Monday — social outing (optional)',
};

export const COUPLES = [
  {
    id: 'popp',
    couple: 'Josh & Lizzie Popp',
    photo: 'popp.jpg',
    people: [
      { first: 'Josh', last: 'Popp', phone: '(616) 649-5306', email: 'joshlizziepopp@gmail.com' },
      { first: 'Lizzie', last: 'Popp', phone: '(734) 807-2421', email: 'lizzie.lietaert@gmail.com' },
    ],
  },
  {
    id: 'sanderfer',
    couple: 'Christian & Laura Sanderfer',
    photo: 'sanderfer.jpg',
    people: [
      { first: 'Christian', last: 'Sanderfer', phone: '(402) 770-8649', email: 'csanderfer21@gmail.com' },
      { first: 'Laura', last: 'Sanderfer', phone: '(615) 587-3201', email: 'laura.duncan.216@gmail.com' },
    ],
  },
  {
    id: 'matistic',
    couple: 'Ben & Callye Ann Matistic',
    photo: 'matistic.jpg',
    people: [
      { first: 'Ben', last: 'Matistic', phone: '(404) 394-4668', email: 'Benmatistic15@gmail.com' },
      { first: 'Callye Ann', last: 'Matistic', phone: '(706) 616-4662', email: 'callyeann@gmail.com' },
    ],
  },
  {
    id: 'braddy',
    couple: 'Cooper & Kelley Braddy',
    photo: 'braddy.jpg',
    people: [
      { first: 'Cooper', last: 'Braddy', phone: '(678) 628-5753', email: 'aucooper10@gmail.com' },
      { first: 'Kelley', last: 'Braddy', phone: '(678) 674-8040', email: 'kelleyhcantrell@gmail.com' },
    ],
  },
  {
    id: 'tsang',
    couple: 'Michael & Abigail Tsang',
    photo: 'tsang.jpg',
    people: [
      { first: 'Michael', last: 'Tsang', phone: '(540) 230-1185', email: 'mcftsang@gmail.com' },
      { first: 'Abigail', last: 'Tsang', phone: '(704) 728-6833', email: 'agpeck28@gmail.com' },
    ],
  },
  {
    id: 'keyes',
    couple: 'Thomas & Holly Keyes',
    photo: 'keyes.jpg',
    people: [
      { first: 'Thomas', last: 'Keyes', phone: '(865) 809-8966', email: 'thomaskeyes25@gmail.com' },
      { first: 'Holly', last: 'Keyes', phone: '(865) 385-1174', email: 'hollyhagood98@gmail.com' },
    ],
  },
  {
    id: 'whitmire',
    couple: 'Ben & Libby Whitmire',
    photo: 'whitmire.jpg',
    people: [
      { first: 'Ben', last: 'Whitmire', phone: '(770) 707-6492', email: 'benwhitmire1@gmail.com' },
      // Libby's cell wasn't on the roster sheet — drop it in here when you have it.
      { first: 'Libby', last: 'Whitmire', phone: '', email: 'libbystipppuffer@gmail.com' },
    ],
  },
  {
    id: 'walker',
    couple: 'Kennison & Connor Walker',
    photo: 'walker.jpg',
    people: [
      { first: 'Connor', last: 'Walker', phone: '(470) 201-7557', email: 'connorreedwalker@gmail.com' },
      { first: 'Kennison', last: 'Walker', phone: '(912) 227-3707', email: 'kennison.blackerby@gmail.com' },
    ],
  },
  {
    id: 'malec',
    couple: 'Jason & Meredith Malec',
    photo: 'malec.jpg',
    leaders: true,
    people: [
      { first: 'Jason', last: 'Malec', phone: '(404) 395-1584', email: 'jason.malec@gmail.com' },
      { first: 'Meredith', last: 'Malec', phone: '(404) 395-1650', email: 'meredithmalec@gmail.com' },
    ],
  },
];

/* Flat list of individuals, each tagged with the couple they belong to.
 * Used by the "who are you?" picker and anywhere a single person is named. */
export const PEOPLE = COUPLES.flatMap((c) =>
  c.people.map((p) => ({
    ...p,
    id: `${c.id}:${p.first.toLowerCase().replace(/\s+/g, '')}`,
    coupleId: c.id,
    couple: c.couple,
    leader: !!c.leaders,
    name: `${p.first} ${p.last}`,
    initials: (p.first[0] + p.last[0]).toUpperCase(),
  }))
);

export const personById = (id) => PEOPLE.find((p) => p.id === id) || null;
export const coupleById = (id) => COUPLES.find((c) => c.id === id) || null;
