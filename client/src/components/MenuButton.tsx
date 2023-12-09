'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { CogIcon, LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

import TextButton from './ui/buttons/TextButton';
const MenuButton = () => {
  const { status } = useSession();

  if (status === 'loading') {
    return <>...</>;
  }

  if (status === 'authenticated')
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            className='rounded-full'
            src='/images/me.jpeg'
            alt='user photo'
            width={32}
            height={32}
          />
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
