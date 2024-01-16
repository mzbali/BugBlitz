'use client';
import { Trash } from 'lucide-react';
import React, { useState } from 'react';

import Button from '@/components/ui/buttons/Button';

import { deleteNote } from '@/app/actions';
import { BugDetails, Note } from '@/models/types';

import ModifyNote from './ModifyNote';

interface Props {
  bug: BugDetails;
  note: Note;
}

const NoteAction: React.FC<Props> = ({ bug, note }) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteNote(bug.projectId, bug.id, note.id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ModifyNote bug={bug} note={note} />
      <Button
        className='bg-red-500 text-white hover:bg-red-600'
        leftIcon={Trash}
        onClick={() => handleDelete()}
        isLoading={loading}
      >
        Delete
      </Button>
    </>
  );
};

export default NoteAction;
