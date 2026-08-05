'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/shared/SectionWrapper';

interface ServiceCard {
  title: string;
  description: string;
}

export default function ServicesAccordion() {
  const { t } = useTranslation();

  const websiteDesignCards: ServiceCard[] = [
    {
      title: t('home.services.websiteDesign'),
      description: t('home.services.websiteDesignFull'),
    },
    {
      title: t('home.services.styleGuide'),
      description: t('home.services.styleGuideDesc'),
    },
    {
      title: t('home.services.contentStrategy'),
      description: t('home.services.contentStrategyDesc'),
    },
  ];

  const webDevCards: ServiceCard[] = [
    {
      title: t('home.services.customCreation'),
      description: t('home.services.customCreationDesc'),
    },
    {
      title: t('home.services.premadeTemplate'),
      description: t('home.services.premadeTemplateDesc'),
    },
    {
      title: t('home.services.maintenance'),
      description: t('home.services.maintenanceDesc'),
    },
  ];

  return (
    <SectionWrapper className="py-16 md:py-24 bg-white">
      <div className="section-padding">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-title text-center mb-16"
        >
          {t('home.services.title')}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Website Design Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Fixed Header */}
            <div className="mb-8 p-6 bg-primary-light/30">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 bg-primary flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-rubik font-bold text-2xl text-primary">
                    {t('home.services.websiteDesign')}
                  </h3>
                  <p className="font-inter text-sm text-text-secondary mt-1">
                    {t('home.services.websiteDesignDesc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Service Cards */}
            <div className="space-y-4">
              {websiteDesignCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border border-primary/10 p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <h4 className="font-rubik font-semibold text-lg text-primary mb-3">
                    {card.title}
                  </h4>
                  <p className="font-inter text-sm text-text-secondary leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Website & App Development Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Fixed Header */}
            <div className="mb-8 p-6 bg-secondary-light/30">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 bg-secondary flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-rubik font-bold text-2xl text-primary">
                    {t('home.services.webDev')}
                  </h3>
                  <p className="font-inter text-sm text-text-secondary mt-1">
                    {t('home.services.webDevDesc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Service Cards */}
            <div className="space-y-4">
              {webDevCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border border-secondary/20 p-6 hover:border-secondary/40 hover:shadow-lg transition-all duration-300"
                >
                  <h4 className="font-rubik font-semibold text-lg text-primary mb-3">
                    {card.title}
                  </h4>
                  <p className="font-inter text-sm text-text-secondary leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}