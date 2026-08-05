'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PaymentFormProps {
  data: {
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
  };
  setData: (data: any) => void;
}

export default function PaymentForm({ data, setData }: PaymentFormProps) {
  const { t } = useTranslation();

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length > 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    return cleaned;
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setData({ ...data, cvc: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white shadow-md p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-rubik font-semibold text-xl text-primary">
          {t('payment.cardTitle')}
        </h2>
        <div className="flex items-center gap-3 bg-gradient-to-r from-primary/80 to-primary px-4 py-2">
          <span className="font-inter text-xs text-white whitespace-nowrap">
            {t('payment.securePayments')}
          </span>
          <div className="relative w-20 h-8">
            <Image
              src="/etomin.svg"
              alt="Etomin"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block font-inter text-sm font-medium text-text-primary mb-2">
            {t('payment.cardName')}
          </label>
          <input
            type="text"
            required
            value={data.cardName}
            onChange={(e) => setData({ ...data, cardName: e.target.value })}
            className="w-full px-4 py-3 border border-primary/20 focus:border-primary focus:outline-none transition-colors font-inter"
          />
        </div>

        <div>
          <label className="block font-inter text-sm font-medium text-text-primary mb-2">
            {t('payment.cardNumber')}
          </label>
          <input
            type="text"
            required
            value={data.cardNumber}
            onChange={(e) => setData({ ...data, cardNumber: formatCardNumber(e.target.value) })}
            placeholder="0000 0000 0000 0000"
            className="w-full px-4 py-3 border border-primary/20 focus:border-primary focus:outline-none transition-colors font-inter"
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block font-inter text-sm font-medium text-text-primary mb-2">
              {t('payment.cardExpiry')}
            </label>
            <input
              type="text"
              required
              value={data.expiry}
              onChange={(e) => setData({ ...data, expiry: formatExpiry(e.target.value) })}
              placeholder="MM/AA"
              className="w-full px-4 py-3 border border-primary/20 focus:border-primary focus:outline-none transition-colors font-inter"
            />
          </div>
          <div>
            <label className="block font-inter text-sm font-medium text-text-primary mb-2">
              {t('payment.cardCvc')}
            </label>
            <input
              type="password"
              required
              value={data.cvc}
              onChange={handleCvcChange}
              placeholder="•••"
              maxLength={4}
              autoComplete="off"
              inputMode="numeric"
              className="w-full px-4 py-3 border border-primary/20 focus:border-primary focus:outline-none transition-colors font-inter"
            />
          </div>
        </div>
      </div>

      <p className="mt-6 font-inter text-xs text-text-secondary leading-relaxed">
        {t('payment.privacyText')}{' '}
        <a href="/aviso-de-privacidad" className="text-primary hover:text-primary-dark underline">
          {t('payment.privacy')}
        </a>
        .
      </p>
    </motion.div>
  );
}