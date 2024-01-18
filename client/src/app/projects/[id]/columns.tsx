'use client';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

import { cn, formatDate } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import IconButton from '@/components/ui/buttons/IconButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import PrimaryLink from '@/components/ui/links/PrimaryLink';

import { deleteBug } from '@/app/actions';
import { Bug } from '@/models/types';

export const columns: ColumnDef<Bug>[] = [
  {
    id: 'name',
    accessorKey: 'title',
    header: 'name',
    cell: ({ row }) => {
      const bug = row.original;
      return (
        <PrimaryLink
          variant='primary'
          href={`/projects/${bug.projectId}/bugs/${bug.id}`}
        >
          {bug.title}
        </PrimaryLink>
      );
    },
  },
  {
    id: 'priority',
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      const bug = row.original;
      return (
        <Badge
          className={cn(
            bug.priority === 'Low'
              ? 'bg-green-500 hover:bg-green-500'
              : bug.priority === 'Medium'
                ? 'bg-yellow-500 hover:bg-yellow-500'
                : bug.priority === 'High'
                  ? 'bg-red-500 hover:bg-red-500'
                  : 'bg-gray-500 hover:bg-gray-500',
          )}
        >
          {bug.priority}
        </Badge>
      );
    },
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const bug = row.original;
      return (
        <Badge
          className={cn(
            bug.isResolved
              ? 'bg-green-500 hover:bg-green-500'
              : 'bg-indigo-500 hover:bg-indigo-500',
          )}
        >
          {bug.isResolved ? 'Resolved' : 'Open'}
        </Badge>
      );
    },
  },
  {
    id: 'added',
    accessorKey: 'createdAt',
    header: 'Added',
    cell: ({ row }) => {
      const bug = row.original;
      return `${formatDate(bug.createdAt)} ~ ${bug.createdBy.username}`;
    },
  },
  {
    id: 'updated',
    accessorKey: 'updatedAt',
    header: 'Updated',
    cell: ({ row }) => {
      const bug = row.original;
      return `${formatDate(bug.updatedAt)}${
        bug.updatedBy ? ' ~' + bug.updatedBy.username : ''
      }`;
    },
  },
  {
    id: 'notes',
    accessorKey: 'notesCount',
    header: 'Notes',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const bug = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton variant='ghost' icon={MoreHorizontal}>
              <span className='sr-only'>Open menu</span>
            </IconButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link
                className='w-full'
                href={`/projects/${bug.projectId}/bugs/${bug.id}`}
              >
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                onClick={() => deleteBug(bug.projectId, bug.id)}
                className='w-full text-start'
              >
                Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
