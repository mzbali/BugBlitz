import { StickyNote } from 'lucide-react';
import React from 'react';

import { formatDate, getInitials } from '@/lib/utils';

import ModifyNote from '@/components/ModifyNote';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { BugDetails } from '@/models/types';

import NoteAction from './NoteAction';

interface Props {
  bug: BugDetails;
}

const Notes = ({ bug }: Props) => {
  return (
    <div className='mb-4 mt-6 w-full items-center justify-start rounded-lg bg-slate-50 p-4 shadow-md dark:bg-slate-800'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center space-x-2 text-indigo-900 dark:text-gray-200'>
          <StickyNote />
          <h2 className='text-2xl font-semibold'>Notes</h2>
        </div>
        <div className='w-32'>
          <Select>
            <SelectTrigger id='sort-notes'>
              <SelectValue placeholder='Sort By' />
            </SelectTrigger>
            <SelectContent position='popper'>
              <SelectItem value='newest'>Newest</SelectItem>
              <SelectItem value='oldest'>Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ModifyNote bug={bug} />
      <div className='mt-4 space-y-4'>
        {bug.notes.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          bug.notes.map((note) => (
            <div
              key={note.id}
              className='rounded-lg bg-white p-4 shadow dark:bg-slate-700 dark:text-gray-200'
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <Avatar>
                    <AvatarFallback>
                      {getInitials(note.author.username)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-semibold'>{note.author.username}</p>
                    <p className='text-sm dark:text-gray-300'>
                      {formatDate(note.createdAt, true)}
                    </p>
                  </div>
                </div>
                <div className='flex space-x-2'>
                  <NoteAction bug={bug} note={note} />
                </div>
              </div>
              <p className='mt-2 dark:text-white'>{note.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;
