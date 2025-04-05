import { STORAGE_PATH } from '@/constants/storagePath';
import styles from '@/features/dashboard/components/Users/UserInfo/UserInfo.module.css';
import { updateUser } from '@/lib/actions';
import { fetchUser } from '@/lib/data';
import Image from 'next/image';

const UserInfo = async ({ params }) => {
  const { id } = await params;
  const user = await fetchUser(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={
              user.profilePicture.length > 0
                ? user.profilePicture
                : STORAGE_PATH + '/images/users/unknown.webp'
            }
            alt="UserImg"
            fill
          />
        </div>
        {user.username}
      </div>
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type="hidden" name="id" value={user._id} />
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            defaultValue={user.username}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            defaultValue={user.email}
          />
          <label>Role</label>
          <select name="role" id="role" defaultValue={user.role}>
            <option value="general">Choose Role</option>
            <option value="superadmin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="content-manager">Content Manager</option>
            <option value="seeker">Seeker</option>
          </select>
          <label>Status</label>
          <select name="status" id="status" defaultValue={user.status}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <label>Password</label>
          <input
            type="password"
            placeholder="Set Password"
            name="password"
            defaultValue={user.password}
            required
          />
          <label>Phone No.</label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone No."
            defaultValue={user.phone}
          />
          <label>Address</label>
          <textarea
            name="address"
            id="address"
            rows={6}
            defaultValue={user.address}
          ></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
