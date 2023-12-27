'use client';
import { DialogClose } from '@radix-ui/react-dialog';
import { Pencil } from 'lucide-react';
import React from 'react';

import Button from '@/components/ui/buttons/Button';
import IconButton from '@/components/ui/buttons/IconButton';
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

import { updateProject } from '@/app/actions';
import { Project } from '@/models/types';

interface Props {
  project: Project;
}

const ProjectRename: React.FC<Props> = ({ project }) => {
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState(project.name);
  const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await updateProject(project.id, { name, members: [] });
    console.log(name);
    setLoading(false);
  };
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconButton
          icon={Pencil}
          variant='ghost'
          className='ml-1 h-1 w-1 dark:hover:bg-slate-700'
        />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] dark:border-none dark:bg-slate-700'>
        <DialogHeader>
          <DialogTitle className='dark:text-white'>
            Update Project Name
          </DialogTitle>
          <DialogDescription>
            Update the name of this project.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <Label
            htmlFor='title'
            className='self-start whitespace-nowrap text-right dark:text-white'
          >
            Project Name
          </Label>
          <Input
            onChange={changeHandler}
            className='my-3 focus:border-0 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:bg-gray-600'
            defaultValue={project.name}
          />
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

export default ProjectRename;
