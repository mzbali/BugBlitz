'use client';
import { Check, ClipboardCopy } from 'lucide-react';
import { useState } from 'react';

interface Props {
  field: string;
  text: string;
}

const Copytext: React.FC<Props> = ({ text, field }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000); // Reset after 2 seconds
  };

  return (
    <code className='inline-flex items-center space-x-4 rounded-lg bg-slate-700 p-3 text-left text-sm text-white sm:text-base'>
      <span className='shrink-0 text-gray-500'>{'>'}</span>
      <span className='flex-1'>
        <span className='mr-4'>{field}</span>
        <span className='text-yellow-500'>{text}</span>
      </span>
      {copied ? (
        <Check />
      ) : (
        <ClipboardCopy
          className='cursor-pointer hover:cursor-pointer'
          onClick={handleCopy}
        />
      )}
    </code>
  );
};

export default Copytext;
