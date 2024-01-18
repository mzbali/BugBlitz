import { Ban, XCircle } from 'lucide-react';
import React from 'react';

import { formatDate } from '@/lib/utils';

import IconButton from '@/components/ui/buttons/IconButton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { updateProject } from '@/app/actions';
import { Member, ProjectDetails } from '@/models/types';

interface Props {
  project: ProjectDetails;
}
const MembersTable = ({ project }: Props) => {
  const removeMember = async (member: Member) => {
    const updatedMembers = project.members.filter(
      (m) => m.username !== member.username,
    );
    const updatedProject = {
      members: updatedMembers.map((m) => m.username),
    };
    await updateProject(project.id, updatedProject);
  };
  return (
    <Table className='mt-8'>
      <TableHeader>
        <TableRow className='text-center'>
          <TableHead>Username</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead>Remove</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {project.members.map((member) => (
          <TableRow key={member.username} className='text-center'>
            <TableCell className='font-medium'>{member.username}</TableCell>
            <TableCell>
              {member.username === project.createdBy.username
                ? 'Admin'
                : 'Member'}
            </TableCell>
            <TableCell>{formatDate(member.joinedAt)}</TableCell>
            <TableCell>
              {member.username === project.createdBy.username ? (
                <IconButton
                  className='cursor-not-allowed bg-white text-xl hover:bg-white dark:hover:bg-gray-700'
                  variant='ghost'
                  icon={Ban}
                  title='Not allowed to delete admin.'
                />
              ) : (
                <IconButton
                  className='text-xl'
                  variant='ghost'
                  icon={XCircle}
                  onClick={() => removeMember(member)}
                  title='Delete Member'
                >
                  Remove
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default MembersTable;
