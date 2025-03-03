'use client';

import Input from '@/components/Input/Input';
import P from '@/components/P/inlineP';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import './CoursesHeroComponent.css';

const CoursesHeroComponent = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [input, setInput] = useState<string>(searchParams.get('search') || '');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInput(query);

    const params = new URLSearchParams(window.location.search);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }

    router.push(`?${params.toString()}`);
  };
  return (
    <div className="hero">
      <div className="heroImgWrapper hidden md:block lg:block"></div>
      <div
        className={`hero-content container-fluid text-whit space-y-8 text-start`}
      >
        <div>
          <h1>{t('landing_page.all_courses_title')}</h1>
          <P value={t('landing_page.sub_courses_title')} />
        </div>
        {/* <p>Find Your Dream Job Now!</p> */}
        <div className="w-1/2">
          <Input
            placeholder={`${t('landing_page.search')} ${t('navigation.courses')}`}
            classN="text-black"
            value={input}
            onChange={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursesHeroComponent;
