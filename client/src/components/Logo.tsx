import React from 'react';

import BB from '~/svg/BB.svg';

const Logo = () => (
  <a
    href='#'
    className='mb-6 flex items-center justify-center text-2xl font-semibold text-gray-900 dark:text-white'
  >
    <BB className='mr-2 h-8 w-8 ' />
    BugBlitz
  </a>
);

export default Logo;
