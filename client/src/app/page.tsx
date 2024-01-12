import React from 'react';

import Container from '@/components/Container';
import ArrowLink from '@/components/ui/links/ArrowLink';
import ButtonLink from '@/components/ui/links/ButtonLink';
import UnderlineLink from '@/components/ui/links/UnderlineLink';

import Logo from '~/svg/BB.svg';

const HomePage = async () => {
  return (
    <Container className='items-center justify-center'>
      <Logo className='w-16' />
      <h1 className='mt-4 text-gray-800 dark:text-white'>BugBlitz</h1>
      <p className='mt-2 text-sm text-dark  dark:text-gray-200'>
        A Bug Tracking App. Using .Net Core 8, Next.js, Tailwind CSS and
        TypeScript.
      </p>
      <p className='mt-2 text-sm text-gray-700 dark:text-gray-100'>
        <ArrowLink href='https://github.com/mzbali/BugBlitz'>
          See the repository
        </ArrowLink>
      </p>
      <ButtonLink className='mt-6' href='/components' variant='light'>
        See all components
      </ButtonLink>
      <ButtonLink className='mt-2' href='/projects' variant='primary'>
        See all Projects
      </ButtonLink>
      <footer className='absolute bottom-2 text-gray-700'>
        © {new Date().getFullYear()} By{' '}
        <UnderlineLink href='https://mzbali.com'>Mahmud Bali</UnderlineLink>
      </footer>
    </Container>
  );
};

export default HomePage;
