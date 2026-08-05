'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Button from '@/components/shared/Button';
import SectionWrapper from '@/components/shared/SectionWrapper';
import BackgroundPattern from '@/components/shared/BackgroundPattern';

export default function SolutionsHero() {
  const { t } = useTranslation();

  return (
    <BackgroundPattern variant="dots" className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-primary to-primary-dark">
      <SectionWrapper>
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Content - 60% */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <h1 className="font-rubik text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {t('solutions.hero.title')}
              </h1>
              <p className="font-inter text-lg text-gray-200 mb-8 leading-relaxed">
                {t('solutions.hero.content')}
              </p>
              <Button href="/contacto/#form" variant="secondary" size="lg">
                {t('solutions.hero.cta')}
              </Button>
            </motion.div>

            {/* Image - 40% */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-2 relative"
            >
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src="/solutions-hero.png"
                  alt="Soluciones"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>
    </BackgroundPattern>
  );
}