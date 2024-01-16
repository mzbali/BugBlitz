import { StickyNote } from 'lucide-react';

import ModifyNote from '@/components/ModifyNote';

import { BugDetails } from '@/models/types';

import NotesClient from './NotesClient';

interface Props {
  bug: BugDetails;
}

const Notes = ({ bug }: Props) => {
  return (
    <div className='mb-4 mt-4 w-full items-center justify-start rounded-lg bg-slate-50 p-4 pt-2 shadow-md dark:bg-slate-800'>
      <div className='mt-4 space-y-4'>
        <div className='flex items-center space-x-2 text-indigo-900 dark:text-gray-200'>
          <StickyNote />
          <h2 className='text-2xl font-semibold'>Notes</h2>
        </div>
        {bug.notes.length === 0 ? (
          <>
            <ModifyNote bug={bug} />
            <p>No comments yet.</p>
          </>
        ) : (
          <NotesClient bug={bug} />
        )}
      </div>
    </div>
  );
};

export default Notes;
