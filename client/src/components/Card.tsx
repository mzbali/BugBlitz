import React from 'react';

interface ICard {
  children: React.ReactNode;
}

const Card = ({ children }: ICard) => (
  <div className='w-full overflow-auto rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
    <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>{children}</div>
  </div>
);

export default Card;
