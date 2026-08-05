'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { uxuiServices, devServices } from '@/data/services';
import SectionWrapper from '@/components/shared/SectionWrapper';
import toast from 'react-hot-toast';

export default function ServicesPackages() {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const router = useRouter();

  const handleContract = (serviceId: string) => {
    addItem(serviceId);
    toast.success(t('cart.itemAdded'));
    router.push('/cart');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

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
          {t('solutions.servicesTitle')}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* UX/UI Column */}
          <div>
            <h3 className="font-rubik text-2xl font-bold text-primary mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              {t('solutions.uxuiTitle')}
            </h3>
            <div className="space-y-4">
              {uxuiServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-primary-light/20 border border-primary/10 p-6 hover:border-primary/30 transition-all duration-300 card-shadow-hover"
                >
                  <h4 className="font-rubik font-semibold text-lg text-primary mb-2">
                    {t(service.titleKey)}
                  </h4>
                  <p className="font-inter text-sm text-text-secondary mb-4">
                    {t(service.descKey)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-rubik font-bold text-xl text-primary">
  {formatPrice(service.price)} <span className="text-sm font-normal text-text-secondary">MXN + {t('solutions.iva')}</span>
</span>
                    <button
                      onClick={() => handleContract(service.id)}
                      className="font-rubik text-sm font-semibold text-secondary hover:text-secondary-dark transition-colors flex items-center gap-1"
                    >
                      {t('solutions.contract')}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Development Column */}
          <div>
            <h3 className="font-rubik text-2xl font-bold text-primary mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              {t('solutions.devTitle')}
            </h3>
            <div className="space-y-4">
              {devServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-secondary-light/30 border border-secondary/20 p-6 hover:border-secondary/40 transition-all duration-300 card-shadow-hover"
                >
                  <h4 className="font-rubik font-semibold text-lg text-primary mb-2">
                    {t(service.titleKey)}
                  </h4>
                  <p className="font-inter text-sm text-text-secondary mb-4">
                    {t(service.descKey)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-rubik font-bold text-xl text-primary">
  {formatPrice(service.price)} <span className="text-sm font-normal text-text-secondary">MXN + {t('solutions.iva')}</span>
</span>
                    <button
                      onClick={() => handleContract(service.id)}
                      className="font-rubik text-sm font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
                    >
                      {t('solutions.contract')}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}