import { ScrollText } from 'lucide-react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';

import Container from '@/components/Container';
import CreateProject from '@/components/CreateProject';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { getProjects } from '@/app/actions';
import { Project } from '@/models/types';

import { columns } from './columns';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { DataTable } from '../../components/ui/data-table';

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const data: Project[] = await getProjects();

  return (
    <Container className='items-center justify-start'>
      <Card className='mb-4 mt-6 w-full items-center justify-start bg-white shadow-md dark:bg-slate-800'>
        <CardHeader className='flex flex-row items-center'>
          <ScrollText className='h-auto w-32 rounded-none rounded-s-lg rounded-t-lg object-cover' />
          <div className='p-4'>
            <CardTitle>Project</CardTitle>
            <CardDescription className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
              All the projects you have access to.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
      <DataTable
        columns={columns}
        data={data}
        createComponent={<CreateProject />}
      />
    </Container>
  );
};
export default Page;
