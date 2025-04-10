/* eslint-disable @typescript-eslint/no-explicit-any */
import { STORAGE_PATH } from '@/constants/storagePath';
import Pagination from '@/features/dashboard/components/Pagination/Pagination';
import Search from '@/features/dashboard/components/Search/Search';
import styles from '@/features/dashboard/components/Users/users.module.css';
import { deleteUser } from '@/lib/actions';
import { fetchUsers } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

const Users = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: number }>;
}) => {
  const params = await searchParams;
  const q = params?.q || '';
  const page = params?.page || 1;
  const { count, users } = await fetchUsers(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Create User</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={
                      user.profilePicture.length > 0
                        ? user.profilePicture
                        : STORAGE_PATH + '/images/users/unknown.webp'
                    }
                    alt="user"
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.createdAt?.toString().slice(4, 16) || null}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={user._id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default Users;
