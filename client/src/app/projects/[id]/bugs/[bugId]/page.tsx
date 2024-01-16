import React from 'react';

import { cn, formatDate } from '@/lib/utils';

import BugActions from '@/components/BugActions';
import Container from '@/components/Container';
import Notes from '@/components/Notes';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { getBug } from '@/app/actions';
import { BugDetails } from '@/models/types';

type Props = {
  params: { id: string; bugId: string };
};

const Page = async ({ params }: Props) => {
  const bug: BugDetails = await getBug(params.id, params.bugId);
  return (
    <Container className='items-center justify-start'>
      <Card className='mb-4 mt-6 w-full items-center justify-start bg-white p-4 shadow-md dark:bg-slate-800'>
        <CardHeader>
          <CardTitle className='flex items-center text-gray-900 dark:text-gray-100'>
            {bug.title}
          </CardTitle>
          <Separator className='my-4 dark:bg-gray-700' />
          <h6>{bug.description}</h6>
          <CardDescription className='space-y-1 text-gray-800 dark:text-gray-200'>
            <span>Author: </span>
            <span className='font-bold'>{bug.createdBy.username}</span>
            <div>
              <span>Status: </span>
              <span>
                <Badge
                  className={cn(
                    bug.isResolved
                      ? 'bg-green-500 hover:bg-green-500'
                      : 'bg-indigo-500 hover:bg-indigo-500',
                  )}
                >
                  {bug.isResolved ? 'Resolved' : 'Open'}
                </Badge>
              </span>
            </div>
            <div>
              <span>Priority: </span>
              <span>
                <Badge
                  className={cn(
                    bug.priority === 'Low'
                      ? 'bg-green-500 hover:bg-green-500'
                      : bug.priority === 'Medium'
                        ? 'bg-yellow-500 hover:bg-yellow-500'
                        : bug.priority === 'High'
                          ? 'bg-red-500 hover:bg-red-500'
                          : 'bg-gray-500 hover:bg-gray-500',
                  )}
                >
                  {bug.priority}
                </Badge>
              </span>
            </div>
            <span className='block'>
              Created At: {formatDate(bug.createdAt)}
            </span>
            {bug.isResolved && bug.closedBy && bug.closedAt && (
              <p className='block'>
                Closed By:{' '}
                <span className='font-bold'>{bug.closedBy.username}</span> at{' '}
                {formatDate(bug.closedAt)}
              </p>
            )}
            {!bug.isResolved && bug.reopenedBy && bug.reopenedAt && (
              <p className='block'>
                Reopened By:{' '}
                <span className='font-bold'>{bug.reopenedBy.username}</span> at{' '}
                {formatDate(bug.reopenedAt)}
              </p>
            )}
            {bug.updatedBy && bug.updatedAt && (
              <p className='block'>
                Last Updated By:{' '}
                <span className='font-bold'>{bug.updatedBy.username}</span>{' '}
                {formatDate(bug.updatedAt)}
              </p>
            )}
          </CardDescription>
          <div className='mt-2 space-x-2'>
            <BugActions bug={bug} />
          </div>
        </CardHeader>
      </Card>
      <Notes bug={bug} />
    </Container>
  );
};
export default Page;
