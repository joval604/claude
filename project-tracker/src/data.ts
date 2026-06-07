import { Division } from './types';

export const initialData: Division[] = [
  {
    id: 'd1',
    name: 'Technology',
    programs: [
      {
        id: 'p1',
        name: 'Digital Transformation',
        status: 'In Progress',
        projects: [
          {
            id: 'pr1',
            name: 'Customer Portal Redesign',
            status: 'In Progress',
            percentComplete: 65,
            goLiveDate: '2026-09-15',
            description: 'Full redesign of the customer-facing portal.',
            statusReport: 'On track. UI components completed. Backend integration in progress.',
            resources: [
              { id: 'r1', name: 'Alex Kim', role: 'Project Manager' },
              { id: 'r2', name: 'Sara Lopez', role: 'Developer' },
            ],
            teams: [
              { id: 't1', name: 'Frontend' },
              { id: 't2', name: 'UX Design' },
            ],
          },
          {
            id: 'pr2',
            name: 'API Gateway Migration',
            status: 'At Risk',
            percentComplete: 40,
            goLiveDate: '2026-08-01',
            description: 'Migrate legacy APIs to new gateway infrastructure.',
            statusReport: 'Blocked - Awaiting approval on infrastructure requirements. Risk mitigation plan in place.',
            resources: [
              { id: 'r3', name: 'Jordan Lee', role: 'Tech Lead' },
            ],
            teams: [
              { id: 't3', name: 'Backend' },
              { id: 't4', name: 'Infrastructure' },
            ],
          },
        ],
      },
      {
        id: 'p2',
        name: 'Data & Analytics',
        status: 'In Progress',
        projects: [
          {
            id: 'pr3',
            name: 'Data Lake Setup',
            status: 'In Progress',
            percentComplete: 80,
            goLiveDate: '2026-07-10',
            description: 'Centralize all data sources into a unified data lake.',
            statusReport: 'Nearly complete. Final testing and data validation in progress.',
            resources: [
              { id: 'r4', name: 'Morgan Chen', role: 'Data Engineer' },
              { id: 'r5', name: 'Riley Park', role: 'Analyst' },
            ],
            teams: [
              { id: 't5', name: 'Data Engineering' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'd2',
    name: 'Operations',
    programs: [
      {
        id: 'p3',
        name: 'Process Optimization',
        status: 'Not Started',
        projects: [
          {
            id: 'pr4',
            name: 'Workflow Automation',
            status: 'Not Started',
            percentComplete: 0,
            goLiveDate: '2026-12-01',
            description: 'Automate manual operational workflows.',
            statusReport: 'Scheduled to start Q3. Requirements gathering phase pending.',
            resources: [],
            teams: [
              { id: 't6', name: 'Operations' },
            ],
          },
        ],
      },
    ],
  },
];
