import React from 'react';

interface Props {
  children: React.ReactNode;
}
const Container = ({ children }: Props) => {
  return (
    <main className='shadow-2xl mx-auto w-full lg:w-[90%]'>
      <section className='layout flex min-h-screen flex-col items-center justify-center text-center text-black dark:text-slate-100'>
        {children}
      </section>
    </main>
  );
};
export default Container;
