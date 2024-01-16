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
        'mx-auto flex min-h-screen flex-col pt-16 text-black sm:px-8 md:w-[90%] dark:text-slate-100',
        className,
      )}
    >
      {children}
    </main>
  );
};
export default Container;
