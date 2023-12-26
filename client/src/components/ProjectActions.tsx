'use client';
import { ChevronUp, Trash, UserRoundPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import Button from '@/components/ui/buttons/Button';

import { deleteProject } from '@/app/actions';
import MembersTable from '@/app/projects/[id]/MembersTable';
import { Project } from '@/models/types';

interface Props {
  project: Project;
}

const ProjectActions: React.FC<Props> = ({ project }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleDelete = async () => {
    setLoading(true);
    await deleteProject(project.id);
    router.push('/projects');
    setLoading(false);
  };

  return (
    <>
      <Button leftIcon={ChevronUp} variant='outline' onClick={toggleOpen}>
        View Members
      </Button>
      <Button leftIcon={UserRoundPlus}>Add Members</Button>
      <Button leftIcon={Trash} onClick={handleDelete} isLoading={loading}>
        Delete Project
      </Button>
      {isOpen && <MembersTable project={project} />}
    </>
  );
};

export default ProjectActions;
