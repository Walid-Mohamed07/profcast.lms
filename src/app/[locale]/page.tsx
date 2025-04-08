import { Metadata } from 'next';
import { QueryKey } from '@/constants/queryKey';
import Home from '@/features/course/components/Home';
import { getCourses } from '@/features/course/services/courses';
import MainHeroComponent from '@/features/Home/MainHero/MainHeroComponent';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';


export const metadata: Metadata = {
  title: 'Prof Cast LMS',
  description:
    'Prof Cast, where you can find the latest news, most viewed blogs, and our top services.',
  icons: {
    icon: '/assets/images/logow.webp',
  },
  openGraph: {
    type: 'website',
    url: 'https://profcastlms.vercel.app/',
    images: [
      {
        url: '/assets/images/logow.webp',
        alt: 'Prof Cast OpenGraph Image',
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: [
    'Prof Cast',
    'ProfCast',
    'ProfCast.com',
    'ProfCast.com.ng',
    'ProfCast Nigeria',
  ],
};


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
