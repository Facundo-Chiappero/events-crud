import { Clipboard, Trash } from './Icons'
import { ROLES } from '../../types.d'
import UpdateModal from '../modals/UpdateModal'
import CreateModal from '../modals/CreateModal'
import DeleteModal from '../modals/DeleteModal'
import { useEventManager } from '../hooks/useEventManager'
import { useStore } from '../hooks/useStore'
import MainHeader from './MainHeader'
import PurchaseModal from '../modals/PurchaseModal'
import { MAIN } from '../utils/frontendConsts'
// import CheckOutButton from './CheckOutButton';

// here is were most of the things happen, in the top there's th header with the buttons to create a new event if the user is admin, and the button to log out
// if there are events, they are displayed; otherwise, a message is shown indicating that no events are available.
// at the bottom there are the modals, only displayed when their states are true
export default function Main() {
  const { state } = useStore()

  const {
    formData,
    showUpdateModal,
    showCreateModal,
    showDeleteModal,
    selectedEvent,
    eventToDelete,
    eventToPurchase,
    showPurchaseModal,
    handleInputChange,
    openCreateModal,
    handleCreateSubmit,
    openEditModal,
    handleUpdateSubmit,
    openDeleteModal,
    handleConfirmDelete,
    setShowUpdateModal,
    setShowCreateModal,
    setShowDeleteModal,
    setEventToDelete,
    openPurchaseModal,
    closePurchaseModal,
  } = useEventManager()

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <MainHeader user={state.user} openCreateModal={openCreateModal} />

      {/* Events */}
      <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {state.events ? (
          state.events?.map((event) => (
            <article
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition items-center flex flex-col"
              key={event.id}
            >
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="mb-2 text-gray-300 text-center">
                {event.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-3 justify-center">
                {event.images
                  .filter((img) => img.trim() !== '')
                  .map((img) => (
                    <img
                      key={img}
                      src={img}
                      alt={event.title}
                      className="w-full max-w-[200px] rounded object-cover"
                    />
                  ))}
              </div>

              <p className="text-sm text-gray-400 mb-1">
                {MAIN.PRICE_LABEL}
                {event.price}
              </p>
              <time className="text-sm text-gray-400">
                {new Date(event.date).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </time>

              {/* if the user is admin can see the update and delete buttons */}
              {state.user?.role === ROLES.ADMIN && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => openEditModal(event)}
                    className="bg-blue-600 p-2 rounded hover:bg-blue-700"
                  >
                    <Clipboard />
                  </button>
                  <button
                    onClick={() => openDeleteModal(event)}
                    className="bg-red-600 p-2 rounded hover:bg-red-700"
                  >
                    <Trash />
                  </button>
                </div>
              )}

              {state.user?.role === ROLES.USER && (
                <button
                  onClick={() => openPurchaseModal(event)}
                  className="bg-green-500 text-white p-3 rounded hover:bg-green-600 mt-4"
                >
                  {MAIN.BUY_BUTTON}
                </button>
              )}
            </article>
          ))
        ) : (
          <div>{MAIN.NO_EVENTS_MESSAGE}</div>
        )}
      </main>

      {/* Modals */}
      {showUpdateModal && selectedEvent && (
        <UpdateModal
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleUpdateSubmit}
          selectedEvent={selectedEvent}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}
      {showCreateModal && (
        <CreateModal
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleCreateSubmit}
          setShowUpdateModal={setShowCreateModal}
        />
      )}
      {showDeleteModal && eventToDelete && (
        <DeleteModal
          eventToDelete={eventToDelete}
          setShowDeleteModal={setShowDeleteModal}
          setEventToDelete={setEventToDelete}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}
      {showPurchaseModal && eventToPurchase && (
        <PurchaseModal
          event={eventToPurchase}
          onClose={closePurchaseModal}
          user={state.user?.id}
        />
      )}
    </div>
  )
}
