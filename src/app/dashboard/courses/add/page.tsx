import styles from '@/features/dashboard/components/Courses/AddCourse/AddCourse.module.css';
import { addCourse } from '@/lib/actions';
import { fetchUsers } from '@/lib/data';

const AddCourse = async () => {
  const { users } = await fetchUsers();

  return (
    <div className={styles.container}>
      <form action={addCourse} className={styles.form}>
        <input type="text" placeholder="Title" name="title" required />
        <select name="cat" id="cat">
          <option value="general">Choose a Category</option>
          <option value="WebDev">Web Development</option>
          <option value="WebDev">Web Development</option>
          <option value="WebDev">Web Development</option>
          <option value="WebDev">Web Development</option>
        </select>
        <select name="instructor" id="instructor">
          <option value="general">Choose course instructor</option>
          {users.map((user) => (
            <option key={user._id} defaultValue={user._id}>
              {user.username}
            </option>
          ))}
          {/* <option value="Walid Mohamed">Walid Mohamed</option>
          <option value="Ahmed Mohamed">Ahmed Mohamed</option>
          <option value="Zyad Mohamed">Zyad Mohamed</option>
          <option value="Bassem Khaled">Bassem Khaled</option> */}
        </select>
        <input
          type="text"
          placeholder="Course Duration"
          name="duration"
          required
        />
        <input type="text" placeholder="Price" name="price" required />
        <select name="status" id="status">
          <option value="active" selected>
            Active
          </option>
          <option value="inactive">Inactive</option>
        </select>
        <textarea
          name="description"
          id="description"
          rows={16}
          placeholder="Description"
        ></textarea>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
