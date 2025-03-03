import { STORAGE_PATH } from '@/constants/storagePath';
import Image from 'next/image';
import {
  MdDashboard,
  MdHelpCenter,
  MdOutlineSettings,
  MdShoppingBag,
  MdSupervisedUserCircle,
} from 'react-icons/md';
import MenuLink from './MenuLink/MenuLink';
import styles from './Sidebar.module.css';

const menuItems = [
  {
    title: 'Pages',
    list: [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <MdDashboard />,
      },
      {
        title: 'Users',
        path: '/dashboard/users',
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: 'Courses',
        path: '/dashboard/courses',
        icon: <MdShoppingBag />,
      },
    ],
  },
  {
    title: 'User',
    list: [
      {
        title: 'Settings',
        path: '/dashboard/settings',
        icon: <MdOutlineSettings />,
      },
      {
        title: 'Help',
        path: '/dashboard/help',
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={STORAGE_PATH + '/images/users/unknown.webp'}
          alt=""
          width={50}
          height={50}
        />
        <div className={styles.userDetails}>
          <span className={styles.username}>Walid Mohamed</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className="mt-4">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink key={item.title} item={item} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
