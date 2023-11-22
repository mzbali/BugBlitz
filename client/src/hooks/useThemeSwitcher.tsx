'use client';
import { useEffect, useState } from 'react';

import { getFromLocalStorage } from '@/lib/helper';

const useThemeSwitcher = () => {
  const isClient = typeof window !== 'undefined'; // Check if code is running on the client side
  const [theme, setTheme] = useState('');

  useEffect(() => {
    setTheme(isClient ? getFromLocalStorage('theme') || 'light' : 'light');
  }, [isClient]);

  const activeTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    if (isClient && theme) {
      const root = window.document.documentElement;
      root.classList.remove(activeTheme);
      root.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, activeTheme, isClient]);

  return [theme, setTheme] as const;
};

export default useThemeSwitcher;
