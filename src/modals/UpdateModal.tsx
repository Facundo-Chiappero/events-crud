import { EventType } from '../../types.d'

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

//this modal is shown when a admin wants to update a event, it has all the fields to complete with the required data, the fields are completed by default with the previous data, using the formData prop
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
          Edit Event: {selectedEvent?.title}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Title</label>
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
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded border border-white bg-white text-black resize-none"
            />
          </div>

          <div>
            <label className="block mb-1">Date</label>
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
            <label className="block mb-1">Price</label>
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
            <label className="block mb-1">Images (comma-separated URLs)</label>
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
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowUpdateModal(false)}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
