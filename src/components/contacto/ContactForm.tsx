'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/shared/SectionWrapper';
import Button from '@/components/shared/Button';
import toast from 'react-hot-toast';

export default function ContactForm() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enviar-correo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: formData.email,
          subject: 'Nuevo mensaje de contacto - PixNetMX',
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          type: 'contact',
          language: i18n.language,
        }),
      });

      if (response.ok) {
        toast.success(t('contact.form.success'));
        setFormData({ name: '', company: '', email: '', phone: '', message: '' });
      } else {
        toast.error(t('contact.form.error'));
      }
    } catch (error) {
      toast.error(t('contact.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper className="py-16 md:py-24 bg-white" id="form">
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info - 40% */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h2 className="font-rubik text-2xl font-bold text-primary mb-8">
              {t('contact.info.title')}
            </h2>
            
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-rubik font-semibold text-primary">{t('contact.info.emailLabel')}</p>
                  <p className="font-inter text-text-secondary">{t('contact.info.email')}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-rubik font-semibold text-primary">{t('contact.info.phoneLabel')}</p>
                  <p className="font-inter text-text-secondary">{t('contact.info.phone')}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-rubik font-semibold text-primary">{t('contact.info.addressLabel')}</p>
                  <p className="font-inter text-text-secondary text-sm leading-relaxed">
                    {t('contact.info.address')}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-8 pt-8 border-t border-primary/10">
              <p className="font-inter text-sm text-text-secondary mb-3">{t('contact.info.paymentMethods')}</p>
              <div className="flex items-center gap-4">
                <Image src="/visa.svg" alt="Visa" width={50} height={30} className="opacity-70" />
                <Image src="/mastercard.svg" alt="Mastercard" width={45} height={30} className="opacity-70" />
              </div>
            </div>
          </motion.div>

          {/* Contact Form - 60% */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-primary-light/20 p-8 md:p-10 border border-primary/10">
              <h2 className="font-rubik text-2xl font-bold text-primary mb-8">
                {t('contact.form.title')}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-inter text-sm font-medium text-text-primary mb-2">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-primary/20 bg-white focus:border-primary focus:outline-none transition-colors font-inter"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-sm font-medium text-text-primary mb-2">
                      {t('contact.form.company')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 border border-primary/20 bg-white focus:border-primary focus:outline-none transition-colors font-inter"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-inter text-sm font-medium text-text-primary mb-2">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-primary/20 bg-white focus:border-primary focus:outline-none transition-colors font-inter"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-sm font-medium text-text-primary mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-primary/20 bg-white focus:border-primary focus:outline-none transition-colors font-inter"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-inter text-sm font-medium text-text-primary mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-primary/20 bg-white focus:border-primary focus:outline-none transition-colors font-inter resize-none"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? t('common.loading') : t('contact.form.submit')}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}