import { v4 as uuidv4 } from 'uuid';
import { DashboardData, Direction, Task } from '@/types';

export const ANCHOR_DATES = [
  { date: '2026-06-11', label: 'Webinar' },
  { date: '2026-06-17', label: 'VivaTech Start' },
  { date: '2026-06-20', label: 'VivaTech End' },
  { date: '2026-06-25', label: 'Beyond Active' },
] as const;

function makeTask(
  name: string,
  startDate: string,
  endDate: string,
  assignee?: string,
  notes?: string
): Task {
  return { id: uuidv4(), name, startDate, endDate, status: 'todo', assignee, notes };
}

function buildDirections(): Direction[] {
  return [
    {
      id: uuidv4(),
      name: 'LinkedIn Warm-ups',
      color: '#6366f1',
      description: 'Weekly LinkedIn posts to warm up the audience',
      tasks: [
        makeTask('LinkedIn 1', '2026-04-21', '2026-04-27', 'Team'),
        makeTask('LinkedIn 2', '2026-04-28', '2026-05-07', 'Team'),
        makeTask('LinkedIn 3', '2026-05-08', '2026-05-11', 'Team'),
        makeTask('LinkedIn 4', '2026-05-12', '2026-05-18', 'Team'),
        makeTask('LinkedIn 5', '2026-05-19', '2026-05-25', 'Team'),
        makeTask('LinkedIn 6', '2026-05-26', '2026-05-29', 'Team'),
        makeTask('LinkedIn 7', '2026-05-30', '2026-06-02', 'Team'),
        makeTask('LinkedIn 8', '2026-06-03', '2026-06-04', 'Team'),
        makeTask('LinkedIn 9', '2026-06-05', '2026-06-09', 'Team'),
        makeTask('LinkedIn 10', '2026-06-10', '2026-06-11', 'Team'),
        makeTask('LinkedIn 11', '2026-06-12', '2026-06-16', 'Team'),
        makeTask('LinkedIn 12', '2026-06-17', '2026-06-18', 'Team'),
        makeTask('LinkedIn 13', '2026-06-19', '2026-06-23', 'Team'),
        makeTask('LinkedIn 14', '2026-06-24', '2026-06-27', 'Team'),
      ],
    },
    {
      id: uuidv4(),
      name: 'Case Study v1',
      color: '#f59e0b',
      description: 'Case study with prototype screenshots',
      tasks: [
        makeTask('MVP prototype with comments', '2026-04-21', '2026-04-22', 'Team'),
        makeTask('v1 screenshots with annotations', '2026-04-23', '2026-04-29', 'Team'),
        makeTask('Case v1 — text ready', '2026-04-30', '2026-05-02', 'Sasha'),
        makeTask('Layout & publication on qarea.com', '2026-05-03', '2026-05-05', 'Nastya'),
        makeTask('LinkedIn post: case study announcement', '2026-05-06', '2026-05-07', 'Team'),
      ],
    },
    {
      id: uuidv4(),
      name: 'SEO Longreads',
      color: '#10b981',
      description: "SEO blog posts per Khrystyna's plan",
      tasks: [
        makeTask('Blog #1', '2026-04-21', '2026-04-30', 'Khrystyna'),
        makeTask('Blog #2', '2026-05-01', '2026-05-14', 'Khrystyna'),
        makeTask('Blog #3', '2026-05-15', '2026-05-28', 'Khrystyna'),
        makeTask('Blog #4', '2026-05-29', '2026-06-11', 'Khrystyna'),
      ],
    },
    {
      id: uuidv4(),
      name: 'Webinar (Jun 11)',
      color: '#ef4444',
      description: 'Webinar on June 11 — speaker search, promo, post-webinar',
      tasks: [
        makeTask('Launch speaker search: brief, shortlist', '2026-04-21', '2026-04-27', 'Team'),
        makeTask('Outreach wave 1 to potential speakers', '2026-04-28', '2026-05-04', 'Team'),
        makeTask('Outreach wave 2 + follow-ups', '2026-05-05', '2026-05-11', 'Team'),
        makeTask('Structure + topic + speaker confirmed', '2026-05-12', '2026-05-18', 'Team'),
        makeTask('Webinar landing — text ready', '2026-05-19', '2026-05-25', 'Sasha'),
        makeTask('Webinar landing — layout + registration form', '2026-05-26', '2026-05-27', 'Nastya'),
        makeTask('Webinar platform setup', '2026-05-27', '2026-05-28', 'Team'),
        makeTask('Start webinar promo (LinkedIn post #1)', '2026-05-28', '2026-05-28', 'Team'),
        makeTask('Webinar promo: LinkedIn post #2', '2026-05-29', '2026-06-01', 'Team'),
        makeTask('Webinar promo: LinkedIn post #3 (last call)', '2026-06-02', '2026-06-08', 'Team'),
        makeTask('Post "tomorrow is the stream"', '2026-06-09', '2026-06-10', 'Team'),
        makeTask('Follow-up email + summary post', '2026-06-12', '2026-06-12', 'Team'),
        makeTask('Recording published + "missed it?" post', '2026-06-13', '2026-06-15', 'Team'),
      ],
    },
    {
      id: uuidv4(),
      name: 'Medium Articles',
      color: '#8b5cf6',
      description: 'TestFort-expert articles on Medium',
      tasks: [
        makeTask('Medium 1', '2026-04-21', '2026-05-07', 'Team'),
        makeTask('Medium 2', '2026-05-08', '2026-05-21', 'Team'),
        makeTask('Medium 3', '2026-05-22', '2026-06-04', 'Team'),
        makeTask('Medium 4', '2026-06-05', '2026-06-15', 'Team'),
        makeTask('Medium 5', '2026-06-16', '2026-06-22', 'Team'),
      ],
    },
    {
      id: uuidv4(),
      name: 'Content Pack: Beyond Active',
      color: '#f97316',
      description: 'Content waves for Beyond Active event (Jun 25)',
      tasks: [
        makeTask(
          'Wave 1 — teaser (3 corporate posts + 5 employee templates)',
          '2026-05-01',
          '2026-05-25',
          'Team'
        ),
        makeTask('Wave 2 — live templates for the event', '2026-05-26', '2026-06-25', 'Team'),
        makeTask('Wave 3 — harvest (takeaways, insights)', '2026-06-26', '2026-07-02', 'Team'),
      ],
    },
    {
      id: uuidv4(),
      name: 'Content Pack: VivaTech',
      color: '#0ea5e9',
      description: 'Content waves for VivaTech Paris (Jun 17–20)',
      tasks: [
        makeTask(
          'Wave 1 — teaser (3 corporate posts + 5 employee templates, fitness/gym focus)',
          '2026-05-01',
          '2026-05-28',
          'Team'
        ),
        makeTask('Wave 2 — live templates for Paris (Jun 17–20)', '2026-05-29', '2026-06-20', 'Team'),
        makeTask('Wave 3 — harvest after VivaTech', '2026-06-21', '2026-06-24', 'Team'),
      ],
    },
    {
      id: uuidv4(),
      name: 'Adjacent Tasks',
      color: '#64748b',
      description: 'Landing updates, one-pagers, and other adjacent work',
      tasks: [
        makeTask('Anya Uvarova case → sales formats', '2026-04-21', '2026-04-27', 'Nastya'),
        makeTask(
          'Landing qarea.com/solutions/healthcare/fitness update',
          '2026-04-28',
          '2026-05-15',
          'Khrystyna'
        ),
        makeTask('Additional one-pagers v1', '2026-05-01', '2026-05-15', 'Sasha / Nastya'),
        makeTask('Additional one-pagers v2', '2026-05-16', '2026-05-29', 'Sasha / Nastya'),
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
