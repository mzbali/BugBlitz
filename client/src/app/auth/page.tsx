'use client';
import React, { useState } from 'react';

import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';
import Card from '@/components/Card';
import Logo from '@/components/Logo';
import TextButton from '@/components/ui/buttons/TextButton';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className='flex h-1/6 w-full flex-col items-center px-6 py-8 lg:py-0'>
      <Card>
        <Logo />
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
          {isSignUp ? 'Sign Up' : 'Sign in to your account'}
        </h1>
        {isSignUp ? <SignUpForm /> : <SignInForm />}
        <TextButton
          onClick={toggleForm}
          variant='basic'
          className='dark:text-gray-400 hover:dark:text-gray-300'
        >
          {isSignUp
            ? 'Already have an account? Sign In'
            : "Don't have an account? Sign Up"}
        </TextButton>
      </Card>
    </div>
  );
};

export default LoginPage;
