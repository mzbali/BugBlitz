import { ChevronDownIcon, ChevronRightIcon, X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { getInitials } from '@/lib/utils';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';

import { getUsers } from '@/app/actions';
import { User } from '@/models/types';

const MemberChip = ({
  member,
  onRemove,
}: {
  member: User;
  onRemove: () => void;
}) => (
  <div className='flex h-8 w-auto items-center gap-1 rounded-full bg-indigo-100 p-1 text-sm font-medium text-indigo-700'>
    <Avatar className='h-6 w-6'>
      <AvatarFallback className='text-xs'>
        {getInitials(member.fullName)}
      </AvatarFallback>
    </Avatar>
    {member.username}
    <button
      className='rounded-full pt-0.5 text-indigo-500 hover:bg-indigo-200'
      onClick={onRemove}
    >
      <X className='h-4 w-4' />
    </button>
  </div>
);

const ComboBox = ({ name }: { name: string }) => {
  const { control, watch } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const selectedMembers = watch(name); // Get current value of the field

  const [memberData, setMemberData] = useState<User[] | null>(null);
  const [isLoading, setLoading] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const filteredMembers = useMemo(
    () =>
      memberData?.filter(
        (member) => !selectedMembers?.includes(member.username),
      ),
    [selectedMembers, memberData],
  );

  useEffect(() => {
    getUsers().then((data) => {
      console.log(data);
      setMemberData(data);
      setLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!memberData) return <p>No User data</p>;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <div>
          <Label className='dark:text-white'>Select Members</Label>
          <div className='mt-2 flex justify-between rounded border p-2 focus:border focus:border-indigo-500 dark:bg-gray-600'>
            <div className='flex flex-1 flex-wrap gap-1'>
              {field.value.map((username: string) => {
                const member = memberData.find((m) => m.username === username);
                return (
                  member && (
                    <MemberChip
                      key={member.username}
                      member={member}
                      onRemove={() => {
                        const newVal = field.value.filter(
                          (u: string) => u !== username,
                        );
                        field.onChange(newVal);
                      }}
                    />
                  )
                );
              })}
              <input
                type='text'
                value={inputValue}
                onChange={handleInputChange}
                className='h-8 w-16 flex-1 flex-grow border-none focus:border-0 focus:outline-none focus:ring-0 dark:bg-gray-600'
              />
            </div>
            <button
              className='flex items-center gap-2 border-l p-1 text-sm text-indigo-500 dark:border-gray-500 dark:text-white'
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <ChevronDownIcon className='cursor-pointer' />
              ) : (
                <ChevronRightIcon className='cursor-pointer' />
              )}
            </button>
          </div>
          {isOpen && (
            <div className='absolute mt-1 w-[89%] rounded-md bg-white text-gray-900 shadow-lg dark:bg-slate-800 dark:text-white'>
              <ul
                aria-activedescendant='listbox-item-3'
                aria-labelledby='listbox-label'
                className='max-h-60 overflow-auto rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                role='listbox'
                tabIndex={-1}
              >
                {filteredMembers && filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <li
                      key={member.username}
                      className='relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-indigo-100 dark:hover:bg-indigo-500'
                      onClick={() => {
                        const newVal = [...field.value, member.username];
                        field.onChange(newVal);
                        setInputValue('');
                        setIsOpen(false);
                      }}
                    >
                      {member.fullName}
                    </li>
                  ))
                ) : (
                  <li className='relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900'>
                    No members found
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default ComboBox;
