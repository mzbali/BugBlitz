import { Metadata } from 'next';
import * as React from 'react';

import AuthCheck from '@/components/auth/AuthCheck';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to Bugblitz',
};

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <AuthCheck>{children}</AuthCheck>;
};

export default Layout;
