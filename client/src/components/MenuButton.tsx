'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { CogIcon, LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

import { getInitials } from '@/lib/utils';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import TextButton from './ui/buttons/TextButton';
const MenuButton = () => {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      console.log('No JWT');
      console.log(status);
      void signIn('keycloak');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <>...</>;
  }

  if (status === 'authenticated')
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className='focus:outline-none'>
          <Avatar>
            <AvatarFallback className='text-gray-300 dark:bg-slate-500'>
              {getInitials(data.user?.name || '')}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-32 rounded-md bg-white p-2 shadow-lg dark:bg-slate-800 dark:text-white'>
          <DropdownMenuItem className='rounded-md p-2 hover:bg-indigo-300 dark:hover:text-black'>
            <Link href='/'>
              <div className='flex'>
                <div className='mr-2'>
                  <CogIcon />
                </div>
                Home
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='rounded-md p-2 pb-1 hover:bg-red-300 dark:hover:text-black'>
            <button onClick={() => signOut()}>
              <div className='flex'>
                <div className='mr-2'>
                  <LogOutIcon />
                </div>
                Sign out
              </div>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  return (
    <TextButton className='mr-3' onClick={() => signIn()}>
      Sign in
    </TextButton>
  );
};

export default MenuButton;
