// Note.tsx
import { formatDate, getInitials } from '@/lib/utils';

import NoteAction from '@/components/NoteAction';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import UserCheck from '@/components/UserCheck';

import { BugDetails, Note } from '@/models/types';

interface Props {
  note: Note;
  bug: BugDetails;
}

const Note = ({ note, bug }: Props) => {
  return (
    <div className='rounded-lg bg-white p-4 shadow dark:bg-slate-700 dark:text-gray-200'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Avatar>
            <AvatarFallback>{getInitials(note.author.username)}</AvatarFallback>
          </Avatar>
          <div>
            <p className='font-semibold'>{note.author.username}</p>
            <p className='text-sm dark:text-gray-300'>
              {formatDate(note.createdAt, true)}
            </p>
            {note.createdAt !== note.updatedAt && (
              <p className='text-sm dark:text-gray-300'>
                Edited {formatDate(note.updatedAt, true)}
              </p>
            )}
          </div>
        </div>
        <div className='flex space-x-2'>
          <UserCheck user={note.author}>
            <NoteAction bug={bug} note={note} />
          </UserCheck>
        </div>
      </div>
      <p className='mt-2 dark:text-white'>{note.body}</p>
    </div>
  );
};

export default Note;
