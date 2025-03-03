import { QueryKey } from '@/constants/queryKey';
import CourseComponent from '@/features/course/components/CourseComponent';
import {
  getCourseById,
  getEnrolledCourses,
} from '@/features/course/services/courses';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type CoursePageProps = {
  params: Promise<{
    id: string;
  }>;
};

// export async function generateMetadata({
//   params,
// }: CoursePageProps): Promise<Metadata> {
//   try {
//     const resolvedParams = await params;

//     const { data: course } = useQuery({
//       queryKey: [QueryKey.COURSE, resolvedParams.id],
//       queryFn: () => getCourseById(resolvedParams.id),
//     });
//     // const { course } = await fetchBlogById(resolvedParams.id);

//     if (!course) {
//       return {
//         title: 'Course Not Found',
//         description: 'The requested course could not be found',
//       };
//     }

//     return {
//       title: course[await getLocalizedKeyServer('title')],
//       description: course[await getLocalizedKeyServer('content')].slice(0, 160),
//       openGraph: {
//         title: course[await getLocalizedKeyServer('title')],
//         description: course[await getLocalizedKeyServer('content')].slice(
//           0,
//           160,
//         ),
//         type: 'article',
//         images: course.image_path
//           ? [
//               {
//                 width: 1200,
//                 height: 630,
//                 url: STORAGE_PATH + course.image_path,
//               },
//             ]
//           : [],
//       },
//       twitter: {
//         card: 'summary_large_image',
//         title: course[await getLocalizedKeyServer('title')],
//         description: course[await getLocalizedKeyServer('content')].slice(
//           0,
//           160,
//         ),
//         images: course.image_path ? [STORAGE_PATH + course.image_path] : [],
//       },
//     };
//   } catch {
//     return {
//       title: 'Course Error',
//       description: 'Error loading course details',
//     };
//   }
// }

const CoursePage = async ({ params }: CoursePageProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.COURSES, id],
    queryFn: () => getCourseById(id),
  });

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.ENROLLMENTS],
    queryFn: getEnrolledCourses,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CourseComponent />
    </HydrationBoundary>
  );
};

export default CoursePage;
