'use client';
import { Switch } from '@headlessui/react';

import useThemeSwitcher from '@/hooks/useThemeSwitcher';

const ThemeToggle = () => {
    const [theme, setTheme] = useThemeSwitcher();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <Switch
            checked={theme === 'dark'}
            onChange={toggleTheme}
            className={`${
                theme === 'dark' ? 'bg-indigo-400' : 'bg-yellow-300'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
            <span className='sr-only'>Theme Changer ({theme})</span>
            <span
                className={`${
                    theme === 'dark'
                        ? 'translate-x-6  bg-slate-300'
                        : 'translate-x-1 bg-indigo-900'
                } inline-block h-4 w-4 transform rounded-full transition`}
            />
        </Switch>
    );
};

export default ThemeToggle;
