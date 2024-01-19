'use client';

import { useSession } from 'next-auth/react';

interface AuthCheckProps {
  children: React.ReactNode;
  justCheck?: boolean;
  inverse?: boolean;
}

export default function AuthCheck({
  children,
  justCheck = false,
  inverse = false,
}: AuthCheckProps) {
  const { status } = useSession();

  const isAuthenticated = inverse
    ? status !== 'authenticated'
    : status === 'authenticated';

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return justCheck ? <></> : <p>Not logged in to see this</p>;
  }
}
