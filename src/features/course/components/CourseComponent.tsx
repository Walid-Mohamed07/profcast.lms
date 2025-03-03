'use client';

import { useParams } from 'next/navigation';

// import Button from '@/components/Button/Button';
import CommentSection from '@/components/CommentSection/CommentSection';
import CommentsSection from '@/components/CommentSection/CommentsSection';
import Loader from '@/components/Loader';
import ErrorToast from '@/components/Toast/ErrorToast';
// import { Link } from '@/i18n/routing';
// import { Paths } from '@/utils/constants/paths';
import { QueryKey } from '@/constants/queryKey';
import CourseContent from '@/features/course/components/CourseContent/CourseContent';
import CourseHero from '@/features/course/components/CourseHero/CourseHero';
import CourseLandingPageSidebar from '@/features/course/components/courseLandingPageSidebar/courseLandingPageSidebar';
import {
  getCourseById,
  getEnrolledCourses,
} from '@/features/course/services/courses';
import { isCourseEnrolled } from '@/utils/isCourseEnrolled';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import RatingSection from './RatingSection';

const CourseComponent = () => {
  const id = useParams().id as string;
  const t = useTranslations();

  const {
    data: course,
    isLoading: isCourseLoading,
    error: courseError,
  } = useQuery({
    queryKey: [QueryKey.COURSES, id],
    queryFn: () => getCourseById(id),
  });

  const { data: enrollments = [] } = useQuery({
    queryKey: [QueryKey.ENROLLMENTS],
    queryFn: getEnrolledCourses,
    staleTime: 0,
  });

  const isEnrolled = isCourseEnrolled({ courseId: Number(id)!, enrollments });

  // const [toggleLike] = useToggleBlogLikeMutation();

  const [comment, setComment] = useState<string>('');

  const addComment = ({}) => {
    // Add your comment logic here
  };

  console.log(isEnrolled);

  return (
    <>
      <ErrorToast errorMsg={courseError as unknown as string} />
      <Loader isLoading={isCourseLoading} color="#0a1535">
        <CourseHero
          title={course?.name}
          categoryName={course?.category?.name}
          description={course?.description}
          instructor={course?.instructor}
          duration={course?.duration.toString()}
          updated_at={course?.updated_at}
        />
        <div className="body1Section container-fluid">
          <CourseLandingPageSidebar
            isEnrolled={isEnrolled}
            id={course?.id}
            price={course?.price}
            media={course?.media}
          />
          {course && (
            <div className="flex flex-col md:flex-row justify-between gap-8 w-full">
              <div className="flex-1">
                <h2 className="commentHeader">{t('courses.course_content')}</h2>
                <CourseContent isEnrolled={isEnrolled} media={course.media} />

                {/* Rating Section */}
                {isEnrolled && (
                  <>
                    <h2 className="commentHeader">
                      {t('courses.course_rating')}
                    </h2>
                    <RatingSection courseId={course.id} />
                  </>
                )}
                {/* Comments Section */}
                <h2 className="commentHeader">{t('blogs.comments')}</h2>
                <div className="commentSectionWrapper">
                  {course.comments?.map((comment) => (
                    <CommentsSection key={comment.id} data={comment} />
                  ))}
                  <CommentSection
                    onChange={(e) => setComment(e.target.value)}
                    onAddComment={() =>
                      addComment({ blog_id: Number(id), content: comment })
                    }
                    comment={comment}
                    isLoading={isCourseLoading}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Loader>
      {/* <div className="relatedSection">
        <h2>{t('articles.related_posts')}</h2>
        <div className="relatedSectionCards container-fluid">
          {blog?.relatedBlogs?.map((b) => {
            return <InfoCard key={b.id} type="Blog" data={b} />;
          })}
        </div>
        <Link href={Paths.BLOGS}>
          <Button classN="BTN2">{t('users.show_all2')}</Button>
        </Link>
      </div> */}
    </>
  );
};
export default CourseComponent;
