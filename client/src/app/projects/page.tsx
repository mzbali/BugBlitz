import { ScrollText } from 'lucide-react';
import React from 'react';

import BackLink from '@/components/BackLink';
import Container from '@/components/Container';
import ModifyProject from '@/components/ModifyProject';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';

import { getProjects } from '@/app/actions';
import { Project } from '@/models/types';

import { columns } from './columns';

const Page = async () => {
  const data: Project[] = await getProjects();

  return (
    <Container className='items-center justify-start'>
      <BackLink />
      <Card className='mb-4 mt-2 w-full items-center justify-start bg-white shadow-md dark:bg-slate-800'>
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
        createComponent={<ModifyProject />}
      />
    </Container>
  );
};
export default Page;
