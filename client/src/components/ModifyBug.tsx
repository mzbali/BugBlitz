'use client';
import { DialogClose } from '@radix-ui/react-dialog';
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
import { Bug } from '@/models/types';

interface Props {
  bug?: Bug;
  projectId: string;
}

const ModifyBug = ({ bug, projectId }: Props) => {
  const [loading, setLoading] = useState(false);

  const methods = useForm({
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
    console.log(data);
    setLoading(false);
    methods.reset(); // Reset the form values
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='primary'
          leftIcon={bug ? PencilLine : undefined}
          onClick={() => {
            methods.reset({
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
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='grid gap-4 py-2'>
            <div className='flex flex-col items-center justify-center'>
              <Label
                htmlFor='title'
                className='self-start whitespace-nowrap text-right dark:text-white'
              >
                Bug Title
              </Label>
              <Input
                {...methods.register('title', { required: true })}
                className='my-3 focus:border-0 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:bg-gray-600'
              />
              <Label
                htmlFor='description'
                className='self-start whitespace-nowrap text-right dark:text-white'
              >
                Bug Description
              </Label>
              <Input
                {...methods.register('description', { required: true })}
                className='my-3 focus:border-0 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:bg-gray-600'
              />
              <Label
                htmlFor='priority'
                className='self-start whitespace-nowrap text-right dark:text-white'
              >
                Bug Priority
              </Label>
              <Controller
                name='priority'
                control={methods.control}
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
            <DialogClose asChild>
              <Button isLoading={loading} type='submit'>
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyBug;
