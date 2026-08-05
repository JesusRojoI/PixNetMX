'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/shared/SectionWrapper';

export default function DistinguishSection() {
  const { t } = useTranslation();

  return (
    <div className="relative bg-primary-light/20">
      {/* Trama de fondo visible */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(107, 33, 168, 0.2) 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <SectionWrapper className="py-16 md:py-24">
          <div className="section-padding">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content - Left 50% */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title">{t('home.distinguish.title')}</h2>
                <p className="font-inter text-lg text-text-secondary leading-relaxed">
                  {t('home.distinguish.content')}
                </p>
              </motion.div>

              {/* Image - Right 50% */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative w-full h-[350px] md:h-[450px]">
                  <Image
                    src="/distinguish-image.png"
                    alt="Lo que nos distingue"
                    fill
                    className="object-cover shadow-2xl"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}