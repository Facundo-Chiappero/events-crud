import { useContext } from 'react'
import { StoreContext } from './hooks/useStore'
import Auth from './components/Auth'
import Main from './components/Main'

function App() {
  const { state } = useContext(StoreContext)!

  return (
    <>
      {
        state.user ? (
          <Main />
        ) : (
          <Auth />
        ) //show Main if theres a user logged or Auth if theres no user logged
      }
    </>
  )
}

export default App
