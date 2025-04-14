import { RequestHandler } from 'express'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { PrismaClient } from '@prisma/client'
import { PAYMENT_MESSAGES, PAYMENT_ERRORS, PAYMENT } from '../utils/backendConsts'

const prisma = new PrismaClient()

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || '',
})

export const createPreference: RequestHandler = async (req, res) => {
  const { id, title, unit_price, userId, eventId } = req.body

  if (!title || !unit_price || !userId) {
    console.warn(PAYMENT_ERRORS.MISSING)
    res.status(400).json({ message: PAYMENT_MESSAGES.MISSING_DATA })
    return
  }

  try {
    const preference = new Preference(client)
    const data = {
      event_id: eventId,
      user_id: userId,
    }

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
        additional_info: JSON.stringify({}),
        metadata: {
          data,
        },
        back_urls: {
          success: process.env.FRONTEND,
          failure: process.env.FRONTEND,
          pending: process.env.FRONTEND,
        },
        notification_url: PAYMENT.NOTIFICATION_URL,
        auto_return: PAYMENT.AUTO_RETURN,
      },
    })

    res.json({ id: result.id })
  } catch (error) {
    console.error(PAYMENT_ERRORS.CREATE, error)
    res.status(500).json({ message: PAYMENT_MESSAGES.CREATE_ERROR })
  }
}

export const handleWebhook: RequestHandler = async (req, res) => {

  try {
    const { topic, resource } = req.body

    if (topic === 'payment') {
      const paymentId = resource

      const response = await fetch(`${PAYMENT.MERCADO_PAGO_URL}/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      })

      const paymentData = await response.json()

      if (paymentData.status === PAYMENT.APPROVED) {
        const amount = paymentData.transaction_amount
        const userId = paymentData.metadata?.data?.user_id
        const eventId = paymentData.metadata?.data?.event_id

        if (!userId || !eventId) {
          console.warn(PAYMENT_ERRORS.WEBHOOK_NO_METADATA)
          res.sendStatus(400)
          return
        }

        await prisma.payment.create({
          data: {
            userId,
            eventId,
            amount,
          },
        })

        console.log(PAYMENT_MESSAGES.WEBHOOK_SAVE_SUCCESS)
      }
    }

    res.sendStatus(200)
  } catch (error) {
    console.error(PAYMENT_ERRORS.WEBHOOK, error)
    res.sendStatus(500)
  }
}
