import { Menu } from '@headlessui/react';
import Link from 'next/link';

import cn from '@/lib/cn';

interface IMenuItem {
    link: {
        href: string;
        label: string;
        icon: JSX.Element;
    };
}

const MenuItem = ({ link }: IMenuItem) => {
    return (
        <Menu.Item key={link.href}>
            {({ active }) => (
                <Link
                    href={link.href}
                    className={cn(
                        active ? 'bg-primary-500' : 'text-gray-700',
                        'block px-2 py-2 text-sm hover:text-white hover:bg-primary-500',
                    )}
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
