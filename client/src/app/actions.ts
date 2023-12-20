'use server';
import { revalidateTag } from 'next/cache';
import { getServerSession, Session } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Bug, BugInputDto, Note, Project, ProjectInput } from '@/models/types';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
const PROJECTS_API = `${BASE_API_URL}/Projects`;

async function getSessionAndHeaders(session?: Session) {
  if (!session) {
    session = (await getServerSession(authOptions)) || undefined;
  }
  const headers = {
    Authorization: `Bearer ${session?.accessToken}`,
    'Content-Type': 'application/json',
  };
  return headers;
}

const fetchWrapper = {
  get: async (url: string, tag?: string, session?: Session) => {
    const headers = await getSessionAndHeaders(session);
    return handleResponse(
      await fetch(url, {
        method: 'GET',
        headers,
        next: tag ? { [tag]: {} } : {},
      }),
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: async (url: string, body: any, tag?: string, session?: Session) => {
    const headers = await getSessionAndHeaders(session);
    return handleResponse(
      await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        next: tag ? { [tag]: {} } : {},
      }),
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put: async (url: string, body: any, tag?: string, session?: Session) => {
    const headers = await getSessionAndHeaders(session);
    return handleResponse(
      await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
        next: tag ? { [tag]: {} } : {},
      }),
    );
  },
  delete: async (url: string, tag?: string, session?: Session) => {
    const headers = await getSessionAndHeaders(session);
    return handleResponse(
      await fetch(url, {
        method: 'DELETE',
        headers,
        next: tag ? { [tag]: {} } : {},
      }),
    );
  },
};

async function handleResponse(response: Response) {
  const text = await response.text();
  const data = text && JSON.parse(text);
  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    throw error;
  }
  return data;
}

// Users
export const getUsers = async () =>
  await fetchWrapper.get(`${BASE_API_URL}/Account/users`, 'users');

// Projects
export const getProjects = async () =>
  await fetchWrapper.get(`${PROJECTS_API}`, 'projects');

export const getProject = async (projectId: string, session?: Session) =>
  await fetchWrapper.get(`${PROJECTS_API}/${projectId}`, 'project', session);

export const createProject = async (value: ProjectInput) => {
  const result: Project = await fetchWrapper.post(
    `${PROJECTS_API}`,
    value,
    'projects',
  );
  revalidateTag('projects');
  return result;
};

export const updateProject = async (projectId: number, value: ProjectInput) => {
  await fetchWrapper.put(`${PROJECTS_API}/${projectId}`, value, 'projects');
  revalidateTag('projects');
};

export const deleteProject = async (projectId: number) => {
  try {
    await fetchWrapper.delete(`${PROJECTS_API}/${projectId}`, 'projects');
  } catch (error) {
    console.log(error);
  }
  revalidateTag('projects');
};

// Bugs
export const createBug = async (projectId: number, value: BugInputDto) => {
  const result: Bug = await fetchWrapper.post(
    `${PROJECTS_API}/${projectId}/Bugs`,
    value,
    'bugs',
  );
  revalidateTag('bugs');
  return result;
};

export const updateBug = async (
  projectId: number,
  bugId: number,
  value: BugInputDto,
) => {
  const result = await fetchWrapper.put(
    `${PROJECTS_API}/${projectId}/Bugs/${bugId}`,
    value,
    'bugs',
  );
  revalidateTag('bugs');
  return result;
};

export const deleteBug = async (projectId: string, bugId: string) => {
  try {
    console.log(projectId, bugId);

    await fetchWrapper.delete(
      `${PROJECTS_API}/${projectId}/Bugs/${bugId}`,
      'bugs',
    );
  } catch (error) {
    console.log(error);
  }
  revalidateTag('bugs');
};

// Notes
export const createNote = async (
  projectId: string,
  bugId: string,
  value: Note,
) => {
  const result: Note = await fetchWrapper.post(
    `${PROJECTS_API}/${projectId}/Bugs/${bugId}/Notes`,
    value,
    'notes',
  );
  revalidateTag('notes');
  return result;
};

export const deleteNote = async (
  projectId: string,
  bugId: string,
  noteId: string,
) => {
  try {
    await fetchWrapper.delete(
      `${PROJECTS_API}/${projectId}/Bugs/${bugId}/Notes/${noteId}`,
      'notes',
    );
  } catch (error) {
    console.log(error);
  }
  revalidateTag('notes');
};
