'use client';

import clsx from 'clsx';
import {
  ArrowRight,
  CreditCard,
  Laptop,
  Phone,
  Plus,
  Shield,
} from 'lucide-react';
import React from 'react';

import useThemeSwitcher from '@/hooks/useThemeSwitcher';

import NextImage from '@/components/NextImage';
import Skeleton from '@/components/Skeleton';
import Button from '@/components/ui/buttons/Button';
import IconButton from '@/components/ui/buttons/IconButton';
import TextButton from '@/components/ui/buttons/TextButton';
import ArrowLink from '@/components/ui/links/ArrowLink';
import ButtonLink from '@/components/ui/links/ButtonLink';
import PrimaryLink from '@/components/ui/links/PrimaryLink';
import UnderlineLink from '@/components/ui/links/UnderlineLink';
import UnstyledLink from '@/components/ui/links/UnstyledLink';

export default function ComponentPage() {
  const [theme, setTheme] = useThemeSwitcher();
  function toggletheme() {
    return theme === 'dark' ? setTheme('light') : setTheme('dark');
  }

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <main>
      <section>
        <div className='layout min-h-screen py-20 text-dark dark:text-gray-200'>
          <h1>Built-in Components</h1>
          <ArrowLink direction='left' className='mt-2' href='/'>
            Back to Home
          </ArrowLink>

          <div className='mt-8 flex flex-wrap gap-2'>
            <Button
              onClick={toggletheme}
              variant={theme === 'dark' ? 'light' : 'dark'}
            >
              Set to {theme === 'dark' ? 'light' : 'dark'}
            </Button>
            {/* <Button onClick={randomize}>Randomize CSS Variable</Button> */}
          </div>

          <ol className='mt-8 space-y-6'>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>Customize Colors</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                You can change primary color to any Tailwind CSS colors. See
                globals.css to change your color.
              </p>
              <div className='flex flex-wrap gap-2'>
                <ButtonLink href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter/blob/main/src/styles/colors.css'>
                  Check list of colors
                </ButtonLink>
              </div>
              <div className='flex flex-wrap gap-2 text-xs font-medium'>
                <div className='bg-primary-50 flex h-10 w-10 items-center justify-center rounded text-black'>
                  50
                </div>
                <div className='bg-primary-100 flex h-10 w-10 items-center justify-center rounded text-black'>
                  100
                </div>
                <div className='bg-primary-200 flex h-10 w-10 items-center justify-center rounded text-black'>
                  200
                </div>
                <div className='bg-primary-300 flex h-10 w-10 items-center justify-center rounded text-black'>
                  300
                </div>
                <div className='bg-primary-400 flex h-10 w-10 items-center justify-center rounded text-black'>
                  400
                </div>
                <div className='bg-primary-500 flex h-10 w-10 items-center justify-center rounded text-black'>
                  500
                </div>
                <div className='bg-primary-600 flex h-10 w-10 items-center justify-center rounded text-white'>
                  600
                </div>
                <div className='bg-primary-700 flex h-10 w-10 items-center justify-center rounded text-white'>
                  700
                </div>
                <div className='bg-primary-800 flex h-10 w-10 items-center justify-center rounded text-white'>
                  800
                </div>
                <div className='bg-primary-900 flex h-10 w-10 items-center justify-center rounded text-white'>
                  900
                </div>
                <div className='bg-primary-950 flex h-10 w-10 items-center justify-center rounded text-white'>
                  950
                </div>
              </div>
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>UnstyledLink</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                No style applied, differentiate internal and outside links, give
                custom cursor for outside links.
              </p>
              <div className='space-x-2'>
                <UnstyledLink href='/'>Internal Links</UnstyledLink>
                <UnstyledLink href='https://mzbali.com'>
                  Outside Links
                </UnstyledLink>
              </div>
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>PrimaryLink</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                Add styling on top of UnstyledLink, giving a primary color to
                the link.
              </p>
              <div className='space-x-2'>
                <PrimaryLink href='/'>Internal Links</PrimaryLink>
                <PrimaryLink href='https://mzbali.com'>
                  Outside Links
                </PrimaryLink>
              </div>
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>UnderlineLink</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                Add styling on top of UnstyledLink, giving a dotted and animated
                underline.
              </p>
              <div className='space-x-2'>
                <UnderlineLink href='/'>Internal Links</UnderlineLink>
                <UnderlineLink href='https://mzbali.com'>
                  Outside Links
                </UnderlineLink>
              </div>
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>ArrowLink</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                Useful for indicating navigation, I use this quite a lot, so why
                not build a component with some whimsy touch?
              </p>
              <div className='flex flex-wrap items-center gap-4'>
                <ArrowLink href='/' direction='left'>
                  Direction Left
                </ArrowLink>
                <ArrowLink href='/'>Direction Right</ArrowLink>
                <ArrowLink
                  as={UnstyledLink}
                  className='inline-flex items-center'
                  href='/'
                >
                  Polymorphic
                </ArrowLink>
                <ArrowLink
                  as={ButtonLink}
                  variant='light'
                  className='inline-flex items-center'
                  href='/'
                >
                  Polymorphic
                </ArrowLink>
              </div>
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>ButtonLink</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                Button styled link with 3 variants.
              </p>
              <div className='flex flex-wrap gap-2'>
                <ButtonLink variant='primary' href='https://mzbali.com'>
                  Primary Variant
                </ButtonLink>
                <ButtonLink
                  variant='outline'
                  isDarkBg={theme === 'dark'}
                  href='https://mzbali.com'
                >
                  Outline Variant
                </ButtonLink>
                <ButtonLink
                  variant='ghost'
                  isDarkBg={theme === 'dark'}
                  href='https://mzbali.com'
                >
                  Ghost Variant
                </ButtonLink>
                <ButtonLink variant='dark' href='https://mzbali.com'>
                  Dark Variant
                </ButtonLink>
                <ButtonLink variant='light' href='https://mzbali.com'>
                  Light Variant
                </ButtonLink>
              </div>
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>Button</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                Ordinary button with style.
              </p>
              <div className='flex flex-wrap gap-2'>
                <Button variant='primary'>Primary Variant</Button>
                <Button variant='outline' isDarkBg={theme === 'dark'}>
                  Outline Variant
                </Button>
                <Button variant='ghost' isDarkBg={theme === 'dark'}>
                  Ghost Variant
                </Button>
                <Button variant='dark'>Dark Variant</Button>
                <Button variant='light'>Light Variant</Button>
              </div>
              <div className='flex flex-wrap gap-2'>
                <Button
                  variant='primary'
                  leftIcon={Plus}
                  rightIcon={ArrowRight}
                >
                  Icon
                </Button>
                <Button
                  variant='outline'
                  leftIcon={Plus}
                  rightIcon={ArrowRight}
                  isDarkBg={theme === 'dark'}
                >
                  Icon
                </Button>
                <Button
                  variant='ghost'
                  leftIcon={Plus}
                  rightIcon={ArrowRight}
                  isDarkBg={theme === 'dark'}
                >
                  Icon
                </Button>
                <Button variant='dark' leftIcon={Plus} rightIcon={ArrowRight}>
                  Icon
                </Button>
                <Button variant='light' leftIcon={Plus} rightIcon={ArrowRight}>
                  Icon
                </Button>
              </div>
              <div className='!mt-4 flex flex-wrap gap-2'>
                <Button size='sm' variant='primary'>
                  Small Size
                </Button>
                <Button size='sm' variant='outline' isDarkBg={theme === 'dark'}>
                  Small Size
                </Button>
                <Button size='sm' variant='ghost' isDarkBg={theme === 'dark'}>
                  Small Size
                </Button>
                <Button size='sm' variant='dark'>
                  Small Size
                </Button>
                <Button size='sm' variant='light'>
                  Small Size
                </Button>
              </div>
              <div className='flex flex-wrap gap-2'>
                <Button
                  size='sm'
                  variant='primary'
                  leftIcon={Plus}
                  rightIcon={ArrowRight}
                >
                  Icon
                </Button>
                <Button
                  size='sm'
                  variant='outline'
                  leftIcon={Plus}
                  rightIcon={ArrowRight}
                  isDarkBg={theme === 'dark'}
                >
                  Icon
                </Button>
                <Button
                  size='sm'
                  variant='ghost'
                  leftIcon={Plus}
                  rightIcon={ArrowRight}
                  isDarkBg={theme === 'dark'}
                >
                  Icon
                </Button>

                <Button
                  size='sm'
                  variant='dark'
                  leftIcon={Plus}
                  rightIcon={ArrowRight}
                >
                  Icon
                </Button>
                <Button
                  size='sm'
                  variant='light'
                  leftIcon={Plus}
                  rightIcon={ArrowRight}
                >
                  Icon
                </Button>
              </div>

              <div className='!mt-4 flex flex-wrap gap-2'>
                <Button disabled variant='primary'>
                  Disabled
                </Button>
                <Button disabled variant='outline' isDarkBg={theme === 'dark'}>
                  Disabled
                </Button>
                <Button disabled variant='ghost' isDarkBg={theme === 'dark'}>
                  Disabled
                </Button>
                <Button disabled variant='dark'>
                  Disabled
                </Button>
                <Button disabled variant='light'>
                  Disabled
                </Button>
              </div>
              <div className='flex flex-wrap gap-2'>
                <Button isLoading variant='primary'>
                  Disabled
                </Button>
                <Button isLoading variant='outline' isDarkBg={theme === 'dark'}>
                  Disabled
                </Button>
                <Button isLoading variant='ghost' isDarkBg={theme === 'dark'}>
                  Disabled
                </Button>
                <Button isLoading variant='dark'>
                  Disabled
                </Button>
                <Button isLoading variant='light'>
                  Disabled
                </Button>
              </div>
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>TextButton</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                Button with a text style
              </p>
              <div className='space-x-2'>
                <TextButton>Primary Variant</TextButton>
                <TextButton variant='basic'>Basic Variant</TextButton>
              </div>
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>IconButton</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                Button with only icon inside
              </p>
              <div className='space-x-2'>
                <IconButton icon={Plus} />
                <IconButton variant='outline' icon={Laptop} />
                <IconButton variant='ghost' icon={Phone} />
                <IconButton variant='dark' icon={Shield} />
                <IconButton variant='light' icon={CreditCard} />
              </div>
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>Custom 404 Page</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                Styled 404 page with some animation.
              </p>
              <div className='flex flex-wrap gap-2'>
                <ButtonLink href='/404'>Visit the 404 page</ButtonLink>
              </div>
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>Next Image</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                Next Image with default props and skeleton animation
              </p>
              <NextImage
                useSkeleton
                className='w-32 md:w-40'
                src='/favicon/android-chrome-192x192.png'
                width='180'
                height='180'
                alt='Icon'
              />
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>Skeleton</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                Skeleton with shimmer effect
              </p>
              <Skeleton className='h-72 w-72' />
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
