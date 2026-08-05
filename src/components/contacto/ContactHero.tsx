'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/shared/SectionWrapper';
import BackgroundPattern from '@/components/shared/BackgroundPattern';

export default function ContactHero() {
  const { t } = useTranslation();

  return (
    <BackgroundPattern variant="dots" className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-primary to-primary-dark">
      <SectionWrapper>
        <div className="section-padding text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-rubik text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto"
          >
            {t('contact.hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
          >
            {t('contact.hero.subtitle')}
          </motion.p>
        </div>
      </SectionWrapper>
    </BackgroundPattern>
  );
}