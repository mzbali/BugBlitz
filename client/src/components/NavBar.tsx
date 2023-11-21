'use client';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { CogIcon, LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';

import ThemeToggle from '@/components/ThemeToggle';
import MenuItem from '@/components/ui/MenuItem';

import BB from '~/svg/BB.svg';

const links = [
    { href: '/settings', label: 'Settings', icon: <CogIcon /> },
    { href: '/sign-out', label: 'Sign out', icon: <LogOutIcon /> },
];

const NavBar = () => {
    return (
        <Disclosure
            as='nav'
            className='bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 fixed w-full z-20 top-0 start-0'
        >
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
                    <Menu as='div' className='relative ml-3 mr-2'>
                        <Menu.Button className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                            <span className='absolute -inset-1.5' />
                            <span className='sr-only'>Open user menu</span>
                            <Image
                                className='rounded-full'
                                src='/images/me.jpeg'
                                alt='user photo'
                                width={32}
                                height={32}
                            />
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter='transition ease-out duration-100'
                            enterFrom='transform opacity-0 scale-95'
                            enterTo='transform opacity-100 scale-100'
                            leave='transition ease-in duration-75'
                            leaveFrom='transform opacity-100 scale-100'
                            leaveTo='transform opacity-0 scale-95'
                        >
                            <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                {links.map((link) => (
                                    <MenuItem key={link.href} link={link} />
                                ))}
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <ThemeToggle />
                </div>
            </div>
        </Disclosure>
    );
};

export default NavBar;
