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
        <section>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <Logo />
                <Card>
                    <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
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
        </section>
    );
};

export default LoginPage;
