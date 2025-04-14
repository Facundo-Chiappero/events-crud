import axios from 'axios'
import { useContext, useState } from 'react'
import { BACKEND, AUTH } from '../utils/frontendConsts'
import { ACTIONS, REDUCER_ACTIONS } from '../../types.d'
import SignupForm from './AuthForm'
import { StoreContext } from '../hooks/useStore'
import { Spinner } from './Icons'

// login and sign up forms
export default function Auth() {
  const { state, dispatch } = useContext(StoreContext)!
  
  const [error, setError] = useState<string | null>(null)
  const [errorStyles, setErrorStyles] = useState({
    color: '#fb2c36'
  })

  const handleSubmit = async (
    type: ACTIONS,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    dispatch({ type: REDUCER_ACTIONS.SET_LOADING, payload: true })

    const action = type === ACTIONS.SIGNUP ? ACTIONS.SIGNUP : ACTIONS.LOGIN

    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const res = await axios.post(`${BACKEND}/${action}`, { email, password })
      setErrorStyles({color: '#4dc97b'})
      setError(res.data.message)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      window.location.reload()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setError(AUTH.USER_ALREADY_EXISTS)
        } else {
          setError(
            `Error: ${error.response?.data?.message || AUTH.UNEXPECTED_ERROR}`
          )
        }
      } else {
        setError(AUTH.NETWORK_OR_UNKNOWN_ERROR)
      }
      console.log(error)
    } finally {
      ;(e.target as HTMLFormElement).reset()
    dispatch({ type: REDUCER_ACTIONS.SET_LOADING, payload: false })

    }
  }

  return (

   !state.loading ? <div className="flex justify-center items-center h-screen bg-gray-900 px-4">
      <div className="flex w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-lg flex-col sm:flex-row items-center">
        {/* Left Section: Sign up */}
        <SignupForm action={ACTIONS.SIGNUP} error={error} errorStyles={errorStyles} handleSubmit={handleSubmit} text={AUTH.SIGN_UP}/>

        <hr className="sm:h-80 sm:w-0 h-0 w-full border-1" />

        {/* Right Section: Log in */}
        <SignupForm action={ACTIONS.LOGIN} error={error} errorStyles={errorStyles} handleSubmit={handleSubmit} text={AUTH.LOG_IN}/>
      </div>
    </div>
: 

<div className="flex items-center justify-center text-4xl min-h-[100vh] w-[100%] bg-gray-900">
<Spinner />
</div> //show this if its loading
)
}
