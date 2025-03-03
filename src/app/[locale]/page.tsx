import { QueryKey } from '@/constants/queryKey';
import Home from '@/features/course/components/Home';
import { getCourses } from '@/features/course/services/courses';
import MainHeroComponent from '@/features/Home/MainHero/MainHeroComponent';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const Page = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKey.COURSES],
    queryFn: () => getCourses(),
  });

  return (
    <>
      <MainHeroComponent />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Home />
      </HydrationBoundary>
    </>
  );
};

export default Page;
