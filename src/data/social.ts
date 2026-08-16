import type { IconName } from '@/components/icons';

export interface SocialLink {
  icon: IconName;
  href: string;
  label: string;
}

export const socialLinks: SocialLink[] = [
  { icon: 'github', href: 'https://github.com/oto-macenauer', label: 'GitHub' },
  {
    icon: 'linkedin',
    href: 'https://linkedin.com/in/oto-macenauer-574a844b',
    label: 'LinkedIn',
  },
  {
    icon: 'bluesky',
    href: 'https://bsky.app/profile/otomacenauer.bsky.social',
    label: 'Bluesky',
  },
  { icon: 'globe', href: 'https://macenauer.net', label: 'Website' },
];
