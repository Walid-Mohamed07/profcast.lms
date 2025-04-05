import { ImagePath } from '@/constants/imagePath';
import { Link } from '@/i18n/routing';
import { Course } from '@/models/course';
import Image from 'next/image';
import { FC } from 'react';

interface CourseCardProps {
  course: Course;
}

const CourseCard: FC<CourseCardProps> = ({ course }) => {
  const { id, name, description, media, instructor, duration } = course;
  const imageUrl = media[0]?.original_url || ImagePath.COURSE_PLACEHOLDER;

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 w-full md:w-52 h-full p-1 flex flex-col border-b-4 border-secondary hover:border-accent">
      <div className="relative h-28 w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform text-transparent rounded-[4px] pointer-events-none duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/courses/${id}`}>
          <h3 className="text-base font-bold text-primary mb-2 hover:text-secondary transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-col text-xs mt-auto">
          <span className="rounded-full bg-secondary-light/10 text-secondary-light font-medium">
            {instructor.name}
          </span>
          <span className="rounded-full bg-accent-light/10 text-accent font-medium">
            {duration} months
          </span>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
