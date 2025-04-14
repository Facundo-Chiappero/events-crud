import { EventType } from '../../types.d'
import { MODAL_TEXTS } from '../utils/frontendConsts'

interface UpdateModalProps {
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  formData: {
    title: string
    description: string
    date: string
    price: string
    images: string
  }
  selectedEvent: EventType | null
  setShowUpdateModal: (val: boolean) => void
}

//this modal is shown when an admin wants to update an event, it has all the fields to complete with the required data, the fields are completed by default with the previous data, using the formData prop
export default function UpdateModal({
  handleInputChange,
  handleSubmit,
  formData,
  selectedEvent,
  setShowUpdateModal,
}: UpdateModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 w-full max-w-2xl mx-4 p-6 rounded-lg shadow-lg text-white overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-bold mb-4">
          {`${MODAL_TEXTS.CREATE_EVENT_TITLE}: ${selectedEvent?.title}`}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">{MODAL_TEXTS.LABEL_TITLE}</label>
            <input
              autoFocus
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded border border-white bg-white text-black"
            />
          </div>

          <div>
            <label className="block mb-1">
              {MODAL_TEXTS.LABEL_DESCRIPTION}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded border border-white bg-white text-black resize-none"
            />
          </div>

          <div>
            <label className="block mb-1">{MODAL_TEXTS.LABEL_DATE}</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded border border-white bg-white text-black"
            />
          </div>

          <div>
            <label className="block mb-1">{MODAL_TEXTS.LABEL_PRICE}</label>
            <input
              type="number"
              name="price"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded border border-white bg-white text-black"
            />
          </div>

          <div>
            <label className="block mb-1">{MODAL_TEXTS.LABEL_IMAGES}</label>
            <input
              name="images"
              value={formData.images}
              onChange={handleInputChange}
              className="w-full p-2 rounded border border-white bg-white text-black"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
            >
              {MODAL_TEXTS.BUTTON_SAVE}
            </button>
            <button
              type="button"
              onClick={() => setShowUpdateModal(false)}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
            >
              {MODAL_TEXTS.BUTTON_CANCEL}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
