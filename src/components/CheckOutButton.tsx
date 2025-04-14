import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND, ENDPOINTS } from '../utils/frontendConsts'
import { Spinner } from './Icons'

interface Props {
  title: string
  price: number
  user: number | undefined
  eventId: number
}

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, {
  locale: 'en-US',
})

// this generates the mercado pago pay button, used in purchase modal
export default function CheckOutButton({ title, price, user, eventId }: Props) {
  const [preferenceId, setPreferenceId] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.post(
          `${BACKEND}/${ENDPOINTS.CREATE_PREFERENCE}`,
          {
            id: Date.now() + (user as number),
            title,
            unit_price: price,
            userId: user,
            eventId,
          }
        )

        setPreferenceId(response.data.id)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [price, title, user, eventId])

  return (
    <div>
      {preferenceId ? (
        <Wallet initialization={{ preferenceId }} />
      ) : (
        <Spinner />
      )}
    </div>
  )
}
