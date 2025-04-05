'use client';

import { QueryKey } from '@/constants/queryKey';
import { getCourses } from '@/features/course/services/courses';
import DataTable from '@/features/dashboard/components/DataTable';
import { courseColumns } from '@/features/dashboard/constants/columns';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const Courses = () => {
  const [page, setPage] = useState<number>(1);

  const { data: courses, isLoading: isCourseLoading } = useQuery({
    queryKey: [QueryKey.COURSES],
    queryFn: () => getCourses(),
  });

  return (
    <DataTable
      data={courses?.data || []}
      columns={courseColumns}
      pageCount={courses?.last_page || 1}
      currentPage={page}
      onPageChange={(page) => setPage(page)}
      isLoading={isCourseLoading}
      actions={[
        {
          action: (
            <div className="text-primary border border-primary py-2 px-3 rounded-3xl text-xs transition-all hover:bg-orange-600 hover:text-zinc-50">
              Edit
            </div>
          ),
          handler: (course) => console.log(course),
        },
        {
          action: (
            <div className="text-primary border border-primary py-2 px-3 rounded-3xl text-xs transition-all hover:bg-red-600 hover:text-zinc-50">
              Delete
            </div>
          ),
          handler: (course) => console.log(course),
        },
      ]}
    >
      <div className="flex-between items-center">
        <h1 className="font-semibold text-3xl">Courses</h1>
        <div className="border border-white p-4 rounded-lg cursor-pointer">
          Add New Course
        </div>
      </div>
    </DataTable>
  );
};

export default Courses;
