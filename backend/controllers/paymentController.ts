import { RequestHandler } from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || '',
});

export const createPreference: RequestHandler = async (req, res) => {
  const { id, title, unit_price } = req.body as {
    id: string;
    title: string;
    unit_price: number;
  };

  if (!title || !unit_price) {
    res.status(400).json({ message: 'Faltan datos requeridos' });
    return;
  }

  try {
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            id,
            title,
            unit_price,
            quantity: 1,
          },
        ],
        back_urls: {
          success: "http://localhost:5173/success",
          failure: "http://localhost:5173/failure",
          pending: "http://localhost:5173/pending",
        },
        auto_return: "approved",
      },
    });

    res.json({ id: result.id });
  } catch (error) {
    console.error('❌ Error al crear la preferencia de pago:', error);
    res.status(500).json({ message: 'Error al crear la preferencia de pago' });
  }
};
