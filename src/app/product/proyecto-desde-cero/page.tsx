'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import SectionWrapper from '@/components/shared/SectionWrapper';
import Button from '@/components/shared/Button';
import toast from 'react-hot-toast';

export default function ProyectoDesdeCeroPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { addCustomItem } = useCart();
  const [quoteNumber, setQuoteNumber] = useState('');
  const [investment, setInvestment] = useState('1.00');
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState('');

  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setInvestment(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!quoteNumber.trim()) {
      toast.error(t('solutions.customProductPage.validation.quoteRequired'));
      return;
    }

    const investmentNum = parseFloat(investment);
    if (!investment || isNaN(investmentNum) || investmentNum <= 0) {
      toast.error(t('solutions.customProductPage.validation.investmentRequired'));
      return;
    }

    if (investmentNum <= 0) {
      toast.error(t('solutions.customProductPage.validation.investmentInvalid'));
      return;
    }

    // Usar el contexto del carrito
    addCustomItem({
  id: `custom-${quoteNumber.trim()}`,
  title: t('solutions.customProductPage.title'),
  titleKey: 'solutions.customProductPage.title',
  price: investmentNum,
  quantity: quantity,
  custom: true,
  quoteNumber: quoteNumber.trim(),
});

    setAddedMessage(`${quantity} × "${t('solutions.customProductPage.title')}" ${t('solutions.customProductPage.addedToCart')}`);
    toast.success(`${quantity} × "${t('solutions.customProductPage.title')}" ${t('solutions.customProductPage.addedToCart')}`);
  };

  return (
    <SectionWrapper className="pt-32 pb-16 md:pt-40 md:pb-24 min-h-screen bg-primary-light/10">
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Image - Left 40% */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative"
          >
            <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden">
              <Image
                src="/custom-project.png"
                alt={t('solutions.customProductPage.title')}
                fill
                className="object-cover shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Content - Right 60% */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <h1 className="font-rubik text-3xl md:text-4xl font-bold text-primary mb-6">
              {t('solutions.customProductPage.title')}
            </h1>
            <p className="font-inter text-lg text-text-primary mb-4 leading-relaxed">
              {t('solutions.customProductPage.subtitle')}
            </p>
            <p className="font-inter text-base text-text-secondary mb-8 leading-relaxed">
              {t('solutions.customProductPage.desc')}
            </p>

            {/* Aviso de añadido */}
            {addedMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-300 p-4 mb-6"
              >
                <p className="font-inter text-sm text-green-800">{addedMessage}</p>
              </motion.div>
            )}

            {/* Formulario */}
            <div className="space-y-6">
              <div>
                <label className="block font-inter text-sm font-medium text-text-primary mb-2">
                  {t('solutions.customProductPage.quoteNumber')}
                </label>
                <input
                  type="text"
                  value={quoteNumber}
                  onChange={(e) => setQuoteNumber(e.target.value)}
                  placeholder={t('solutions.customProductPage.quotePlaceholder')}
                  className="w-full px-4 py-3 border border-primary/20 bg-white focus:border-primary focus:outline-none transition-colors font-inter"
                />
              </div>

              <div>
                <label className="block font-inter text-sm font-medium text-text-primary mb-2">
                  {t('solutions.customProductPage.investment')}
                </label>
                <input
                  type="text"
                  value={investment}
                  onChange={handleInvestmentChange}
                  className="w-full px-4 py-3 border border-primary/20 bg-white focus:border-primary focus:outline-none transition-colors font-inter"
                />
              </div>

              <div>
                <label className="block font-inter text-sm font-medium text-text-primary mb-2">
                  {t('solutions.customProductPage.quantity')}
                </label>
                <div className="flex items-center border border-primary/20 w-fit">
                  <button
                    type="button"
                    onClick={decrementQuantity}
                    className="w-10 h-10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors font-bold"
                  >
                    −
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center font-inter text-sm border-x border-primary/20">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={incrementQuantity}
                    className="w-10 h-10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
  <Button onClick={handleAddToCart} variant="primary" size="lg">
    {t('solutions.customProductPage.addToCart')}
  </Button>

  {addedMessage && (
    <Button href="/cart" variant="secondary" size="lg">
      {t('solutions.customProductPage.viewCart')}
    </Button>
  )}
</div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}