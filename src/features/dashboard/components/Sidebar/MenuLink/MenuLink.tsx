'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './MenuLink.module.css';

interface MenuItem {
  path: string;
  icon: React.ReactNode;
  title: string;
}

const MenuLink = ({ item }: { item: MenuItem }) => {
  const pathname = usePathname();
  const isActive = pathname === item.path;
  return (
    <Link
      href={item.path}
      className={`${styles.container} ${isActive && styles.active}`}
    >
      {item.icon}
      <span>{item.title}</span>
    </Link>
  );
};

export default MenuLink;
