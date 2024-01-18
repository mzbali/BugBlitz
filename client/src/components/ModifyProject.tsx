'use client';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ComboBox from '@/components/ComboBox';
import DialogSubmitButton from '@/components/DialogSubmitButton';
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
import { Project } from '@/models/types';

interface Props {
  project?: Project;
  updateVariant?: boolean;
}

const ModifyProject = ({ project }: Props) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const methods = useForm({
    defaultValues: {
      name: project ? project.name : '',
      selectedMembers: project ? project.members.map((m) => m.username) : [],
    },
  });

  const onSubmit = async (data: {
    name: string;
    selectedMembers: string[];
  }) => {
    setLoading(true);
    if (data.selectedMembers.length === 0) {
      data.selectedMembers = [session?.user?.username || ''];
    }
    if (project) {
      await updateProject(project.id, {
        name: data.name,
        members: data.selectedMembers,
      });
    } else {
      await createProject({
        name: data.name,
        members: data.selectedMembers,
      });
    }
    setLoading(false);
    methods.reset(); // Reset the form values
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='primary'>Create Project</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] dark:border-none dark:bg-slate-700'>
        <DialogHeader>
          <DialogTitle className='dark:text-white'>
            Create a new project
          </DialogTitle>
          <DialogDescription>
            Fill in the details to create a new project. Click save when you're
            done.
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
                  {...methods.register('name', {
                    required: 'Name is required.',
                  })}
                  className='mb-1 focus:border-0 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:bg-gray-600'
                />
                {methods.formState.errors.name && (
                  <p className='self-start text-xs text-red-500'>
                    {methods.formState.errors.name.message}
                  </p>
                )}
              </div>
              <ComboBox name='selectedMembers' />
            </div>
            <DialogFooter>
              <DialogSubmitButton
                isValid={methods.formState.isValid}
                loading={loading}
              />
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyProject;
