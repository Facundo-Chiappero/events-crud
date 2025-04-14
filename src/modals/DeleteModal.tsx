import { EventType } from '../../types.d'
import { MODAL_TEXTS } from '../utils/frontendConsts' // Ajusta el path

interface DeleteModalProps {
  eventToDelete: EventType | null
  setShowDeleteModal: (value: boolean) => void
  setEventToDelete: (value: EventType | null) => void
  handleConfirmDelete: () => void
}

// this modal is displayed when an admin wants to delete a event, it asks for confirmation to avoid human mistakes
export default function DeleteModal({
  eventToDelete,
  setShowDeleteModal,
  setEventToDelete,
  handleConfirmDelete,
}: DeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 w-full max-w-md mx-4 p-6 rounded-lg shadow-lg text-white text-center">
        {eventToDelete ? (
          <>
            <h3 className="text-xl font-bold mb-4">
              {MODAL_TEXTS.DELETE_EVENT_TITLE} "{eventToDelete.title}"?
            </h3>
            <p className="mb-6 text-gray-300">
              {MODAL_TEXTS.DELETE_EVENT_CONFIRM}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                {MODAL_TEXTS.BUTTON_CONFIRM}
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setEventToDelete(null)
                }}
                className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
              >
                {MODAL_TEXTS.BUTTON_CANCEL}
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-300">{MODAL_TEXTS.NO_EVENTS_TO_DELETE}</p>
        )}
      </div>
    </div>
  )
}
