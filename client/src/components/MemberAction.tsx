'use client';
import { DialogClose } from '@radix-ui/react-dialog';
import { UserRoundPlus } from 'lucide-react';
import React from 'react';
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

import { updateProject } from '@/app/actions';
import { ProjectDetails } from '@/models/types';

interface Props {
  project: ProjectDetails;
}

const MemberAction: React.FC<Props> = ({ project }) => {
  const [loading, setLoading] = React.useState(false);
  const methods = useForm({
    defaultValues: {
      selectedMembers: project ? project.members.map((m) => m.username) : [],
    },
  });
  const submitHandler = async (data: { selectedMembers: string[] }) => {
    setLoading(true);
    console.log(data.selectedMembers);
    await updateProject(project.id, { members: data.selectedMembers });
    setLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button leftIcon={UserRoundPlus}>Add Members</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] dark:border-none dark:bg-slate-700'>
        <DialogHeader>
          <DialogTitle className='dark:text-white'>
            Update Project Members
          </DialogTitle>
          <DialogDescription>
            Update the member of this project.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submitHandler)}>
            <ComboBox name='selectedMembers' />
            <DialogFooter>
              <DialogClose asChild>
                <Button isLoading={loading} type='submit' className='mt-2'>
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

export default MemberAction;
