'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

import { formatDate } from '@/lib/utils';

import IconButton from '@/components/ui/buttons/IconButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import PrimaryLink from '@/components/ui/links/PrimaryLink';

import { Project } from '@/models/types';

import { deleteProject } from '../actions';

export const columns: ColumnDef<Project>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const project = row.original;
      return (
        <PrimaryLink href={`/projects/${project.id}`}>
          {project.name}
        </PrimaryLink>
      );
    },
  },
  {
    header: 'Bugs',
    accessorKey: 'bugsCount',
  },
  {
    header: 'Members',
    accessorFn: (row) => row.members.length,
  },
  {
    accessorKey: 'createdBy.username',
    header: 'Admin',
  },
  {
    accessorFn: (row) => formatDate(row.createdAt),
    header: 'Added',
  },
  {
    header: 'Actions',
    cell: ({ row }) => {
      const project = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton variant='ghost' icon={MoreHorizontal}>
              <span className='sr-only'>Open menu</span>
            </IconButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href={`/projects/${project.id}`}>View</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={() => deleteProject(project.id)}>Delete</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
