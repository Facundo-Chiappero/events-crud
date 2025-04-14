import CheckOutButton from '../components/CheckOutButton'
import { EventType } from '../reducer/reducer'
import { MODAL_TEXTS } from '../utils/frontendConsts'

interface Props {
  event: EventType
  onClose: () => void
  user: number | undefined
}

// this modal shows the information about the event the user is about to buy, it also loads the mercado pago pay button
export default function PurchaseModal({ event, onClose, user }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 w-full max-w-2xl mx-4 p-6 rounded-lg shadow-lg text-white overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-bold mb-4">
          {MODAL_TEXTS.PURCHASE_CONFIRMATION}
        </h3>

        <div className="space-y-4">
          <div>
            <strong>{MODAL_TEXTS.LABEL_TITLE}</strong>
            <p>{event.title}</p>
          </div>

          <div>
            <strong>{MODAL_TEXTS.LABEL_DESCRIPTION}</strong>
            <p>{event.description}</p>
          </div>

          <div>
            <strong>{MODAL_TEXTS.LABEL_DATE}</strong>
            <p>
              {new Date(event.date).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>

          <div>
            <strong>{MODAL_TEXTS.LABEL_PRICE}</strong>
            <p>${event.price}</p>
          </div>

          {event.images.length > 0 && (
            <div>
              <strong>{MODAL_TEXTS.LABEL_IMAGES}</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {event.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={event.title}
                    className="w-32 h-32 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4 flex-wrap items-start">
            {/* mercado pago button */}
            <CheckOutButton
              price={event.price}
              title={event.title}
              user={user}
              eventId={event.id}
            />

            <button
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 max-h-fit
              "
              onClick={onClose}
            >
              {MODAL_TEXTS.BUTTON_CANCEL}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
