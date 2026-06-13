export interface EventDetail {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  teamSize: string;
  coordinators: Array<{ name: string; phone: string }>;
  theme?: string;
  rules: string[];
  judging?: string[];
}

export const GENERAL_EVENT_RULES = [
  'A valid institutional ID card is mandatory for campus entry.',
  'Only registered participants are permitted inside the campus.',
  'Collect the event wristband from the registration desk after fee verification.',
  'Attach payment proof while completing the registration form.',
  "The judges' decision is final and binding.",
  'Political, religious, and negative themes are strictly prohibited.',
];

export const EVENT_DETAILS: EventDetail[] = [
  {
    id: 1,
    slug: 'paper-presentation',
    title: 'Paper Presentation',
    category: 'Technical Event',
    description: 'Present original work in technology, innovation, or social impact before a technical jury.',
    date: '22 June 2026',
    time: '11:00 AM - 3:30 PM',
    venue: 'Sun Java*',
    teamSize: 'Solo or maximum 2 members',
    coordinators: [
      { name: 'Kishore Kumar R', phone: '9499971978' },
      { name: 'Narayan', phone: '6383644529' },
      { name: 'Izhan S', phone: '9952434424' },
    ],
    rules: [
      'Topics must relate to technology, innovation, or social impact.',
      'Submit an abstract of approximately 250 words before the deadline.',
      'Bring two hard copies and one soft copy on a USB drive.',
      'The soft copy must contain the presentation and may include the full paper.',
      'Presentation time is 5 minutes, followed by 2 minutes of Q&A.',
      'Plagiarism in any form results in immediate disqualification.',
      'Use PPT or PDF compatible with Microsoft PowerPoint 2016 or later.',
      'Name the file TeamName_PaperTitle_Magizh\'26.pptx.',
      'A participant may belong to only one team.',
      'Every team member must be present and participate in the presentation.',
      'Formal dress code is mandatory.',
      'Report at least 30 minutes before the scheduled slot.',
      'Misconduct, inappropriate content, or unprofessional behavior results in disqualification.',
      'Any AI-generated content must be disclosed and is subject to review.',
      'Bring required adapters or connectors when using a device other than USB.',
      'Participation certificates are provided to all valid entries.',
      'Send the abstract submission to mgryuva24@gmail.com.',
    ],
    judging: ['Relevance', 'Originality', 'Clarity', 'Visual appeal', 'Presentation skills', 'Q&A'],
  },
  {
    id: 2,
    slug: 'poster-designing',
    title: 'Poster Designing',
    category: 'Technical Event',
    description: 'Create a high-impact digital poster that connects the announced theme to a Sustainable Development Goal.',
    date: '22 June 2026',
    time: '11:00 AM - 1:00 PM',
    venue: 'Lab (TBD)',
    teamSize: 'Individual event',
    coordinators: [
      { name: 'Sanjai P A', phone: '9487826286' },
      { name: 'Yasmin Begum', phone: '6379973902' },
      { name: 'Santhosh Kumar', phone: '7550192905' },
    ],
    rules: [
      'The poster must reflect the theme and connect to at least one Sustainable Development Goal.',
      'Create the poster digitally on the event day using Canva, Photoshop, PowerPoint, or similar software.',
      'Include a creative slogan or tagline that supports the message.',
      'English, Tamil, or a combination of both may be used.',
      'Use meaningful visuals that clearly support the theme and concept.',
      'Copied, downloaded, watermarked, or AI-generated content is not allowed.',
      'Text must be bold, clear, and readable, with a minimum size of 16 pt.',
      'Submit a high-resolution JPG or PNG at 1080 x 1350 or 1920 x 1080.',
      'Include the participant name, class, department, and college name on or with the poster.',
    ],
    judging: ['Theme relevance', 'SDG connection', 'Originality', 'Visual communication', 'Readability'],
  },
  {
    id: 3,
    slug: 'shark-tank',
    title: 'Shark Tank',
    category: 'Technical Event',
    description: 'Pitch an original product, venture, or solution and defend its value before the judging panel.',
    date: '22 June 2026',
    time: '1:30 PM - 3:30 PM',
    venue: 'Lab (TBD)',
    teamSize: '2 to 4 members',
    coordinators: [
      { name: 'Yashvinthan', phone: '9789921988' },
      { name: 'Divya Sri', phone: '9488056318' },
      { name: 'Shivani', phone: '9384191284' },
    ],
    rules: [
      'Each team must contain 2 to 4 members.',
      'Each team receives a maximum of 5 minutes for its presentation.',
      'Teams are encouraged to support their pitch with a PowerPoint presentation.',
      'Ideas from every domain and discipline are welcome and considered equally.',
      'Plagiarism or replication of an existing project results in disqualification.',
      "The judges' decision is final and binding.",
    ],
    judging: ['Originality', 'Problem clarity', 'Feasibility', 'Pitch quality', 'Value proposition'],
  },
  {
    id: 4,
    slug: 'adaptune',
    title: 'Adaptune',
    category: 'Non-Technical Individual Event',
    description: 'Adapt your movement instantly as changing music tracks test rhythm, versatility, and stage control.',
    date: '22 June 2026',
    time: '1:30 PM - 3:30 PM',
    venue: 'Civil Smart*',
    teamSize: 'Solo event',
    coordinators: [
      { name: 'Tharun', phone: '8610944762' },
      { name: 'Abinesh', phone: '7806880604' },
      { name: 'Tharika', phone: '9080578059' },
      { name: 'Thrinethra', phone: '9360819288' },
    ],
    rules: [
      'This is a solo event.',
      'Music will be played for 2 minutes.',
      'Tracks will play one after another, and the participant must adapt their dance to each track.',
      'Matchsticks, cigarettes, and all other prohibited items are forbidden on stage.',
      'A pause longer than 8 seconds results in disqualification.',
      "The judges' decision is final.",
    ],
    judging: ['Adaptability', 'Rhythm', 'Continuity', 'Expression', 'Stage presence'],
  },
  {
    id: 5,
    slug: 'solo-singing',
    title: 'Solo Singing',
    category: 'Non-Technical Individual Event',
    description: 'Deliver a live solo vocal performance in any language or genre.',
    date: '22 June 2026',
    time: '11:00 AM - 1:00 PM',
    venue: 'Civil Smart*',
    teamSize: 'Solo event',
    coordinators: [
      { name: 'Keshini', phone: '8526755799' },
      { name: 'Swedha', phone: '9345731400' },
      { name: 'Hariz', phone: '8190000855' },
    ],
    rules: [
      'Performance duration is 3 minutes, with 1 additional minute for setup.',
      'Only one participant may perform.',
      'Songs may be in any language or genre.',
      'Backing tracks must not contain pre-recorded vocals or a lead melody.',
      'Explicit or offensive content is strictly prohibited.',
      'Bring any required backing track as an MP3 file on a pen drive.',
      'A basic microphone and sound system will be provided.',
      "The judges' decision is final.",
    ],
    judging: ['Vocal quality', 'Pitch and rhythm', 'Expression', 'Song selection', 'Stage presence'],
  },
  {
    id: 6,
    slug: 'group-dance',
    title: 'Group Dance',
    category: 'Non-Technical Group Event',
    description: 'Perform a coordinated three-minute group routine with energy, expression, and visual impact.',
    date: '22 June 2026',
    time: '11:00 AM - 1:00 PM',
    venue: 'Auditorium',
    teamSize: '3 to 7 members',
    coordinators: [
      { name: 'Geetha Priya', phone: '9003687798' },
      { name: 'Sharath Raj', phone: '7338996785' },
      { name: 'Rouxhana', phone: '9042788986' },
    ],
    rules: [
      'Each team must contain 3 to 7 members.',
      'The performance time limit is 3 minutes.',
      'Bring the performance track on a USB drive.',
      'All dance styles are allowed.',
      'Report at least 30 minutes before the scheduled slot.',
      'Matchsticks, cigarettes, and all other prohibited items are forbidden on stage.',
      "The judges' decision is final and binding.",
      'Political, religious, and negative themes are strictly prohibited.',
    ],
    judging: ['Choreography', 'Synchronization and coordination', 'Energy and expression', 'Costume and presentation'],
  },
  {
    id: 7,
    slug: 'face-painting',
    title: 'Face Painting',
    category: 'Non-Technical Group Event',
    description: 'Interpret the theme Seasons through an original face-painting composition.',
    date: '22 June 2026',
    time: '1:30 PM - 3:30 PM',
    venue: 'Classroom',
    teamSize: '2 members',
    coordinators: [
      { name: 'Karthik', phone: '8667382148' },
      { name: 'Balakrishnan', phone: '8110882806' },
      { name: 'Jeneliya', phone: '7339459040' },
    ],
    theme: 'Seasons',
    rules: [
      'Each team must contain 2 participants.',
      'The event time limit is 60 minutes.',
      'Participants must bring their own painting materials and tools.',
      'Participants must arrange their own face-painting model.',
      'Report 15 minutes before the competition starts.',
      'Stencils and pre-marked outlines are strictly prohibited.',
      "The judges' decision is final.",
    ],
    judging: ['Creativity', 'Relevance to the theme', 'Overall presentation'],
  },
  {
    id: 8,
    slug: 'adzap',
    title: 'Adzap',
    category: 'Non-Technical Group Event',
    description: 'Create and perform a fast, persuasive advertisement for a product revealed on the spot.',
    date: '22 June 2026',
    time: '11:00 AM - 1:00 PM',
    venue: 'Classroom',
    teamSize: '3 to 4 members',
    coordinators: [
      { name: 'Dhanush Karthick', phone: '7550382354' },
      { name: 'Varshini Shanthakumar', phone: '6383927942' },
      { name: 'Kishore Kumar S', phone: '8778475005' },
    ],
    rules: [
      'Each team must contain 3 to 4 participants.',
      'The performance time limit is 3 minutes.',
      'Report 15 minutes before the competition begins.',
      'The product will be assigned on the spot.',
      'Any vulgarity results in immediate disqualification.',
      "The judges' decision is final and binding.",
    ],
    judging: ['Creativity', 'Persuasion', 'Humor', 'Team participation', 'Product relevance'],
  },
];

export const getEventBySlug = (slug: string | null) =>
  EVENT_DETAILS.find((event) => event.slug === slug);

export const readEventSlug = () => {
  if (typeof window === 'undefined') return null;
  return window.location.hash.match(/^#\/events\/([^/?]+)/)?.[1] ?? null;
};

export const openEventPage = (slug: string) => {
  window.location.hash = `/events/${slug}`;
};
