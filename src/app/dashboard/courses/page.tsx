/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImagePath } from '@/constants/imagePath';
import { STORAGE_PATH } from '@/constants/storagePath';
import styles from '@/features/dashboard/components/Courses/Courses.module.css';
import Pagination from '@/features/dashboard/components/Pagination/Pagination';
import Search from '@/features/dashboard/components/Search/Search';
import { deleteCourse } from '@/lib/actions';
import { fetchCourses } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

interface CoursePageProps {
  searchParams: Promise<{
    q?: string;
    page?: string | number;
  }>;
}

const Courses = async ({ searchParams }: CoursePageProps) => {
  const params = await searchParams;
  const q = params?.q || '';
  const page = Number(params?.page) || 1;

  // Fetch courses data
  const { count, courses } = await fetchCourses(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a course..." />
        <Link href="/dashboard/courses/add">
          <button className={styles.addButton}>Add Course</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Course Name</td>
            <td>Category</td>
            <td>Instructor</td>
            <td>Rating</td>
            <td>Duration</td>
            <td>Price ($)</td>
            <td>Created At</td>
            <td>Last Update</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {courses.map((course: any) => (
            <tr key={course._id}>
              <td>
                <div className={styles.course}>
                  <Image
                    src={course?.image || ImagePath.COURSE_PLACEHOLDER}
                    alt="course"
                    width={40}
                    height={40}
                    className={styles.courseImage}
                  />
                  {course.title}
                </div>
              </td>
              <td>{course.category}</td>
              <td>
                {
                  <div className={styles.user}>
                    <Image
                      src={
                        course.instructor?.profilePicture?.length > 0
                          ? course.instructor.profilePicture
                          : STORAGE_PATH + '/images/users/unknown.webp'
                      }
                      alt="user"
                      width={40}
                      height={40}
                      className={styles.userImage}
                    />
                    {course.instructor?.username || 'N/A'}
                  </div>
                }
              </td>
              <td>{course.rating}</td>
              <td>{course.duration}</td>
              <td>{course.price}</td>
              <td>{course.createdAt?.toString().slice(4, 16) || null}</td>
              <td>{course.updatedAt?.toString().slice(4, 16)}</td>
              <td>{course.status}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/courses/${course._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteCourse}>
                    <input type="hidden" name="id" value={course._id} />
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

export default Courses;
