import { QueryKey } from '@/constants/queryKey';
import CoursesComponent from '@/features/course/components/CoursesComponents';
import { getCourses } from '@/features/course/services/courses';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import './Courses.css';

const CoursesPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKey.COURSES],
    queryFn: () => getCourses(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoursesComponent />
    </HydrationBoundary>
  );
};

export default CoursesPage;
