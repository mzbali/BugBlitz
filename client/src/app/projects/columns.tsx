'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

import IconButton from '@/components/ui/buttons/IconButton';

export type User = {
  username: string;
};

export type Bug = {
  title: string;
  description: string;
  priority: number;
  id: number;
};

export type Project = {
  id: number;
  name: string;
  createdBy: User;
  members: User[];
  bugs: Bug[];
  createdAt: string;
};

export const columns: ColumnDef<Project>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
  },
  {
    header: 'Bugs',
    accessorFn: (row) => row.bugs.length,
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
    accessorFn: (row) => {
      const date = new Date(row.createdAt);
      return new Intl.DateTimeFormat('default', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    },
    header: 'Added',
  },
  {
    header: 'Actions',
    cell: ({ row }) => {
      const project = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton
              variant='ghost'
              icon={MoreHorizontal}
              className='h-8 w-8 p-0'
            >
              <span className='sr-only'>Open menu</span>
            </IconButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-28 rounded-md bg-white p-2 shadow-lg dark:bg-slate-800'>
            <DropdownMenuItem className='rounded-md p-2 text-left hover:bg-indigo-300 dark:hover:text-black'>
              <Link href={`/projects/${project.id}`}>View</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className='rounded-md p-2 text-left hover:bg-green-300 dark:hover:text-black'>
              <Link href={`/projects/${project.id}/edit`}>Update</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className='rounded-md p-2 text-left hover:bg-red-300 dark:hover:text-black'>
              <Link href={`/projects/${project.id}/delete`}>Delete</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
