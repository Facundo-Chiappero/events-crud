import UpdateModal from '../modals/UpdateModal'
import CreateModal from '../modals/CreateModal'
import DeleteModal from '../modals/DeleteModal'
import { useEventManager } from '../hooks/useEventManager'
import { useStore } from '../hooks/useStore'
import MainHeader from './MainHeader'
import PurchaseModal from '../modals/PurchaseModal'
import { MAIN } from '../utils/frontendConsts'
import EventCard from './EventCard'
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
            <EventCard key={`event-card-${event.id}`} event={event} openDeleteModal={openDeleteModal} openEditModal={openEditModal} openPurchaseModal={openPurchaseModal} state={state} />
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
