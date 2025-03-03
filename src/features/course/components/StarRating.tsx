import { FC } from 'react';

interface StarRatingProps {
  rating: number;
  onChange: (rating: number) => void;
}

const StarRating: FC<StarRatingProps> = ({ rating, onChange }) => {
  return (
    <div className="flex space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          className={`cursor-pointer text-2xl ${
            star <= rating ? 'text-yellow-400' : 'text-gray-500'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
