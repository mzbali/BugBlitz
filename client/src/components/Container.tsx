import React from 'react';

interface Props {
  children: React.ReactNode;
}
const Container = ({ children }: Props) => {
  return (
    <main className='mx-auto flex min-h-screen flex-col items-center justify-center text-black shadow-2xl dark:text-slate-100 sm:px-8 md:w-[90%]'>
      {children}
    </main>
  );
};
export default Container;
