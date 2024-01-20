import React from 'react';

interface IInputField {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  required?: boolean;
}

const InputField = ({
  label,
  type,
  id,
  placeholder,
  required,
}: IInputField) => (
  <div>
    <label
      htmlFor={id}
      className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
    >
      {label}
    </label>
    <input
      type={type}
      name={id}
      id={id}
      placeholder={placeholder}
      className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
      required={required}
    />
  </div>
);

export default InputField;
