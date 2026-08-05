'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { countries, mexicanStates } from '@/data/countries';

interface BillingFormProps {
  data: {
    name: string;
    lastname: string;
    country: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
    notes: string;
  };
  setData: (data: any) => void;
}

export default function BillingForm({ data, setData }: BillingFormProps) {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  const getCountryName = (country: typeof countries[0]) => {
    return isEnglish ? country.nameEn : country.name;
  };

  const getStateName = (state: typeof mexicanStates[0]) => {
    return isEnglish ? state.nameEn : state.name;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md p-8"
    >
      <h2 className="font-rubik font-semibold text-xl text-primary mb-6">
        {t('payment.title')}
      </h2>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-inter text-sm font-medium text-text-primary mb-2">
              {t('payment.name')}
            </label>
            <input
              type="text"
              required
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full px-4 py-3 border border-primary/20 focus:border-primary focus:outline-none transition-colors font-inter"
            />
          </div>
          <div>
            <label className="block font-inter text-sm font-medium text-text-primary mb-2">
              {t('payment.lastname')}
            </label>
            <input
              type="text"
              required
              value={data.lastname}
              onChange={(e) => setData({ ...data, lastname: e.target.value })}
              className="w-full px-4 py-3 border border-primary/20 focus:border-primary focus:outline-none transition-colors font-inter"
            />
          </div>
        </div>

        <div>
          <label className="block font-inter text-sm font-medium text-text-primary mb-2">
            {t('payment.country')}
          </label>
          <select
            value={data.country}
            onChange={(e) => setData({ ...data, country: e.target.value })}
            className="w-full px-4 py-3 border border-primary/20 focus:border-primary focus:outline-none transition-colors font-inter bg-white"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {getCountryName(country)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-inter text-sm font-medium text-text-primary mb-2">
            {t('payment.address')}
          </label>
          <input
            type="text"
            required
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            placeholder={t('payment.addressPlaceholder')}
            className="w-full px-4 py-3 border border-primary/20 focus:border-primary focus:outline-none transition-colors font-inter"
          />
        </div>

        <div>
          <input
            type="text"
            value={data.address2}
            onChange={(e) => setData({ ...data, address2: e.target.value })}
            placeholder={t('payment.address2Placeholder')}
            className="w-full px-4 py-3 border border-primary/20 focus:border-primary focus:outline-none transition-colors font-inter"
          />
        </div>

        <div>
          <label className="block font-inter text-sm font-medium text-text-primary mb-2">
            {t('payment.city')}
          </label>
          <input
            type="text"
            required
            value={data.city}
            onChange={(e) => setData({ ...data, city: e.target.value })}
            className="w-full px-4 py-3 border border-primary/20 focus:border-primary focus:outline-none transition-colors font-inter"
          />
        </div>

        <div>
          <label className="block font-inter text-sm font-medium text-text-primary mb-2">
            {t('payment.state')}
          </label>
          <select
            value={data.state}
            onChange={(e) => setData({ ...data, state: e.target.value })}
            className="w-full px-4 py-3 border border-primary/20 focus:border-primary focus:outline-none transition-colors font-inter bg-white"
          >
            {mexicanStates.map((state) => (
              <option key={state.code} value={state.code}>
                {getStateName(state)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-inter text-sm font-medium text-text-primary mb-2">
              {t('payment.zip')}
            </label>
            <input
              type="text"
              required
              value={data.zip}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                setData({ ...data, zip: value });
              }}
              className="w-full px-4 py-3 border border-primary/20 focus:border-primary focus:outline-none transition-colors font-inter"
            />
          </div>
          <div>
            <label className="block font-inter text-sm font-medium text-text-primary mb-2">
              {t('payment.phone')}
            </label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setData({ ...data, phone: value });
              }}
              className="w-full px-4 py-3 border border-primary/20 focus:border-primary focus:outline-none transition-colors font-inter"
            />
          </div>
        </div>

        <div>
          <label className="block font-inter text-sm font-medium text-text-primary mb-2">
            {t('payment.email')}
          </label>
          <input
            type="email"
            required
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full px-4 py-3 border border-primary/20 focus:border-primary focus:outline-none transition-colors font-inter"
          />
        </div>

        <div>
          <label className="block font-inter text-sm font-medium text-text-primary mb-2">
            {t('payment.notes')}
          </label>
          <textarea
            rows={3}
            value={data.notes}
            onChange={(e) => setData({ ...data, notes: e.target.value })}
            placeholder={t('payment.notesPlaceholder')}
            className="w-full px-4 py-3 border border-primary/20 focus:border-primary focus:outline-none transition-colors font-inter resize-none"
          />
        </div>
      </div>
    </motion.div>
  );
}