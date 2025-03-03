import P from '@/components/P/inlineP';
import { useTranslations } from 'next-intl';
import './MainHeroComponent.css';

const MainHeroComponent = () => {
  const t = useTranslations();

  return (
    <div className="hero">
      <div className="heroImgWrapper hidden md:block lg:block"></div>
      <div
        className={`hero-content container-fluid text-start text-white lg:text-center`}
      >
        <h1>{t('landing_page.courses_title')}</h1>
        <P value={t('landing_page.sub_courses_title')} />
        {/* <p>Find Your Dream Job Now!</p> */}
      </div>
    </div>
  );
};

export default MainHeroComponent;
