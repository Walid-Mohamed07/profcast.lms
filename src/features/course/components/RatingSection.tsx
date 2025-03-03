import Button from '@/components/Button/Button';
import ErrorToast from '@/components/Toast/ErrorToast';
import SuccessToast from '@/components/Toast/SuccessToast';
import { QueryKey } from '@/constants/queryKey';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { rateCourse } from '../services/courses';
import StarRating from './StarRating';

interface RatingSectionProps {
  courseId: number;
}

const RatingSection: FC<RatingSectionProps> = ({ courseId }) => {
  const t = useTranslations();

  const [rating, setRating] = useState<number>(0);
  const [ratingComment, setRatingComment] = useState<string>('');

  const {
    mutate: rate,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: () =>
      rateCourse({ course_id: courseId, comment: ratingComment, rating }),
    mutationKey: [QueryKey.COURSES, courseId],
    onSuccess: () => {
      setRating(0);
      setRatingComment('');
    },
  });

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <SuccessToast successMsg={isSuccess ? 'Added rating successfully' : ''} />
      <ErrorToast errorMsg={error ? String(error) : ''} />
      <div className="flex items-center gap-2">
        <StarRating rating={rating} onChange={(value) => setRating(value)} />
      </div>
      <textarea
        className="w-full mt-4 p-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
        placeholder={t('courses.leave_review')}
        value={ratingComment}
        onChange={(e) => setRatingComment(e.target.value)}
      />
      <Button
        isLoading={isPending}
        onClick={rate}
        disabled={!ratingComment.trim()}
        classN="BTN2"
      >
        {t('courses.submit_rating')}
      </Button>
    </div>
  );
};
export default RatingSection;
