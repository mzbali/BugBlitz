import { ScrollText } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React from 'react';

import Container from '@/components/Container';
import ModifyBug from '@/components/ModifyBug';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';

import { getProject } from '@/app/actions';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { columns } from '@/app/projects/[id]/columns';
import { Project } from '@/models/types';

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const project: Project = await getProject(params.id, session || undefined);

  return (
    <Container className='items-center justify-start'>
      <Card className='mb-4 mt-6 w-full items-center justify-start bg-white shadow-md dark:bg-slate-800'>
        <CardHeader className='flex flex-row items-center'>
          <ScrollText className='h-auto w-32 rounded-none rounded-s-lg rounded-t-lg object-cover' />
          <div className='p-4'>
            <CardTitle>Bugs of {project.name}</CardTitle>
            <CardDescription className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
              All the Bugs. For {project.name}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
      <DataTable
        columns={columns}
        data={project.bugs}
        createComponent={<ModifyBug projectId={project.id.toString()} />}
      />
    </Container>
  );
};
export default Page;
