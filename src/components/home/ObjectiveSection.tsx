'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/shared/SectionWrapper';

export default function ObjectiveSection() {
  const { t } = useTranslation();

  return (
    <div className="relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/objective-bg.png"
          alt="Technology Background"
          fill
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/75" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <SectionWrapper className="py-16 md:py-24">
          <div className="section-padding">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image - Left */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative order-2 lg:order-1"
              >
                <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
                  <Image
                    src="/about-us-team.png"
                    alt="PixNetMX Team"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-secondary/20" />
                </div>
              </motion.div>

              {/* Content - Right */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <h2 className="font-rubik text-3xl md:text-4xl font-bold text-white mb-6">
                  {t('home.objective.title')}
                </h2>
                <p className="font-inter text-lg text-gray-200 mb-6 leading-relaxed">
                  {t('home.objective.content')}
                </p>
                <div className="border-t-2 border-secondary/50 w-20 mb-4" />
                <p className="font-inter text-base text-gray-300 italic">
                  {t('home.objective.subtitle')}
                </p>
              </motion.div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}