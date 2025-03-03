'use client';

import Pagination from '@/components/Pagination';
// import ErrorToast from '@/components/Toast/ErrorToast';
// import { getCurrentUser } from '@/utils/cookieHelpers';
import ErrorToast from '@/components/Toast/ErrorToast';
import { QueryKey } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { getCourses } from '../services/courses';
import CourseCard from './CourseCard';
import CourseCardLoading from './CourseCardLoading';

const AllCoursesSectionComponent = () => {
  // const user = getCurrentUser();
  const [page, setPage] = useState<number>(1);
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  const t = useTranslations();
  const {
    data: courses,
    isLoading: isCourseLoading,
    error: coursesError,
  } = useQuery({
    queryKey: [QueryKey.COURSES, search],
    queryFn: () => getCourses(search as string),
  });

  return (
    <>
      <ErrorToast errorMsg={coursesError?.message} />
      {/* {user && (
        <div className="flex-start container-fluid margin-top-35">
          <Link href={Path.ADD_NEW_BLOG}>
            <Button classN="BTN3">Add new Blog</Button>
          </Link>
        </div>
      )} */}
      <div className="flex mt-9 flex-wrap gap-4 container-fluid">
        {isCourseLoading ? (
          <CourseCardLoading count={5} />
        ) : // <Loader isLoading={isCourseLoading} color="#0a1535">
        (courses?.data || [])?.length > 0 ? (
          courses?.data.map((data) => (
            <CourseCard key={data.id} course={data} />
          ))
        ) : (
          <div className="text-center">
            <p>{t('courses.no_courses_found')}</p>
          </div>
        )}
        {/* </Loader> */}
      </div>
      <div className="mt-8">
        <Pagination
          pageCount={courses?.last_page || 1}
          currentPage={page}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </>
  );
};

export default AllCoursesSectionComponent;
