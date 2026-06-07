export type Status = 'Not Started' | 'In Progress' | 'On Hold' | 'Completed' | 'At Risk';

export interface Resource {
  id: string;
  name: string;
  role: string;
}

export interface Team {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  status: Status;
  percentComplete: number;
  goLiveDate: string;
  resources: Resource[];
  teams: Team[];
  description: string;
}

export interface Program {
  id: string;
  name: string;
  status: Status;
  projects: Project[];
}

export interface Division {
  id: string;
  name: string;
  programs: Program[];
}
