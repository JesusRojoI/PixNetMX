'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/shared/SectionWrapper';
import Button from '@/components/shared/Button';

export default function CustomProductSection() {
  const { t } = useTranslation();

  return (
    <SectionWrapper className="py-16 md:py-24 bg-white">
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden">
              <Image
                src="/custom-project.png"
                alt={t('solutions.customProduct.title')}
                fill
                className="object-cover shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Content - Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-rubik text-3xl font-bold text-primary mb-6">
              {t('solutions.customProduct.title')}
            </h3>
            <p className="font-inter text-lg text-text-secondary leading-relaxed mb-8">
              {t('solutions.customProduct.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/contacto/#form" variant="primary" size="lg">
                {t('solutions.customProduct.ctaQuote')}
              </Button>
              <Button href="/product/proyecto-desde-cero" variant="secondary" size="lg">
                {t('solutions.customProduct.ctaPay')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}