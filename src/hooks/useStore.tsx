/* eslint-disable react-refresh/only-export-components */
import { useReducer, useContext, createContext, ReactNode } from 'react'
import { reducer, initialState, State, Action } from '../reducer/reducer'
import { USE_STORE_ERROR } from '../utils/frontendConsts'

type StoreContextType = {
  state: State
  dispatch: React.Dispatch<Action>
}

// as i never used zustand i decided to use a reducer and a context
export const StoreContext = createContext<StoreContextType | undefined>(
  undefined
)

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error(USE_STORE_ERROR)
  }
  return context
}
