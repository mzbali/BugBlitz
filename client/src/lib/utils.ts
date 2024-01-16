import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getInitials = (name: string) => {
  if (!name) return 'na';
  const names = name.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const formatDate = (
  updatedAt: string | null,
  relativeTime?: boolean,
): string => {
  if (!updatedAt) return 'n/a';

  const now = Date.now();
  const updated = new Date(updatedAt).getTime();
  const diffInMinutes = Math.round((now - updated) / 1000 / 60);

  if (relativeTime) {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (diffInMinutes < 60) {
      return rtf.format(-diffInMinutes, 'minute');
    } else if (diffInMinutes < 60 * 24) {
      return rtf.format(-Math.round(diffInMinutes / 60), 'hour');
    } else {
      return rtf.format(-Math.round(diffInMinutes / 60 / 24), 'day');
    }
  } else {
    return new Intl.DateTimeFormat('default', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(updatedAt));
  }
};
