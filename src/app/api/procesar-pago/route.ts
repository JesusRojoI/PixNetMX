import { NextResponse } from 'next/server';

const API_URL = "https://pagos.keycop.com.mx/api/v1";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      nombreTarjeta, 
      numeroTarjeta, 
      fechaTarjeta, 
      cvv, 
      monto, 
      nombre, 
      apellidos, 
      email, 
      direccion, 
      poblacion, 
      region, 
      codigoPostal, 
      telefono 
    } = body;

    const keycopEmail = process.env.KEYCOP_EMAIL;
    const keycopPassword = process.env.KEYCOP_PASSWORD;

    console.log('🔑 Keycop:', { 
      email: keycopEmail ? '✅' : '❌', 
      password: keycopPassword ? '✅' : '❌' 
    });

    if (!keycopEmail || !keycopPassword) {
      return NextResponse.json(
        { success: false, message: 'Configuración de pago incompleta' }, 
        { status: 500 }
      );
    }

    const amount = Number(monto);
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Monto inválido' }, 
        { status: 400 }
      );
    }

    // 1. Autenticación
    console.log('🔐 Autenticando...');
    
    const authResponse = await fetch(`${API_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: keycopEmail,
        password: keycopPassword
      })
    });

    if (!authResponse.ok) {
      return NextResponse.json(
        { success: false, message: 'Error de autenticación' }, 
        { status: 500 }
      );
    }

    const authData = await authResponse.json();
    const authToken = authData.authToken;
    
    if (!authToken) {
      return NextResponse.json(
        { success: false, message: 'Token no recibido' }, 
        { status: 500 }
      );
    }

    console.log('✅ Autenticado');

    // 2. Tokenización
    const [month, year] = fechaTarjeta.split('/');
    console.log('💳 Tokenizando...');
    
    const tokenResponse = await fetch(`${API_URL}/card/tokenizer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        cardData: {
          cardNumber: numeroTarjeta.replace(/\s/g, ''),
          cardholderName: nombreTarjeta,
          expirationYear: '20' + year,
          expirationMonth: month
        }
      })
    });

    if (!tokenResponse.ok) {
      return NextResponse.json(
        { success: false, message: 'Error al tokenizar la tarjeta' }, 
        { status: 400 }
      );
    }

    const tokenData = await tokenResponse.json();
    const cardToken = tokenData.cardNumberToken;
    
    if (!cardToken) {
      return NextResponse.json(
        { success: false, message: 'No se pudo tokenizar la tarjeta' }, 
        { status: 400 }
      );
    }

    console.log('✅ Tokenizada');

    // 3. Venta
    const orderId = 'TXN-' + Date.now();
    console.log('💰 Procesando venta...');
    
    const saleResponse = await fetch(`${API_URL}/sale`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        amount: amount,
        currency: "484",
        reference: orderId,
        customerInformation: {
          firstName: (nombre || 'Cliente').trim(),
          lastName: (apellidos || 'PixNetMX').trim(),
          email: (email || 'cliente@pixnetmx.com').trim(),
          phone1: (telefono || '5555555555').trim(),
          address1: (direccion || 'Sin dirección').trim(),
          address2: "",
          city: (poblacion || 'Ciudad de México').trim(),
          state: (region || 'Ciudad de México').trim(),
          postalCode: (codigoPostal || '06500').trim(),
          country: "MX",
          company: "",
          ip: request.headers.get('x-forwarded-for') || '127.0.0.1',
        },
        cardData: { 
          cardNumberToken: cardToken, 
          cvv: cvv 
        },
      })
    });

    const saleData = await saleResponse.json();
    console.log('✅ Venta:', JSON.stringify(saleData).substring(0, 200));

    if (saleData.status === "APPROVED") {
      return NextResponse.json({ 
        success: true, 
        transactionId: saleData.orderId || saleData.reference || orderId, 
        reference: saleData.reference || orderId, 
        status: saleData.status, 
        message: 'Pago aprobado' 
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          status: saleData.status, 
          message: saleData.responseMessage || saleData.message || 'Pago rechazado' 
        }, 
        { status: 400 }
      );
    }

  } catch (error: any) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      { success: false, message: 'Error procesando el pago' }, 
      { status: 500 }
    );
  }
}