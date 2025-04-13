/* eslint-disable react-hooks/exhaustive-deps */
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Props {
  title: string
  price: number
}

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, {
  locale: 'en-US',
})

export default function CheckOutButton({ title, price }: Props) {
  const [preferenceId, setPreferenceId] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.post(
          'http://localhost:3000/create_preference',
          {
            id: preferenceId,
            title: title,
            unit_price: price,
          }
        )

        setPreferenceId(response.data.id)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [price, title])

  return (
    <div>{preferenceId && <Wallet initialization={{ preferenceId }} />}</div>
  )
}
