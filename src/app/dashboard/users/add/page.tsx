import styles from '@/features/dashboard/components/Users/AddUser/AddUser.module.css';
import { addUser } from '@/lib/actions';

const AddUser = () => {
  return (
    <div className={styles.container}>
      <form action={addUser} className={styles.form}>
        <input type="text" placeholder="Username" name="username" required />
        <input type="email" placeholder="Email" name="email" required />
        <select name="role" id="role">
          <option value="general">Choose Role</option>
          <option value="superadmin">Super Admin</option>
          <option value="admin">Admin</option>
          <option value="content-manager">Content Manager</option>
          <option value="seeker">Seeker</option>
        </select>
        <select name="status" id="status">
          <option value="active" selected>
            Active
          </option>
          <option value="inactive">Inactive</option>
        </select>
        <input
          type="number"
          name="phone"
          id="phone"
          placeholder="Phone Number"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <textarea
          name="address"
          id="address"
          rows={6}
          placeholder="Address"
        ></textarea>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};
export default AddUser;
