import { useContext } from 'react'
import { StoreContext } from './hooks/useStore'
import Auth from './components/Auth'
import Main from './components/Main'

function App() {
  const { state } = useContext(StoreContext)!

  return (
    <>
      {
        state.loading ? (
          <div className="flex items-center justify-center text-4xl min-h-[100vh] w-[100%] bg-gray-900">
            Loading...
          </div> //show this if its loading
        ) : state.user ? (
          <Main />
        ) : (
          <Auth />
        ) //show Main if theres a user logged or Auth if theres no user logged
      }
    </>
  )
}

export default App
