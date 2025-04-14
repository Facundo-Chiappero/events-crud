import React from 'react'
import { MODAL_TEXTS, FORM_PLACEHOLDERS } from '../utils/frontendConsts'

interface Props {
  formData: {
    title: string
    description: string
    date: string
    price: string
    images: string
  }
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  setShowUpdateModal: (value: boolean) => void
}

// this modal is displayed when an admin wants to create a new event, it has all the required field, including the optional images
export default function CreateModal({
  formData,
  handleInputChange,
  handleSubmit,
  setShowUpdateModal,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 w-full max-w-2xl mx-4 p-6 rounded-lg shadow-lg text-white overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-bold mb-4">
          {MODAL_TEXTS.CREATE_EVENT_TITLE}
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
              placeholder={FORM_PLACEHOLDERS.TITLE}
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
              placeholder={FORM_PLACEHOLDERS.DESCRIPTION}
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
              className="w-full p-2 rounded border border-white bg-white text-black flex"
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
              placeholder={FORM_PLACEHOLDERS.PRICE}
              className="w-full p-2 rounded border border-white bg-white text-black"
            />
          </div>

          <div>
            <label className="block mb-1">{MODAL_TEXTS.LABEL_IMAGES}</label>
            <input
              name="images"
              value={formData.images}
              onChange={handleInputChange}
              placeholder={FORM_PLACEHOLDERS.IMAGES}
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
