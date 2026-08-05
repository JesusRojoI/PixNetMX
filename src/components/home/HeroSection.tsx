'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Button from '@/components/shared/Button';
import BackgroundPattern from '@/components/shared/BackgroundPattern';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <BackgroundPattern variant="dots" className="min-h-screen flex items-center bg-gradient-to-br from-primary via-primary-dark to-indigo-950">
      <div className="section-padding w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="font-rubik text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="font-inter text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            <Button href="/soluciones" variant="secondary" size="lg">
              {t('home.hero.cta')}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative w-full h-[400px] md:h-[500px]">
              <Image
                src="/hero-image.png"
                alt="PixNetMX Solutions"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-300/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </BackgroundPattern>
  );
}