import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ROLES, User } from '../../types.d'
import { HEADER } from '../utils/frontendConsts'

interface Props {
  user: User | null
  openCreateModal: () => void
}

// in this file you can find the title, create new event button and log out button
export default function MainHeader({ user, openCreateModal }: Props) {
  const { logout } = useContext(AuthContext)!

  return (
    <header>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{HEADER.TITLE}</h2>

        {user?.role === ROLES.ADMIN && (
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded bg-green-500 text-white p-3 hover:bg-green-600"
          >
            {HEADER.CREATE_EVENT_BUTTON}
          </button>
        )}

        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          {HEADER.LOGOUT_BUTTON}
        </button>
      </div>
    </header>
  )
}
