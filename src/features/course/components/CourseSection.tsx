'use client';

import ErrorToast from '@/components/Toast/ErrorToast';
import { IconPath } from '@/constants/iconPath';
import { QueryKey } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';
import { Metadata } from 'next';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import { getCourses } from '../services/courses';
import CourseCard from './CourseCard';
import CourseCardLoading from './CourseCardLoading';

export const metadata: Metadata = {
  title: 'Course Section',
  description: 'Course Section Description',
  openGraph: {
    title: 'Course Section',
    description: 'Course Section Description',
    images: ['assets/images/users/unknown.webp'],
  },
};

interface CourseSectionProps {
  title: string;
  description?: string;
  // courses: Course[];
}

const CourseSection: FC<CourseSectionProps> = ({
  title,
  description,
  // courses,
}) => {
  const {
    data: courses,
    isLoading: isCourseLoading,
    error: coursesError,
  } = useQuery({
    queryKey: [QueryKey.COURSES],
    queryFn: () => getCourses(),
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cardWidth = container.offsetWidth / 3;
    const gap = 16;
    const scrollAmount = (cardWidth + gap) * 3;

    const scrollLeft =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;

    const handleScroll = () => {
      if (!container) return;

      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft + container.offsetWidth < container.scrollWidth,
      );
    };

    handleScroll();
    scrollContainerRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <ErrorToast errorMsg={coursesError?.message} />
      <section className="py-6">
        <div className="custom-container">
          <h2 className="text-2xl font-bold text-primary mb-2">{title}</h2>
          {description && (
            <p className="text-gray-600 mb-4 max-w-2xl text-sm">
              {description}
            </p>
          )}
          <div className="relative">
            <button
              onClick={() => scroll('left')}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md bg-white/80 ${canScrollLeft ? 'hover:bg-white' : 'opacity-25'
                } duration-300`}
              disabled={!canScrollLeft}
            >
              <Image
                src={IconPath.LEFT_ARROW}
                alt="left arrow"
                width={24}
                height={24}
              />
            </button>
            <div
              ref={scrollContainerRef}
              className="pb-4 -mx-4 snap-x snap-mandatory scrollbar-hide"
            >
              <div className="flex px-4 pb-2 gap-4 overflow-x-auto overflow-y-hidden">
                {isCourseLoading ? (
                  <CourseCardLoading count={5} />
                ) : (courses?.data || [])?.length > 0 ? (
                  courses?.data.map((data) => (
                    <CourseCard key={data.id} course={data} />
                  ))
                ) : (
                  <div className="text-center">
                    <p>No courses found</p>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => scroll('right')}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md bg-white/80 ${canScrollRight ? 'hover:bg-white' : 'opacity-25'
                } duration-300`}
              disabled={!canScrollRight}
            >
              <Image
                src={IconPath.RIGHT_ARROW}
                alt="right arrow"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseSection;
