import { MotionDiv } from '@/components/MotionDiv';
import YouTubeEmbed from '@/components/YouTubeEmbed/YouTubeEmbed';
import { Media } from '@/models/media';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FaVideo } from 'react-icons/fa';
import './CourseContent.css';

interface HeroProps {
  media: Media[];
  isEnrolled: boolean;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const CourseContent: React.FC<HeroProps> = ({ media, isEnrolled }) => {
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
      <div
        className={`contentSectionWrapper px-4 py-7 md:px-5 flex flex-col gap-4 ${isEnrolled ? '' : 'not-enrolled'}`}
      >
        {media?.map((data) => (
          <details key={data.id}>
            <summary className="user-select-none px-2 py-2 md:px-4 cursor-pointer font-weight-600 list-none items-center flex justify-between">
              <span className="accordionTitle flex items-center gap-2 text-sm md:text-lg">
                <FaVideo className="icon" />
                {data.name}
              </span>
              <Image
                src="/assets/icons/right_arrow.svg"
                alt="Arrow Right"
                width={25}
                height={25}
              />
            </summary>
            <div className="accordionContent">
              <div className="accordionInner">
                {isEnrolled ? (
                  <YouTubeEmbed videoId="nqye02H_H6I?si=byEuKwaFc6n4yD_U" />
                ) : (
                  <p className="not-enrolled-message">
                    {t('courses.course_enrollment')}
                  </p>
                )}
              </div>
            </div>
          </details>
        ))}
      </div>
    </MotionDiv>
  );
};

export default CourseContent;
