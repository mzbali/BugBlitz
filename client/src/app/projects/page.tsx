import { ScrollText } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React from 'react';

import Container from '@/components/Container';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { columns, Project } from './columns';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { DataTable } from '../../components/ui/data-table';

const Page = async () => {
  const session = await getServerSession(authOptions);
  const res = await fetch('https://localhost:5000/api/Projects', {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const data: Project[] = await res.json();

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
      <DataTable columns={columns} data={data} />
    </Container>
  );
};
export default Page;
