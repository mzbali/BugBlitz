'use client';
import { DialogClose } from '@radix-ui/react-dialog';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

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
import { Bug, BugInputDto } from '@/models/types';

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
      priority: bug?.priority,
    },
  });

  const onSubmit = async (data: BugInputDto) => {
    setLoading(true);
    if (bug) {
      await updateBug(parseInt(projectId), parseInt(bug.id), {
        title: data.title,
        description: data.description,
        priority: data.priority,
      });
    } else {
      await createBug(parseInt(projectId), {
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
        <Button variant='primary'>Create Bug</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] dark:border-none dark:bg-slate-700'>
        <DialogHeader>
          <DialogTitle className='dark:text-white'>Update a Bug</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new bug. Click save when youre done.
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
                defaultValue='Low'
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className='my-3 w-full'>
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
