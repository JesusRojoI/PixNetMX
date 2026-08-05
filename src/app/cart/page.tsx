'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import CartItem from '@/components/cart/CartItem';
import CartTotals from '@/components/cart/CartTotals';
import Button from '@/components/shared/Button';
import SectionWrapper from '@/components/shared/SectionWrapper';

export default function CartPage() {
  const { t } = useTranslation();
  const { state } = useCart();

  if (state.items.length === 0) {
    return (
      <SectionWrapper className="pt-32 pb-16 md:pt-40 md:pb-24 min-h-screen bg-primary-light/10">
        <div className="section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-primary/30 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <h1 className="font-rubik text-3xl font-bold text-primary mb-4">{t('cart.empty')}</h1>
            <p className="font-inter text-text-secondary mb-8">{t('cart.emptyDesc')}</p>
            <Button href="/soluciones" variant="primary">
              {t('cart.continueShopping')}
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper className="pt-32 pb-16 md:pt-40 md:pb-24 min-h-screen bg-primary-light/10">
      <div className="section-padding">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-title mb-12"
        >
          {t('cart.title')}
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-md">
              <div className="p-6 border-b border-primary/10">
                <h2 className="font-rubik font-semibold text-lg text-primary">
                  {t('cart.products')}
                </h2>
              </div>
              <div className="divide-y divide-primary/5">
                {state.items.map((item, index) => (
                  <CartItem key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="lg:col-span-1">
            <CartTotals />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}