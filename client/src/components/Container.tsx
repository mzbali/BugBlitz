import React from 'react';

import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}
const Container = ({ children, className }: Props) => {
  return (
    <main
      className={cn(
        'mx-auto flex min-h-screen flex-col pt-16 text-black shadow-2xl dark:text-slate-100 sm:px-8 md:w-[90%]',
        className,
      )}
    >
      {children}
    </main>
  );
};
export default Container;
