// import { QueryKey } from '@/constants/queryKey';
import PurchaseComponent from '@/features/course/components/Purchase/PurchaseComponent';
// import { getCourseById } from '@/features/course/services/courses';
// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from '@tanstack/react-query';
import { FC } from 'react';

type CoursePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const PurchasePage: FC<CoursePageProps> = async ({ params }) => {
  const { id } = await params;

  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: [QueryKey.COURSES, id],
  //   queryFn: () => getCourseById(id),
  // });

  return <PurchaseComponent id={id} />;
};

export default PurchasePage;
