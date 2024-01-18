// User
export interface Member {
  username: string;
  joinedAt: string;
}

export interface User extends Member {
  fullName: string;
}

// Project
export interface ProjectInput {
  name?: string;
  members?: string[];
}

export interface ProjectBase {
  id: number;
  name: string;
  createdBy: Member;
  members: Member[];
  createdAt: string;
}

export interface Project extends ProjectBase {
  bugsCount: number;
}

export interface ProjectDetails extends ProjectBase {
  bugs: Bug[];
}

// Bug
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
  notesCount: number;
  isResolved: boolean;
  projectId: string;
}

export interface BugDetails extends BugInputDto {
  id: string;
  projectId: string;
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

// Note
export interface Note {
  id: string;
  bugId: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: Member;
}
