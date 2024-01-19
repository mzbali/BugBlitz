'use client';
import { ShieldCheck, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import ModifyBug from '@/components/ModifyBug';
import Button from '@/components/ui/buttons/Button';
import UserCheck from '@/components/UserCheck';

import { closeBug, deleteBug, reopenBug } from '@/app/actions';
import { BugDetails } from '@/models/types';

interface Props {
  bug: BugDetails;
}

const BugActions: React.FC<Props> = ({ bug }) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [bugStatusLoading, setBugStatusLoading] = React.useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteBug(bug.projectId, bug.id);
    router.push(`/projects/${bug.projectId}`);
    setLoading(false);
  };

  const handleBugStatus = async () => {
    setBugStatusLoading(true);
    bug.isResolved
      ? await reopenBug(bug.projectId, bug.id)
      : await closeBug(bug.projectId, bug.id);
    setBugStatusLoading(false);
  };

  return (
    <>
      <Button
        leftIcon={ShieldCheck}
        onClick={handleBugStatus}
        isLoading={bugStatusLoading}
      >
        {bug.isResolved ? 'Reopen Bug' : 'Close Bug'}
      </Button>
      <ModifyBug bug={bug} projectId={bug.projectId} />
      <UserCheck user={bug.createdBy}>
        <Button leftIcon={Trash} onClick={handleDelete} isLoading={loading}>
          Delete Bug
        </Button>
      </UserCheck>
    </>
  );
};

export default BugActions;
