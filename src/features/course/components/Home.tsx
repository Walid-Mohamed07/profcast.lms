'use client';

import CourseSection from '@/features/course/components/CourseSection';

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
