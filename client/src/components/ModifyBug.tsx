'use client';
import { PencilLine } from 'lucide-react';
import React, { useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';

import Button from '@/components/ui/buttons/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { createBug, updateBug } from '@/app/actions';
import { BugDetails } from '@/models/types';

import DialogSubmitButton from './DialogSubmitButton';

interface Props {
  bug?: BugDetails;
  projectId: string;
}

const ModifyBug = ({ bug, projectId }: Props) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm({
    defaultValues: {
      title: bug ? bug.title : '',
      description: bug ? bug.description : '',
      priority: bug ? bug.priority : 'Low',
    },
  });

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    if (bug) {
      await updateBug(projectId, bug.id, {
        title: data.title,
        description: data.description,
        priority: data.priority,
      });
    } else {
      await createBug(projectId, {
        title: data.title,
        description: data.description,
        priority: data.priority,
      });
    }
    setLoading(false);
    reset(); // Reset the form values
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='primary'
          disabled={bug?.isResolved}
          leftIcon={bug ? PencilLine : undefined}
          onClick={() => {
            reset({
              title: bug ? bug.title : '',
              description: bug ? bug.description : '',
              priority: bug ? bug.priority : 'Low',
            });
          }}
        >
          {bug ? 'Update Bug Info' : 'Create Bug'}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] dark:border-none dark:bg-slate-700'>
        <DialogHeader>
          <DialogTitle className='dark:text-white'>Update a Bug</DialogTitle>
          <DialogDescription>
            Fill in the details to {bug ? 'update' : 'create'} a bug. Click save
            when youre done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-4 py-2'>
            <div className='flex flex-col items-center justify-center'>
              <Label
                htmlFor='title'
                className='self-start whitespace-nowrap pb-2 text-right dark:text-white'
              >
                Bug Title
              </Label>
              <Input
                {...register('title', { required: 'Title is required.' })}
                className='my-1 focus:border-0 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:bg-gray-600'
              />
              {errors.title && (
                <p className='self-start text-xs text-red-500'>
                  {errors.title.message}
                </p>
              )}
              <Label
                htmlFor='description'
                className='self-start whitespace-nowrap pb-2 pt-3 text-right dark:text-white'
              >
                Bug Description
              </Label>
              <Input
                {...register('description', {
                  required: 'Description is required.',
                })}
                className='my-1 focus:border-0 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:bg-gray-600'
              />
              {errors.description && (
                <p className='self-start text-xs text-red-500'>
                  {errors.description.message}
                </p>
              )}
              <Label
                htmlFor='priority'
                className='self-start whitespace-nowrap pb-2 pt-3 text-right dark:text-white'
              >
                Bug Priority
              </Label>
              <Controller
                name='priority'
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className='my-3 w-full dark:text-white'>
                      <SelectValue placeholder='Select Priority...' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Low'>Low</SelectItem>
                      <SelectItem value='Medium'>Medium</SelectItem>
                      <SelectItem value='High'>High</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
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

export default ModifyBug;
