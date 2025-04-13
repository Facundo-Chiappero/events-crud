import { Clipboard, Trash } from './Icons'
import { ROLES } from '../../types.d'
import UpdateModal from '../modals/UpdateModal'
import CreateModal from '../modals/CreateModal'
import DeleteModal from '../modals/DeleteModal'
import { useEventManager } from '../hooks/useEventManager'
import { useStore } from '../hooks/useStore'
import MainHeader from './MainHeader'
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
                Price: ${event.price}
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

              {/* for a reason i can't figure out all the mercado pago buttons are displayed in the same event, i think it's a matter of synchrony if you want to check it out remove the comment for the CheckOutButton import */}

              {/* 
              
              {state.user?.role === ROLES.USER && (
                <div className="mt-4 w-full">
                  <CheckoutButton
                    price={event.price}
                    title={event.title}
                  />
                </div>
              )}
              
              */}
            </article>
          ))
        ) : (
          <div>There are no events</div>
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
    </div>
  )
}
