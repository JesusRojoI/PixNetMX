'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/shared/SectionWrapper';
import BackgroundPattern from '@/components/shared/BackgroundPattern';

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <BackgroundPattern variant="grid" className="bg-primary-light/30">
      <SectionWrapper className="py-16 md:py-24">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Image - 40% */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2 relative"
            >
              <div className="relative w-full h-[350px] md:h-[450px]">
                <Image
                  src="/about-image.png"
                  alt="Quienes Somos"
                  fill
                  className="object-cover shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Content - 60% */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <h2 className="section-title">{t('home.about.title')}</h2>
              <p className="font-inter text-lg text-text-secondary leading-relaxed">
                {t('home.about.content')}
              </p>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>
    </BackgroundPattern>
  );
}