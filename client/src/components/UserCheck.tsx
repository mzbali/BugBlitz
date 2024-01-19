import { useSession } from 'next-auth/react';

import { Member } from '@/models/types';

interface Props {
  user: Member;
  children: React.ReactNode;
}

const UserCheck: React.FC<Props> = ({ user, children }) => {
  const { data: session } = useSession(); // replace with your actual context

  if (session?.user?.username === user.username) {
    return <>{children}</>;
  }

  return <></>;
};

export default UserCheck;
