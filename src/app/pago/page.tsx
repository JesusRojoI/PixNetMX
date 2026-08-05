'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import BillingForm from '@/components/pago/BillingForm';
import PaymentForm from '@/components/pago/PaymentForm';
import OrderSummary from '@/components/pago/OrderSummary';
import SectionWrapper from '@/components/shared/SectionWrapper';
import toast from 'react-hot-toast';

export default function PagoPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { state, subtotal, iva, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingData, setBillingData] = useState({
    name: '',
    lastname: '',
    country: 'MX',
    address: '',
    address2: '',
    city: '',
    state: 'CDMX',
    zip: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [cardData, setCardData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  if (state.items.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!billingData.name || !billingData.lastname || !billingData.email || !cardData.cardName || !cardData.cardNumber) {
      toast.error(t('payment.validation.nameRequired'));
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch('/api/procesar-pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreTarjeta: cardData.cardName,
          numeroTarjeta: cardData.cardNumber,
          fechaTarjeta: cardData.expiry,
          cvv: cardData.cvc,
          monto: total,
          nombre: billingData.name,
          apellidos: billingData.lastname,
          email: billingData.email,
          direccion: billingData.address,
          poblacion: billingData.city,
          region: billingData.state,
          codigoPostal: billingData.zip,
          telefono: billingData.phone,
          notas: billingData.notes,
        }),
      });

      const result = await response.json();

      if (result.success) {
        try {
          await fetch('/api/enviar-correo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: billingData.email,
              orderData: {
                nombre: `${billingData.name} ${billingData.lastname}`,
                productos: state.items.map(item => ({
                  nombre: t(item.titleKey),
                  cantidad: item.quantity,
                  precio: item.price,
                })),
                subtotal,
                descuento: 0,
                impuesto: iva,
                total,
                transactionId: result.transactionId,
                cupon: '',
              },
              language: i18n.language,
            }),
          });
        } catch (emailError) {
          console.error('Error enviando correo:', emailError);
        }

        clearCart();
        toast.success(t('payment.success'));

        setTimeout(() => {
          router.push(`/pago-exitoso?orderId=${result.transactionId}&amount=${total}`);
        }, 1000);
        
      } else {
        toast.error(result.message || t('payment.error'));
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Error en el pago:', error);
      toast.error(t('payment.error'));
      setIsProcessing(false);
    }
  };

  return (
    <SectionWrapper className="pt-32 pb-16 md:pt-40 md:pb-24 min-h-screen bg-primary-light/10">
      <div className="section-padding">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-title mb-12"
        >
          {t('payment.title')}
        </motion.h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <BillingForm data={billingData} setData={setBillingData} />
              <PaymentForm data={cardData} setData={setCardData} />
            </div>

            <div className="lg:col-span-1">
              <OrderSummary isProcessing={isProcessing} />
            </div>
          </div>
        </form>
      </div>
    </SectionWrapper>
  );
}