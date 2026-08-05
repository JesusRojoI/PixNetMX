'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Button from '@/components/shared/Button';
import SectionWrapper from '@/components/shared/SectionWrapper';
import BackgroundPattern from '@/components/shared/BackgroundPattern';

export default function CtaSection() {
  const { t } = useTranslation();

  return (
    <BackgroundPattern variant="waves" className="bg-footer">
      <SectionWrapper className="py-16 md:py-24">
        <div className="section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-rubik text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              {t('home.cta.title')}
            </h2>
            <Button href="/contacto/#form" variant="secondary" size="lg">
              {t('home.cta.button')}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </BackgroundPattern>
  );
}