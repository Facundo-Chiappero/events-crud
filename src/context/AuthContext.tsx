/* eslint-disable react-refresh/only-export-components */
import axios from 'axios'
import { createContext, ReactNode, useEffect } from 'react'
import { BACKEND } from '../utils/const'
import { ACTIONS, REDUCER_ACTIONS } from '../../types.d'
import { useStore } from '../hooks/useStore'
import { State } from '../reducer/reducer'

type AuthContextType = {
  state: State
  logout: () => void
}

type AuthProviderProps = {
  children: ReactNode
}

// this file creates an authentication context, checks localStorage for a user, validates it via API, and updates global state with the user saved in localStorage if any and the state of loading.
export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: AuthProviderProps) {
  const { state, dispatch } = useStore()
  console.log('AuthProvider state', state)

  const logout = () => {
    localStorage.removeItem('user')
    dispatch({ type: REDUCER_ACTIONS.SET_USER, payload: null })
  }

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user')

      if (!storedUser) {
        dispatch({ type: REDUCER_ACTIONS.SET_LOADING, payload: false })
        return
      }

      const parsedUser = JSON.parse(storedUser)

      try {
        const res = await axios.get(`${BACKEND}/${ACTIONS.GET_USERS}`, {
          params: { email: parsedUser.email },
        })

        if (res.data && res.data.length > 0) {
          dispatch({ type: REDUCER_ACTIONS.SET_USER, payload: res.data[0] })
        } else {
          logout()
        }
      } catch (err) {
        console.error('Error al verificar usuario', err)
        logout()
      } finally {
        dispatch({ type: REDUCER_ACTIONS.SET_LOADING, payload: false })
      }
    }

    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider value={{ state, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
