import Link from 'next/link';
import React from 'react';

import MenuButton from '@/components/MenuButton';
import ThemeToggle from '@/components/ThemeToggle';

import BB from '~/svg/BB.svg';

const NavBar = () => {
  return (
    <nav className='fixed start-0 top-0 z-20 w-full border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-800'>
      <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
        <Link
          href='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <BB className='h-8' />
          <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>
            BugBlitz
          </span>
        </Link>
        <div className='flex items-center justify-center'>
          <MenuButton />
          <div className='w-2' />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
