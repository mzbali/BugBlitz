'use client';
import React, { useState } from 'react';

import ModifyNote from '@/components/ModifyNote';
import Note from '@/components/Note';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { BugDetails } from '@/models/types';

interface Props {
  bug: BugDetails;
}

const NotesClient = ({ bug }: Props) => {
  const [sortOrder, setSortOrder] = useState('newest');

  const sortedNotes = [...bug.notes].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  return (
    <>
      <div className='mb-4 flex justify-between'>
        <ModifyNote bug={bug} />
        <div className='w-32'>
          <Select onValueChange={handleSortChange}>
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
      {/* Render each note using the Note component */}
      <div className='space-y-2'>
        {sortedNotes.map((note) => (
          <Note key={note.id} note={note} bug={bug} />
        ))}
      </div>
    </>
  );
};

export default NotesClient;
