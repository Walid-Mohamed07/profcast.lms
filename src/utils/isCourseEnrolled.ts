import { Enrollment } from '@/models/enrollment';

interface Params {
  enrollments: Enrollment[];
  courseId: number;
}

export const isCourseEnrolled = ({
  enrollments,
  courseId,
}: Params): boolean => {
  return enrollments.some((enrollment) => enrollment.course_id === courseId);
};
