'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { CogIcon, LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

import { getInitials } from '@/lib/utils';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import TextButton from './ui/buttons/TextButton';

const pathnames = ['/', '/components'];

const MenuButton = () => {
  const { status, data } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated' && !pathnames.includes(pathname)) {
      return router.push('/api/auth/signin');
    }
  }, [status, router, pathname]);

  if (status === 'loading') {
    return <>...</>;
  }

  if (status === 'authenticated')
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className='focus:outline-none'>
          <Avatar>
            <AvatarFallback className='dark:bg-slate-500 dark:text-gray-300'>
              {getInitials(data.user.name || '')}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-32 rounded-md bg-white p-1 shadow-lg dark:bg-slate-800 dark:text-white'>
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
          <DropdownMenuItem
            onClick={() => signOut()}
            className='rounded-md p-2 pb-1 hover:cursor-pointer hover:bg-red-300 dark:hover:text-black'
          >
            <button>
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
    <TextButton className='mr-3' onClick={() => signIn('zitadel')}>
      Sign in
    </TextButton>
  );
};

export default MenuButton;
