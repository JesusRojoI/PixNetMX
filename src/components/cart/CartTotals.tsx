'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/shared/Button';
import toast from 'react-hot-toast';

export default function CartTotals() {
  const { t } = useTranslation();
  const { subtotal, iva, total } = useCart();
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      toast.error(t('cart.couponInvalid'));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white shadow-md p-6 sticky top-24"
    >
      <h2 className="font-rubik font-semibold text-lg text-primary mb-6">
        {t('cart.totals')}
      </h2>

      {/* Coupon */}
      <div className="mb-6">
        <button
          onClick={() => setShowCoupon(!showCoupon)}
          className="font-inter text-sm text-primary hover:text-primary-dark transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          {t('cart.coupon')}
        </button>

        <AnimatePresence>
          {showCoupon && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder={t('cart.couponCode')}
                  className="flex-grow px-3 py-2 border border-primary/20 focus:border-primary focus:outline-none text-sm font-inter"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-primary text-white px-4 py-2 text-sm font-rubik font-semibold hover:bg-primary-dark transition-colors"
                >
                  {t('cart.couponApply')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Totals */}
      <div className="space-y-3 py-4 border-t border-primary/10">
        <div className="flex justify-between font-inter text-text-secondary">
          <span>{t('cart.subtotal')}</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between font-inter text-text-secondary">
          <span>{t('cart.iva')}</span>
          <span>{formatPrice(iva)}</span>
        </div>
        <div className="flex justify-between font-rubik font-bold text-lg text-primary pt-3 border-t border-primary/10">
          <span>{t('cart.estimatedTotal')}</span>
          <span>{formatPrice(total)} <span className="text-sm font-normal text-text-secondary">MXN</span></span>
        </div>
      </div>

      <Button href="/pago" variant="primary" size="lg" className="w-full mt-6">
        {t('cart.checkout')}
      </Button>
    </motion.div>
  );
}