'use client';

import { Path } from '@/constants/routePath';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { FaFacebook } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer id="footer">
      <div className="container-fluid">
        <article>
          <h2>{t('landing_page.join_us_today')}</h2>
          <Link href={Path.SIGN_UP}>
            <button className="footerSignupBTN">
              <p>{t('landing_page.sign_up_free')}</p>
              <span className="signupArrow">
                {' '}
                {locale === 'ar' ? '←' : '→'}{' '}
              </span>
            </button>
          </Link>
        </article>
      </div>
      <section className="top container-fluid">
        <Image
          src="/assets/images/logow.webp"
          alt="ProfCast"
          className="footerLogo"
          width={135}
          height={100}
          loading="lazy"
        />
        <ul>
          {/* <li>
            <h3>WHO WE ARE</h3>
            <span>
              At ProfCast, we connect talented individuals with exciting career
              opportunities...<a href="/about">click for more</a>
            </span>
          </li> */}
          <li>
            <h3>{t('footer.i_am_an_job_seeker')}</h3>
            {/* <p>
              <a href="">{t('footer.add_a_resume')}</a>
            </p> */}
            {/* <p>
              <a href="">{t('footer.candidate_profile')}</a>
            </p> */}
            <p>
              <Link href={Path.PROFILE}>{t('footer.my_account')}</Link>
            </p>
            <p>
              <Link href={Path.JOBS}>{t('navigation.find_job')}</Link>
            </p>
          </li>
          <li>
            <h3>{t('footer.i_am_employer')}</h3>
            <p>
              <Link href="">{t('navigation.dashboard')}</Link>
            </p>
            <p>
              <Link href={Path.ADD_NEW_JOB}>{t('navigation.add_job')}</Link>
            </p>
            {/* <p>
              <a href="">{t('footer.my_account')}</a>
            </p> */}
            <p>
              <Link href={Path.FIND_EMPLOYEE}>
                {t('navigation.find_employee')}
              </Link>
            </p>
          </li>
          <li>
            <h3>{t('footer.information')}</h3>
            <p>
              <Link href={Path.ABOUT}>{t('navigation.about_us')}</Link>
            </p>
            <p>
              <Link href={Path.CONTACT}>{t('navigation.contact')}</Link>
            </p>
            <p>
              <Link href={Path.POLICIES}>{t('footer.terms')}</Link>
            </p>
            <p>
              <Link href={Path.VISITS_AND_VIEWS} target="_blank">
                {t('footer.visitors_and_views')}
              </Link>
            </p>
          </li>
          <li>
            <h3>{t('landing_page.social_media')}</h3>
            <Link
              href="https://www.facebook.com/profile.php?id=61561316279759"
              title="Facebook"
            >
              <FaFacebook className="socialIcon" />
            </Link>
          </li>
          <li>
            {/* <a href="https://info.flagcounter.com/cDCz">
              <Image
                src="https://s11.flagcounter.com/count2/cDCz/bg_FFFFFF/txt_0A1536/border_CCCCCC/columns_2/maxflags_10/viewers_0/labels_1/pageviews_0/flags_0/percent_0/"
                alt="Free counters!"
                width={100}
                height={100}
              />
            </a> */}
          </li>
        </ul>
      </section>
      <section className="bottom container-fluid">
        {t('contact_us.all_rights_reserved')}
      </section>
    </footer>
  );
};

export default Footer;
