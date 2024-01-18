'use client';
import React from 'react';

import ArrowLink from './ui/links/ArrowLink';

interface Props {
  projectId?: string;
  bugId?: string;
}

const BackLink = ({ projectId, bugId }: Props) => {
  let href = '/';
  let linkText = 'Back to Home';
  if (projectId && bugId) {
    href = `/projects/${projectId}`;
    linkText = 'Back to Bugs';
  } else if (projectId) {
    href = `/projects`;
    linkText = 'Back to Projects';
  }

  return (
    <ArrowLink direction='left' href={href} className='mt-4 self-start'>
      {linkText}
    </ArrowLink>
  );
};

export default BackLink;
