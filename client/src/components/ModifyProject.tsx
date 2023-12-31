'use client';
import { DialogClose } from '@radix-ui/react-dialog';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ComboBox from '@/components/ComboBox';
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

import { createProject, updateProject } from '@/app/actions';
import { Member, Project } from '@/models/types';

interface Props {
  project?: Project;
  updateVariant?: boolean;
}

const ModifyProject = ({ project, updateVariant }: Props) => {
  const [loading, setLoading] = useState(false);
  const methods = useForm({
    defaultValues: {
      name: project ? project.name : '',
      selectedMembers: project ? project.members : [],
    },
  });

  const onSubmit = async (data: {
    name: string;
    selectedMembers: Member[];
  }) => {
    setLoading(true);
    if (project) {
      await updateProject(project.id, {
        name: data.name,
        members: data.selectedMembers as Member[],
      });
    } else {
      await createProject({
        name: data.name,
        members: data.selectedMembers as Member[],
      });
    }
    setLoading(false);
    methods.reset(); // Reset the form values
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='primary'>
          {updateVariant ? 'Update Project' : 'Create Project'}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] dark:border-none dark:bg-slate-700'>
        <DialogHeader>
          <DialogTitle className='dark:text-white'>
            Create a new project
          </DialogTitle>
          <DialogDescription>
            {`Fill in the details to ${
              updateVariant ? 'create a new ' : 'update'
            } project. Click save when you're
            done.`}
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className='grid gap-4 py-2'>
              <div className='flex flex-col items-center justify-center'>
                <Label
                  htmlFor='name'
                  className='mb-3 self-start whitespace-nowrap text-right dark:text-white'
                >
                  Project Name
                </Label>
                <Input
                  {...methods.register('name', { required: true })}
                  className='focus:border-0 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:bg-gray-600'
                />
              </div>
              <ComboBox name='selectedMembers' />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button isLoading={loading} type='submit'>
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyProject;
