'use client';

import { useSession } from 'next-auth/react';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  //console.log(session, status);

  if (status === 'authenticated') {
    return <>{children}</>;
  } else {
    return <p>Not logged in to see this</p>;
  }
}
