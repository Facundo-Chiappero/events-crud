import { EventType } from '../../types.d'

interface DeleteModalProps {
  eventToDelete: EventType | null
  setShowDeleteModal: (value: boolean) => void
  setEventToDelete: (value: EventType | null) => void
  handleConfirmDelete: () => void
}

//this modal is shown when a admin wants to delete a event, it asks the admin to confirm the delete to avoid human errors
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
              Delete "{eventToDelete.title}"?
            </h3>
            <p className="mb-6 text-gray-300">This action can't be undone.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setEventToDelete(null)
                }}
                className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-300">There are no events to delete.</p>
        )}
      </div>
    </div>
  )
}
