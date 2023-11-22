import React from 'react';

import BB from '~/svg/BB.svg';

const Logo = () => (
  <a
    href='#'
    className='flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
  >
    <BB className='w-8 h-8 mr-2 ' />
    BugBlitz
  </a>
);

export default Logo;
