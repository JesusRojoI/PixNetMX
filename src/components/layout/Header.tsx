'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary/50 backdrop-blur-sm ${
        isScrolled ? 'shadow-lg py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between">
        {/* Logo - Siempre blanco */}
        <Link href="/" className="flex items-center group">
          <div className="relative w-16 h-16 transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/logo.svg"
              alt="PixNetMX"
              fill
              className="object-contain brightness-0 invert"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/soluciones"
            className="font-inter font-medium text-white transition-colors duration-300 hover:text-secondary"
          >
            {t('header.solutions')}
          </Link>
          <Link
            href="/contacto"
            className="font-inter font-medium text-white transition-colors duration-300 hover:text-secondary"
          >
            {t('header.contact')}
          </Link>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 border border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300"
          >
            <span className="text-lg">{t('header.languageFlag')}</span>
            <span className="font-inter text-sm font-medium">{t('header.language')}</span>
          </button>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative flex items-center gap-2 text-white transition-colors duration-300 hover:text-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-secondary text-primary text-xs font-bold w-5 h-5 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary/95 backdrop-blur-sm shadow-xl"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              <Link
                href="/soluciones"
                className="font-inter font-medium text-white hover:text-secondary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('header.solutions')}
              </Link>
              <Link
                href="/contacto"
                className="font-inter font-medium text-white hover:text-secondary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('header.contact')}
              </Link>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-2 border border-white/30 text-white hover:bg-white hover:text-primary transition-all"
              >
                <span className="text-lg">{t('header.languageFlag')}</span>
                <span className="font-inter text-sm font-medium">{t('header.language')}</span>
              </button>
              <Link
                href="/cart"
                className="flex items-center gap-2 text-white hover:text-secondary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                  />
                </svg>
                <span>{t('header.cart')}</span>
                {totalItems > 0 && (
                  <span className="bg-secondary text-primary text-xs font-bold px-2 py-0.5">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}