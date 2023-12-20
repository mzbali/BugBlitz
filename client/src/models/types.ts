export interface Member {
  username: string;
}

export interface User extends Member {
  fullName: string;
}

export interface BugInputDto {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface Bug extends BugInputDto {
  id: string;
  createdAt: string;
  updatedAt: string | null;
  createdBy: Member;
  updatedBy: Member | null;
  notes: Note[];
  isResolved: boolean;
  projectId: string;
}

export interface Note {
  id: number;
  bugId: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: Member;
}

export interface ProjectInput {
  name: string;
  members: Member[];
}

export interface Project {
  id: number;
  name: string;
  createdBy: Member;
  members: Member[];
  bugs: Bug[];
  createdAt: string;
}

export interface BugDetails {
  id: number;
  projectId: number;
  title: string;
  description: string;
  priority: string;
  isResolved: boolean;
  createdAt: string;
  updatedAt: string | null;
  closedAt: string | null;
  reopenedAt: string | null;
  createdBy: Member;
  updatedBy: Member | null;
  closedBy: Member | null;
  reopenedBy: Member | null;
  notes: Note[];
}
