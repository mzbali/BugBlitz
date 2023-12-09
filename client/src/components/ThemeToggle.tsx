'use client';
import useThemeSwitcher from '@/hooks/useThemeSwitcher';

import { Switch } from '@/components/ui/switch';

const ThemeToggle = () => {
  const [theme, setTheme] = useThemeSwitcher();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme}>
      <span className='sr-only'>Theme Changer ({theme})</span>
    </Switch>
  );
};

export default ThemeToggle;
