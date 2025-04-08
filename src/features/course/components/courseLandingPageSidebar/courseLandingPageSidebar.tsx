'use client';

import Button from '@/components/Button/Button';
import { MotionDiv } from '@/components/MotionDiv';
import { ImagePath } from '@/constants/imagePath';
import { Path } from '@/constants/routePath';
import { Link } from '@/i18n/routing';
import { getCurrentUser } from '@/lib/auth';
import { Media } from '@/models/media';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import './courseLandingPageSidebar.css';

interface HeroProps {
  id: number | undefined;
  price: number | undefined;
  media: Media[] | undefined;
  isEnrolled: boolean;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const CourseLandingPageSidebar: React.FC<HeroProps> = ({
  id,
  price,
  media = [],
  isEnrolled,
}) => {
  const t = useTranslations();

  const locale = useLocale();
  const imageUrl = media[0]?.original_url || ImagePath.COURSE_PLACEHOLDER;

  const currentUser = getCurrentUser();

  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: 5 * 0.25,
        ease: 'easeInOut',
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      className="rounded relative w-full flex justify-center justifyEnd"
    >
      <div className={`course-landing-page_sidebar-container`}>
        <div className="sidebar-container--content--V-bFw">
          <div className="course-image">
            <Image
              src={imageUrl}
              alt="Course image..."
              width={400}
              height={200}
              className="object-cover transition-transform text-transparent rounded-[4px] pointer-events-none duration-300 group-hover:scale-105"
            />
          </div>
          <div className="sidebar-container--purchase-section--XWCM-">
            {isEnrolled ? (
              <div className="text-lg">{t('courses.enrolled')}</div>
            ) : (
              <>
                <div className="priceSection">E£{price}</div>
                <div className="buyButtonsWrapper">
                  <Button classN="addToCartBtn">
                    {t('courses.add_to_cart')}
                  </Button>
                  <Link
                    className="buyNowBtn text-center"
                    href={Path.PURCHASE + `/${id}`}
                    onClick={() => {
                      if (!currentUser)
                        return (window.location.href = `https://profcast.net/login?courseId=${id}`);
                    }}
                  >
                    <Button>{t('courses.buy_now')}</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default CourseLandingPageSidebar;
