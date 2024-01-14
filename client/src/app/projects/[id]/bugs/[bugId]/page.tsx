import React from 'react';

import { cn, formatDate } from '@/lib/utils';

import BugActions from '@/components/BugActions';
import Container from '@/components/Container';
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
            <p>
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
            </p>
            <p>
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
            </p>
            <span className='block'>
              Created At: {formatDate(bug.createdAt)}
            </span>
          </CardDescription>
          <div className='mt-2 space-x-2'>
            <BugActions bug={bug} />
          </div>
        </CardHeader>
      </Card>
    </Container>
  );
};
export default Page;
