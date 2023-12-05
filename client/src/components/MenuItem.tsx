import { Menu } from '@headlessui/react';
import Link from 'next/link';

import cn from '@/lib/cn';

interface IMenuItem {
  link: {
    href: string;
    label: string;
    icon: JSX.Element;
  };
  onClick?: () => void;
}

const MenuItem = ({ link, onClick }: IMenuItem) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          href={link.href}
          className={cn(
            active ? 'bg-primary-500' : 'text-gray-700',
            'block px-2 py-2 text-sm hover:bg-primary-500 hover:text-white',
          )}
          onClick={onClick ? onClick : undefined}
        >
          <div className='flex'>
            <div className='mr-2'>{link.icon}</div>
            {link.label}
          </div>
        </Link>
      )}
    </Menu.Item>
  );
};

export default MenuItem;
