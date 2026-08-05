'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/shared/Button';

interface OrderSummaryProps {
  isProcessing: boolean;
}

export default function OrderSummary({ isProcessing }: OrderSummaryProps) {
  const { t } = useTranslation();
  const { state, subtotal, iva, total } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white shadow-md p-6 sticky top-24"
    >
      <h2 className="font-rubik font-semibold text-lg text-primary mb-6">
        {t('payment.orderSummary')}
      </h2>

      <div className="space-y-3 mb-6 pb-6 border-b border-primary/10">
        {state.items.map((item) => (
          <div key={item.id} className="flex justify-between items-start">
            <div className="flex-grow">
              <p className="font-inter text-sm font-medium text-text-primary">
                {t(item.titleKey)}
              </p>
              <p className="font-inter text-xs text-text-secondary">
                × {item.quantity}
              </p>
            </div>
            <span className="font-inter text-sm text-text-primary ml-4">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between font-inter text-sm text-text-secondary">
          <span>{t('payment.subtotal')}</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between font-inter text-sm text-text-secondary">
          <span>{t('payment.iva')}</span>
          <span>{formatPrice(iva)}</span>
        </div>
        <div className="flex justify-between font-rubik font-bold text-lg text-primary pt-3 border-t border-primary/10">
          <span>{t('payment.total')}</span>
          <span>{formatPrice(total)} <span className="text-sm font-normal text-text-secondary">MXN</span></span>
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full mt-6" disabled={isProcessing}>
        {isProcessing ? t('common.loading') : t('payment.submit')}
      </Button>
    </motion.div>
  );
}