import Link from 'next/link';
import React from 'react';

import MenuButton from '@/components/MenuButton';
import ThemeToggle from '@/components/ThemeToggle';

import BB from '~/svg/BB.svg';

const NavBar = () => {
  return (
    <nav className='bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 fixed w-full z-20 top-0 start-0'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link
          href='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <BB className='h-8' />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            BugBlitz
          </span>
        </Link>
        <div className='flex justify-center items-center'>
          <MenuButton />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
