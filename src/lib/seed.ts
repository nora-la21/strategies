import { DashboardData, Direction, Task } from '@/types';

export const ANCHOR_DATES = [
  { date: '2026-06-11', label: 'Webinar' },
  { date: '2026-06-17', label: 'VivaTech Start' },
  { date: '2026-06-20', label: 'VivaTech End' },
  { date: '2026-06-25', label: 'Beyond Active' },
] as const;

// Fixed IDs required for static export (generateStaticParams)
export const DIRECTION_IDS = [
  'linkedin-warmups',
  'case-study-v1',
  'seo-longreads',
  'webinar-jun11',
  'medium-articles',
  'beyond-active',
  'vivatech',
  'adjacent-tasks',
] as const;

function task(
  id: string,
  name: string,
  startDate: string,
  endDate: string,
  assignee?: string,
  notes?: string
): Task {
  return { id, name, startDate, endDate, status: 'todo', assignee, notes };
}

function buildDirections(): Direction[] {
  return [
    {
      id: 'linkedin-warmups',
      name: 'LinkedIn Warm-ups',
      color: '#6366f1',
      description: 'Weekly LinkedIn posts to warm up the audience',
      tasks: [
        task('lw-1', 'LinkedIn 1', '2026-04-21', '2026-04-27', 'Team'),
        task('lw-2', 'LinkedIn 2', '2026-04-28', '2026-05-07', 'Team'),
        task('lw-3', 'LinkedIn 3', '2026-05-08', '2026-05-11', 'Team'),
        task('lw-4', 'LinkedIn 4', '2026-05-12', '2026-05-18', 'Team'),
        task('lw-5', 'LinkedIn 5', '2026-05-19', '2026-05-25', 'Team'),
        task('lw-6', 'LinkedIn 6', '2026-05-26', '2026-05-29', 'Team'),
        task('lw-7', 'LinkedIn 7', '2026-05-30', '2026-06-02', 'Team'),
        task('lw-8', 'LinkedIn 8', '2026-06-03', '2026-06-04', 'Team'),
        task('lw-9', 'LinkedIn 9', '2026-06-05', '2026-06-09', 'Team'),
        task('lw-10', 'LinkedIn 10', '2026-06-10', '2026-06-11', 'Team'),
        task('lw-11', 'LinkedIn 11', '2026-06-12', '2026-06-16', 'Team'),
        task('lw-12', 'LinkedIn 12', '2026-06-17', '2026-06-18', 'Team'),
        task('lw-13', 'LinkedIn 13', '2026-06-19', '2026-06-23', 'Team'),
        task('lw-14', 'LinkedIn 14', '2026-06-24', '2026-06-27', 'Team'),
      ],
    },
    {
      id: 'case-study-v1',
      name: 'Case Study v1',
      color: '#f59e0b',
      description: 'Case study with prototype screenshots',
      tasks: [
        task('cs-1', 'MVP prototype with comments', '2026-04-21', '2026-04-22', 'Team'),
        task('cs-2', 'v1 screenshots with annotations', '2026-04-23', '2026-04-29', 'Team'),
        task('cs-3', 'Case v1 — text ready', '2026-04-30', '2026-05-02', 'Sasha'),
        task('cs-4', 'Layout & publication on qarea.com', '2026-05-03', '2026-05-05', 'Nastya'),
        task('cs-5', 'LinkedIn post: case study announcement', '2026-05-06', '2026-05-07', 'Team'),
      ],
    },
    {
      id: 'seo-longreads',
      name: 'SEO Longreads',
      color: '#10b981',
      description: "SEO blog posts per Khrystyna's plan",
      tasks: [
        task('seo-1', 'Blog #1', '2026-04-21', '2026-04-30', 'Khrystyna'),
        task('seo-2', 'Blog #2', '2026-05-01', '2026-05-14', 'Khrystyna'),
        task('seo-3', 'Blog #3', '2026-05-15', '2026-05-28', 'Khrystyna'),
        task('seo-4', 'Blog #4', '2026-05-29', '2026-06-11', 'Khrystyna'),
      ],
    },
    {
      id: 'webinar-jun11',
      name: 'Webinar (Jun 11)',
      color: '#ef4444',
      description: 'Webinar on June 11 — speaker search, promo, post-webinar',
      tasks: [
        task('wb-1', 'Launch speaker search: brief, shortlist', '2026-04-21', '2026-04-27', 'Team'),
        task('wb-2', 'Outreach wave 1 to potential speakers', '2026-04-28', '2026-05-04', 'Team'),
        task('wb-3', 'Outreach wave 2 + follow-ups', '2026-05-05', '2026-05-11', 'Team'),
        task('wb-4', 'Structure + topic + speaker confirmed', '2026-05-12', '2026-05-18', 'Team'),
        task('wb-5', 'Webinar landing — text ready', '2026-05-19', '2026-05-25', 'Sasha'),
        task('wb-6', 'Webinar landing — layout + registration form', '2026-05-26', '2026-05-27', 'Nastya'),
        task('wb-7', 'Webinar platform setup', '2026-05-27', '2026-05-28', 'Team'),
        task('wb-8', 'Start webinar promo (LinkedIn post #1)', '2026-05-28', '2026-05-28', 'Team'),
        task('wb-9', 'Webinar promo: LinkedIn post #2', '2026-05-29', '2026-06-01', 'Team'),
        task('wb-10', 'Webinar promo: LinkedIn post #3 (last call)', '2026-06-02', '2026-06-08', 'Team'),
        task('wb-11', 'Post "tomorrow is the stream"', '2026-06-09', '2026-06-10', 'Team'),
        task('wb-12', 'Follow-up email + summary post', '2026-06-12', '2026-06-12', 'Team'),
        task('wb-13', 'Recording published + "missed it?" post', '2026-06-13', '2026-06-15', 'Team'),
      ],
    },
    {
      id: 'medium-articles',
      name: 'Medium Articles',
      color: '#8b5cf6',
      description: 'TestFort-expert articles on Medium',
      tasks: [
        task('med-1', 'Medium 1', '2026-04-21', '2026-05-07', 'Team'),
        task('med-2', 'Medium 2', '2026-05-08', '2026-05-21', 'Team'),
        task('med-3', 'Medium 3', '2026-05-22', '2026-06-04', 'Team'),
        task('med-4', 'Medium 4', '2026-06-05', '2026-06-15', 'Team'),
        task('med-5', 'Medium 5', '2026-06-16', '2026-06-22', 'Team'),
      ],
    },
    {
      id: 'beyond-active',
      name: 'Content Pack: Beyond Active',
      color: '#f97316',
      description: 'Content waves for Beyond Active event (Jun 25)',
      tasks: [
        task(
          'ba-1',
          'Wave 1 — teaser (3 corporate posts + 5 employee templates)',
          '2026-05-01',
          '2026-05-25',
          'Team'
        ),
        task('ba-2', 'Wave 2 — live templates for the event', '2026-05-26', '2026-06-25', 'Team'),
        task('ba-3', 'Wave 3 — harvest (takeaways, insights)', '2026-06-26', '2026-07-02', 'Team'),
      ],
    },
    {
      id: 'vivatech',
      name: 'Content Pack: VivaTech',
      color: '#0ea5e9',
      description: 'Content waves for VivaTech Paris (Jun 17–20)',
      tasks: [
        task(
          'vt-1',
          'Wave 1 — teaser (3 corporate posts + 5 employee templates, fitness/gym focus)',
          '2026-05-01',
          '2026-05-28',
          'Team'
        ),
        task('vt-2', 'Wave 2 — live templates for Paris (Jun 17–20)', '2026-05-29', '2026-06-20', 'Team'),
        task('vt-3', 'Wave 3 — harvest after VivaTech', '2026-06-21', '2026-06-24', 'Team'),
      ],
    },
    {
      id: 'adjacent-tasks',
      name: 'Adjacent Tasks',
      color: '#64748b',
      description: 'Landing updates, one-pagers, and other adjacent work',
      tasks: [
        task('adj-1', 'Anya Uvarova case → sales formats', '2026-04-21', '2026-04-27', 'Nastya'),
        task(
          'adj-2',
          'Landing qarea.com/solutions/healthcare/fitness update',
          '2026-04-28',
          '2026-05-15',
          'Khrystyna'
        ),
        task('adj-3', 'Additional one-pagers v1', '2026-05-01', '2026-05-15', 'Sasha / Nastya'),
        task('adj-4', 'Additional one-pagers v2', '2026-05-16', '2026-05-29', 'Sasha / Nastya'),
      ],
    },
  ];
}

export function getSeedData(): DashboardData {
  return {
    directions: buildDirections(),
    lastUpdated: new Date().toISOString(),
  };
}
