'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/shared/SectionWrapper';

export default function TerminosCondicionesPage() {
  const { t } = useTranslation();

  const renderList = (items: string | string[]) => {
    const list = Array.isArray(items) ? items : [];
    return (
      <ul className="space-y-2 pl-5 list-disc">
        {list.map((item, index) => (
          <li key={index} className="font-inter text-text-secondary leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    );
  };

  const getArray = (key: string): string[] => {
    return t(key, { returnObjects: true }) as unknown as string[];
  };

  return (
    <SectionWrapper className="pt-32 pb-16 md:pt-40 md:pb-24 min-h-screen bg-white">
      <div className="section-padding max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-rubik text-3xl md:text-4xl font-bold text-primary mb-8">
            {t('terms.title')}
          </h1>

          <div className="space-y-3 mb-8">
            <p className="font-inter text-text-primary">{t('terms.website')}</p>
            <p className="font-inter text-text-primary">{t('terms.email')}</p>
            <p className="font-inter text-text-primary">{t('terms.address')}</p>
          </div>

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('terms.section1.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed">{t('terms.section1.content')}</p>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('terms.section2.title')}</h2>
            <h3 className="font-rubik font-semibold text-text-primary mb-2">{t('terms.section2.providerTitle')}</h3>
            {renderList(getArray('terms.section2.providerItems'))}
            <h3 className="font-rubik font-semibold text-text-primary mb-2 mt-4">{t('terms.section2.clientTitle')}</h3>
            {renderList(getArray('terms.section2.clientItems'))}
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('terms.section3.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed">{t('terms.section3.content')}</p>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('terms.section4.title')}</h2>
            <h3 className="font-rubik font-semibold text-text-primary mb-2">{t('terms.section4.pricesTitle')}</h3>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('terms.section4.pricesContent')}</p>
            <h3 className="font-rubik font-semibold text-text-primary mb-2">{t('terms.section4.paymentTitle')}</h3>
            <p className="font-inter text-text-secondary leading-relaxed">{t('terms.section4.paymentContent')}</p>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('terms.section5.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('terms.section5.intro')}</p>
            {renderList(getArray('terms.section5.items'))}
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('terms.section6.title')}</h2>
            <h3 className="font-rubik font-semibold text-text-primary mb-2">{t('terms.section6.warrantyTitle')}</h3>
            {renderList(getArray('terms.section6.warrantyItems'))}
            <h3 className="font-rubik font-semibold text-text-primary mb-2 mt-4">{t('terms.section6.supportTitle')}</h3>
            {renderList(getArray('terms.section6.supportItems'))}
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('terms.section7.title')}</h2>
            {renderList(getArray('terms.section7.items'))}
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('terms.section8.title')}</h2>
            {renderList(getArray('terms.section8.items'))}
          </section>

          {/* Section 9 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('terms.section9.title')}</h2>
            {renderList(getArray('terms.section9.items'))}
          </section>

          {/* Section 10 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('terms.section10.title')}</h2>
            {renderList(getArray('terms.section10.items'))}
          </section>

          {/* Section 11 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('terms.section11.title')}</h2>
            {renderList(getArray('terms.section11.items'))}
          </section>

          {/* Section 12 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('terms.section12.title')}</h2>
            {renderList(getArray('terms.section12.items'))}
          </section>

          {/* Section 13 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('terms.section13.title')}</h2>
            {renderList(getArray('terms.section13.items'))}
          </section>

          {/* Section 14 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('terms.section14.title')}</h2>
            <h3 className="font-rubik font-semibold text-text-primary mb-2">{t('terms.section14.independenceTitle')}</h3>
            {renderList(getArray('terms.section14.independenceItems'))}
            <h3 className="font-rubik font-semibold text-text-primary mb-2 mt-4">{t('terms.section14.totalityTitle')}</h3>
            {renderList(getArray('terms.section14.totalityItems'))}
            <h3 className="font-rubik font-semibold text-text-primary mb-2 mt-4">{t('terms.section14.assignmentTitle')}</h3>
            {renderList(getArray('terms.section14.assignmentItems'))}
          </section>

          {/* Section 15 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('terms.section15.title')}</h2>
            {renderList(getArray('terms.section15.items'))}
          </section>

          {/* Section 16 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('terms.section16.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('terms.section16.intro')}</p>
            {renderList(getArray('terms.section16.items'))}
          </section>

          <div className="border-t border-primary/10 pt-6 mt-8">
            <p className="font-inter text-text-secondary">{t('terms.lastUpdate')}</p>
            <p className="font-inter text-text-secondary mt-2 font-semibold">{t('terms.acceptance')}</p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}