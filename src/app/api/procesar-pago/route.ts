import { NextResponse } from 'next/server';

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

    const API_URL = process.env.ETOMIN_BASE_URL || 'https://api.etomin.com/v1';
    const etominUser = process.env.ETOMIN_USER;
    const etominPassword = process.env.ETOMIN_PASSWORD;

    console.log('🔑 Credenciales:', { 
      url: API_URL,
      user: etominUser ? '✅' : '❌', 
      password: etominPassword ? '✅' : '❌' 
    });

    if (!etominUser || !etominPassword) {
      console.error('❌ Variables de entorno no encontradas');
      return NextResponse.json(
        { success: false, message: 'Configuración de pago incompleta' }, 
        { status: 500 }
      );
    }

    // Validar monto
    const amount = Number(monto);
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Monto inválido' }, 
        { status: 400 }
      );
    }

    // 1. Autenticación con Etomin
    console.log('🔐 Autenticando con Etomin...');
    let authResponse;
    try {
      authResponse = await fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: etominUser,
          password: etominPassword
        })
      });
      
      if (!authResponse.ok) {
        const errorData = await authResponse.json();
        throw new Error(errorData.message || 'Error de autenticación');
      }
      
      const authData = await authResponse.json();
      console.log('✅ Auth exitoso');
      
      const authToken = authData.authToken;
      if (!authToken) {
        console.error('❌ No se recibió token');
        return NextResponse.json(
          { success: false, message: 'Token no recibido' }, 
          { status: 500 }
        );
      }

      // 2. Tokenización de tarjeta
      const [month, year] = fechaTarjeta.split('/');
      console.log('💳 Tokenizando tarjeta...');
      
      let tokenResponse;
      try {
        tokenResponse = await fetch(`${API_URL}/card/tokenizer`, {
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
          const errorData = await tokenResponse.json();
          throw new Error(errorData.message || 'Error al tokenizar la tarjeta');
        }
        
        const tokenData = await tokenResponse.json();
        console.log('✅ Tarjeta tokenizada');
        
        const cardToken = tokenData.cardNumberToken;
        if (!cardToken) {
          return NextResponse.json(
            { success: false, message: 'No se pudo tokenizar la tarjeta' }, 
            { status: 400 }
          );
        }

        // 3. Procesar venta
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
              middleName: "",
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
        console.log('✅ Respuesta de venta:', saleData);

        // 4. Verificar respuesta
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
              message: saleData.message || 'Pago rechazado' 
            }, 
            { status: 400 }
          );
        }
      } catch (tokenError: any) {
        console.error('❌ Error tokenización:', tokenError.message);
        return NextResponse.json(
          { success: false, message: tokenError.message || 'Error al tokenizar la tarjeta' }, 
          { status: 400 }
        );
      }
    } catch (authError: any) {
      console.error('❌ Error de autenticación:', authError.message);
      return NextResponse.json(
        { success: false, message: authError.message || 'Error de autenticación con Etomin' }, 
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('❌ Error general:', error.message);
    return NextResponse.json(
      { 
        success: false, 
        status: 'error', 
        message: 'Error procesando el pago' 
      }, 
      { status: 500 }
    );
  }
}