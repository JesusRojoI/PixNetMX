'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { packageServices } from '@/data/services';
import SectionWrapper from '@/components/shared/SectionWrapper';
import toast from 'react-hot-toast';

export default function PackagesGrid() {
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
    <SectionWrapper className="py-16 md:py-24 bg-primary-light/20">
      <div className="section-padding">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-title text-center mb-16"
        >
          {t('solutions.packagesTitle')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packageServices.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 bg-primary-light/30 overflow-hidden">
                {pkg.image ? (
                  <Image
                    src={pkg.image}
                    alt={t(pkg.titleKey)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-rubik font-semibold text-lg text-primary mb-3">
                  {t(pkg.titleKey)}
                </h3>
                <p className="font-inter text-sm text-text-secondary mb-4 leading-relaxed">
                  {t(pkg.descKey)}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                  <span className="font-rubik font-bold text-xl text-primary">
  {formatPrice(pkg.price)} <span className="text-sm font-normal text-text-secondary">MXN + {t('solutions.iva')}</span>
</span>
                  <button
                    onClick={() => handleContract(pkg.id)}
                    className="font-rubik text-sm font-semibold bg-primary text-white px-4 py-2 hover:bg-primary-dark transition-colors"
                  >
                    {t('solutions.contract')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}