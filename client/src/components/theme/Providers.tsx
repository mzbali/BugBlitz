'use client';

import { ThemeProvider } from 'next-themes';

interface IProviders {
    children: React.ReactNode;
}

const Providers = ({ children }: IProviders) => {
    return <ThemeProvider attribute='class'>{children}</ThemeProvider>;
};
export default Providers;
