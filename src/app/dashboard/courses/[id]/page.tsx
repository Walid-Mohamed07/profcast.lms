import { ImagePath } from '@/constants/imagePath';
import styles from '@/features/dashboard/components/Courses/CourseInfo/CourseInfo.module.css';
import { updateCourse } from '@/lib/actions';
import { fetchCourse, fetchUsers } from '@/lib/data';
import Image from 'next/image';

const CourseInfo = async ({ params }) => {
  const { id } = await params;
  const { users } = await fetchUsers();
  const course = await fetchCourse(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={course?.image || ImagePath.COURSE_PLACEHOLDER}
            alt="UserImg"
            fill
          />
        </div>
        {course.title}
      </div>
      <div className={styles.formContainer}>
        <form action={updateCourse} className={styles.form}>
          <input type="hidden" name="id" value={course._id} />
          <label>Course Title</label>
          <input type="text" placeholder={course.title} name="title" />
          <label>Category</label>
          <select name="category" id="category" defaultValue={course.category}>
            <option value="general">Choose a Category</option>
            <option value="IT">IT</option>
            <option value="Web Development">Web Development</option>
            <option value="Web Development">Web Development</option>
            <option value="Web Development">Web Development</option>
          </select>
          <label>Course Instructor</label>
          <select
            name="instructor"
            id="instructor"
            defaultValue={course.instructor._id}
          >
            <option value="general">Choose course instructor</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
          <label>Course Duration</label>
          <input type="text" placeholder={course.duration} name="duration" />
          <label>Course Price</label>
          <input type="text" placeholder={course.price} name="price" />
          <label>Status</label>
          <select name="status" id="status" defaultValue={course.status}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <label>Course Description</label>
          <textarea
            name="description"
            id="description"
            rows={6}
            placeholder={course.description}
          ></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default CourseInfo;
