import { getServerSession } from 'next-auth';
import React from 'react';

import { formatDate } from '@/lib/utils';

import Container from '@/components/Container';
import ModifyBug from '@/components/ModifyBug';
import ProjectActions from '@/components/ProjectActions';
import ProjectRename from '@/components/ProjectRename';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';

import { getProject } from '@/app/actions';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { columns } from '@/app/projects/[id]/columns';
import { ProjectDetails } from '@/models/types';

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const project: ProjectDetails = await getProject(
    params.id,
    session || undefined,
  );

  return (
    <Container className='items-center justify-start'>
      <Card className='mb-4 mt-6 w-full items-center justify-start bg-white p-4 shadow-md dark:bg-slate-800'>
        <CardHeader>
          <CardTitle className='flex items-center text-gray-900 dark:text-gray-100'>
            {project.name} <ProjectRename project={project} />
          </CardTitle>
          <Separator className='my-4 dark:bg-gray-700' />
          <CardDescription className='text-gray-800 dark:text-gray-200'>
            <span>Admin: </span>
            <span className='font-bold'>{project.createdBy.username}</span>
            <span className='block'>
              Created At: {formatDate(project.createdAt)}
            </span>
          </CardDescription>
          <div className='mt-2 space-x-2'>
            <ProjectActions project={project} />
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
