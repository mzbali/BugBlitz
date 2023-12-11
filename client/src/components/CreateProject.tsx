'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';

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

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleCreateProject = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (projectName) {
      console.log('Project created with name:', projectName);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='primary'>Create Project</Button>
      </DialogTrigger>
      <DialogContent className='dark:border-gray-800 sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='dark:text-white'>
            Create a new project
          </DialogTitle>
          <DialogDescription>
            Fill in the details to create a new project. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateProject}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label
                htmlFor='name'
                className='whitespace-nowrap text-right dark:text-white'
              >
                Project Name
              </Label>
              <Input
                id='name'
                value={projectName}
                onChange={handleChange}
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
