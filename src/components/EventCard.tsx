import { MAIN } from "../utils/frontendConsts";
import { Clipboard, Trash } from './Icons'
import { ROLES } from '../../types.d'
import { EventType, State } from "../reducer/reducer";

interface Props{
  event: EventType,
  state: State,
  openEditModal: (event: EventType) => void,
  openDeleteModal: (event: EventType) => void,
  openPurchaseModal: (event: EventType) => void
}


export default function EventCard({event, state, openEditModal, openDeleteModal, openPurchaseModal}: Props){
  return(
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
                    className="bg-blue-600 p-2 rounded hover:bg-blue-700 cursor-pointer"
                  >
                    <Clipboard />
                  </button>
                  <button
                    onClick={() => openDeleteModal(event)}
                    className="bg-red-600 p-2 rounded hover:bg-red-700 cursor-pointer"
                  >
                    <Trash />
                  </button>
                </div>
              )}

              {state.user?.role === ROLES.USER && (
                <button
                  onClick={() => openPurchaseModal(event)}
                  className="bg-green-500 text-white p-3 rounded hover:bg-green-600 mt-4 cursor-pointer"
                >
                  {MAIN.BUY_BUTTON}
                </button>
              )}
            </article>
  )
}