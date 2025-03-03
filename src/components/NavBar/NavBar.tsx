'use client';

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { FaBars, FaGlobe, FaRegUser, FaTimes } from 'react-icons/fa';
// import { getCurrentUser, logout } from '../../../utils/localStorage';
import { Path } from '@/constants/routePath';
import { deleteCookie, getCookie } from 'cookies-next';
import Image from 'next/image';
import { useState } from 'react';
import './NavBar.css';

const NavBar = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [isLangHovered, setIsLangHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLangMouseEnter = () => {
    setIsLangHovered(true);
  };

  const handleLangMouseLeave = () => {
    setIsLangHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLogout = () => {
    deleteCookie('token');
    deleteCookie('user');
    // logout();
    router.replace(Path.HOME);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLocaleChange = (newLocale: string): void => {
    router.push(pathname, { locale: newLocale });
  };

  const user = getCookie('user') as string;

  return (
    <nav
      id="navBar"
      className="sticky top-0 z-50 bg-white border-b border-gray-200"
    >
      <div className="flex items-center justify-between container-fluid py-2 px-4 h-16">
        <div className="flex items-center">
          <div className="mobile-menu-icon">
            <FaBars
              className="text-lg cursor-pointer md:hidden"
              onClick={toggleMobileMenu}
            />
          </div>
          <Link href="/">
            <Image
              src="/assets/images/logow.webp"
              alt="LOGO"
              className="w-24"
              width={100}
              height={100}
              loading="lazy"
            />
          </Link>
        </div>
        <div className="hidden md:flex">
          <ul className="flex gap-6">
            <li>
              <Link
                href="/courses"
                className="text-gray-600 hover:text-black transition-all duration-200"
              >
                {t('navigation.courses')}
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="relative flex items-center"
            onMouseEnter={handleLangMouseEnter}
            onMouseLeave={handleLangMouseLeave}
          >
            <FaGlobe className="text-xl cursor-pointer text-gray-600" />
            <div className={`languageDropdown ${isLangHovered ? 'show' : ''}`}>
              <ul>
                <li
                  onClick={() => handleLocaleChange('ar')}
                  className={`border-top-right-radius border-top-left-radius px-4 py-2 cursor-pointer ${locale === 'ar' ? 'bg-gray-200 text-white langActive' : 'hover:bg-gray-100'}`}
                >
                  العربية
                </li>
                <li
                  onClick={() => handleLocaleChange('en')}
                  className={`border-bottom-right-radius border-bottom-left-radius px-4 py-2 cursor-pointer ${locale === 'en' ? 'bg-gray-200 text-white langActive' : 'hover:bg-gray-100'}`}
                >
                  English
                </li>
              </ul>
            </div>
          </div>

          <div className="userContainer">
            {user ? (
              <div
                className="user-icon-container"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="user-icon">
                  <FaRegUser className="icon" />
                </div>
                <div
                  className={`dropdown ${
                    locale === 'ar' ? 'left0' : 'right0'
                  } ${isHovered ? 'show' : ''}`}
                >
                  <ul
                    className={
                      locale === 'ar' ? 'text-align-right' : 'text-align-left'
                    }
                  >
                    <li
                      onClick={() => router.push(Path.PROFILE)}
                      className="border-top-right-radius border-top-left-radius"
                    >
                      {locale === 'ar' ? 'مرحبا' : 'Welcome'}{' '}
                      {user && JSON.parse(user).name}
                    </li>
                    <li
                      onClick={handleLogout}
                      className="border-bottom-right-radius border-bottom-left-radius"
                    >
                      {locale === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link href={`http://localhost:5000/${locale}/login`}>
                {t('authentication.login')}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Side Menu for Mobile */}
      <div
        className={`fixed inset-0 bg-white transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} shadow-xl z-10`}
      >
        <div className="flex justify-between items-center p-4">
          <Link href="/">
            <Image
              src="/assets/images/logow.webp"
              alt="LOGO"
              className="w-24"
              width={100}
              height={100}
              loading="lazy"
            />
          </Link>
          <div className="cursor-pointer text-xl" onClick={toggleMobileMenu}>
            <FaTimes />
          </div>
        </div>
        <ul className="flex flex-col p-4">
          <li>
            <Link
              href=""
              className="text-gray-600 hover:text-black py-2"
              onClick={toggleMobileMenu}
            >
              {t('navigation.courses')}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
