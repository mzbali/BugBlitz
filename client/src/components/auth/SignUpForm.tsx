import React from 'react';

import Checkbox from '@/components/CheckBox';
import InputField from '@/components/InputField';
import Button from '@/components/ui/buttons/Button';

const SignInForm = () => (
  <form className='space-y-4 md:space-y-6' action='#'>
    <InputField
      label='Username'
      type='text'
      id='username'
      placeholder='Username'
    />
    <InputField
      label='Full Name'
      type='text'
      id='fullname'
      placeholder='Full Name'
    />
    <InputField
      label='Your email'
      type='email'
      id='email'
      placeholder='name@company.com'
    />
    <InputField
      label='Password'
      type='password'
      id='password'
      placeholder='••••••••'
    />
    <Checkbox id='terms' label='I agree to the terms and conditions' />
    <Button type='submit' className='w-full justify-center'>
      Sign In
    </Button>
  </form>
);

export default SignInForm;
