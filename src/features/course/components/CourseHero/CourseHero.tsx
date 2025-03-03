import { MotionDiv } from '@/components/MotionDiv';
import P from '@/components/P/inlineP';
import { formatDate } from '@/constants/formatDate';
import { STORAGE_PATH } from '@/constants/storagePath';
import { Instructor } from '@/models/instructor';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FaClock, FaEdit, FaRegClone, FaSignal } from 'react-icons/fa';
import './CourseHero.css';

interface HeroProps {
  title: string | undefined;
  categoryName: string | undefined;
  description: string | undefined;
  instructor: Instructor | undefined;
  duration: string | undefined;
  updated_at: string | undefined;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const CourseHero: React.FC<HeroProps> = ({
  title,
  categoryName,
  description,
  instructor,
  duration,
  updated_at,
}) => {
  const t = useTranslations();

  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: 2 * 0.25,
        ease: 'easeInOut',
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      className="rounded relative w-full"
    >
      <div className="hero">
        <div className="heroImgWrapper hidden md:block lg:block"></div>
        <div className={`hero-content container-fluid text-white text-start`}>
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl">{title}</h1>
            <span className="flex text-center items-center font-thin text-base gap-2">
              <FaRegClone className="icon" />
              {categoryName}
            </span>
          </div>
          <div className="hero-content-description">
            <P value={description} />
          </div>
          <div className="hero-course-instructor-section">
            <p>{t('courses.course_instructor')}:</p>
            <div className="instructor">
              <div className="oval-container">
                <Image
                  src={
                    instructor?.image_path
                      ? STORAGE_PATH + instructor.image_path
                      : STORAGE_PATH + 'images/users/unknown.webp'
                  }
                  alt="Course Instructor: "
                  width={50}
                  height={50}
                  loading="lazy"
                />
              </div>
              <div className="instructor-data">
                <div className="instructor-name">{instructor?.name}</div>
                <div className="instructor-jobTitle">
                  {instructor?.job_title}
                </div>
              </div>
            </div>
          </div>
          <div className="moreInfo">
            <ul>
              <li>
                <FaSignal className="icon" />
              </li>
              <li>
                <span className="flex text-center items-center gap-3">
                  <FaClock className="icon" />
                  {duration}
                </span>
              </li>
              <li>
                <span className="flex text-center items-center gap-3">
                  <FaEdit className="icon" />
                  {t('courses.last_updated')}: {formatDate(updated_at ?? '')}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default CourseHero;
