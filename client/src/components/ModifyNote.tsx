'use client';
import { Pencil } from 'lucide-react';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import DialogSubmitButton from '@/components/DialogSubmitButton';
import Button from '@/components/ui/buttons/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { createNote, updateNote } from '@/app/actions'; // Import updateNote from your actions file
import { BugDetails, Note } from '@/models/types';

interface Props {
  bug: BugDetails;
  note?: Note;
}

const ModifyNote = ({ bug, note }: Props) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      note: note ? note.body : '',
    },
  });

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    try {
      if (note) {
        await updateNote(bug.projectId, bug.id, note.id, data.note);
      } else {
        await createNote(bug.projectId, bug.id, data.note);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      reset(); // Reset the form values
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='primary'
          leftIcon={note ? Pencil : undefined}
          onClick={() => {
            reset({
              note: note ? note.body : '',
            });
          }}
        >
          {note ? 'Edit' : 'Leave a Note'}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] dark:border-none dark:bg-slate-700'>
        <DialogHeader>
          <DialogTitle className='dark:text-white'>
            {note ? 'Update Note' : 'Create a Note'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-4 py-2'>
            <div className='flex flex-col items-center justify-center'>
              <Label
                htmlFor='body'
                className='mb-3 self-start whitespace-nowrap text-right dark:text-white'
              >
                Note
              </Label>
              <Textarea
                {...register('note', { required: 'Note is required.' })}
                className='mb-2 focus:border-0 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:bg-gray-600'
              />
              {errors.note && (
                <p className='self-start text-xs text-red-500'>
                  {errors.note.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogSubmitButton isValid={isValid} loading={loading} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyNote;
