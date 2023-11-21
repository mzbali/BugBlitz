import React from 'react';

import Checkbox from '@/components/CheckBox';
import InputField from '@/components/InputField';
import Button from '@/components/ui/buttons/Button';

const SignInForm = () => (
  <form className='space-y-4 md:space-y-6' action='#'>
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
    <Checkbox id='remember' label='Remember me' />
    <Button type='submit' className='w-full justify-center'>
      Sign In
    </Button>
  </form>
);

export default SignInForm;
