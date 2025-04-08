'use client';

import { Metadata } from "next";
import CourseSection from '@/features/course/components/CourseSection';

export const metadata: Metadata = {
  title: "Prof Cast LMS",
  description:
    "Prof Cast, where you can find the latest news, most viewed blogs, and our top services.",
  icons: {
    icon: "/assets/images/logow.webp",
  },
  openGraph: {
    type: "website",
    url: "https://profcast.net/",
    images: [
      {
        url: "/assets/images/logow.webp",
        alt: "Prof Cast OpenGraph Image",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: [
    "Prof Cast",
    "ProfCast",
    "ProfCast.com",
    "ProfCast.com.ng",
    "ProfCast Nigeria",
  ],
};

const Home = () => {
  return (
    <div className="space-y-12">
      <CourseSection
        title="Popular Courses"
        description="Explore our most popular learning paths"
      // courses={courses?.data || []}
      />
      <CourseSection
        title="New Courses"
        description="Check out our latest course offerings"
      // courses={courses?.data || []}
      />
      <CourseSection
        title="Featured Courses"
        description="Hand-picked courses by our experts"
      // courses={courses?.data || []}
      />
    </div>
  );
};

export default Home;
