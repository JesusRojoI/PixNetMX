'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { CartItem as CartItemType } from '@/data/services';

interface CartItemProps {
  item: CartItemType;
  index: number;
}

export default function CartItem({ item, index }: CartItemProps) {
  const { t } = useTranslation();
  const { removeItem, updateQuantity } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

 const getItemTitle = () => {
  if (item.custom) {
    return t('solutions.customProductPage.title');
  }
  return t(item.titleKey);
};

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
    >
      <div className="flex-grow">
        <h3 className="font-rubik font-semibold text-primary">
          {getItemTitle()}
        </h3>
        <p className="font-inter text-sm text-text-secondary mt-1">
          {formatPrice(item.price)}
        </p>
        {item.custom && item.quoteNumber && (
          <p className="font-inter text-xs text-text-secondary mt-1">
            {t('cart.quoteNumber')}: {item.quoteNumber}
          </p>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center border border-primary/20">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center hover:bg-primary hover:text-white transition-colors font-bold"
          >
            −
          </button>
          <span className="w-10 h-8 flex items-center justify-center font-inter text-sm border-x border-primary/20">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center hover:bg-primary hover:text-white transition-colors font-bold"
          >
            +
          </button>
        </div>

        <span className="font-rubik font-bold text-primary min-w-[100px] text-right">
          {formatPrice(item.price * item.quantity)}
        </span>

        <button
          onClick={() => removeItem(item.id)}
          className="text-red-400 hover:text-red-600 transition-colors p-2"
          title={t('cart.remove')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}