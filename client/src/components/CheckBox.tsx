import React from 'react';

interface ICheckbox {
  id: string;
  label: string;
}

const Checkbox = ({ id, label }: ICheckbox) => (
  <div className='flex items-start'>
    <div className='flex h-5 items-center'>
      <input
        id={id}
        aria-describedby={id}
        type='checkbox'
        className='focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600'
      />
    </div>
    <div className='ml-3 text-sm'>
      <label htmlFor={id} className='text-gray-500 dark:text-gray-300'>
        {label}
      </label>
    </div>
  </div>
);

export default Checkbox;
