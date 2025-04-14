import axios from 'axios'
import { useState } from 'react'
import { BACKEND, AUTH } from '../utils/frontendConsts'
import { ACTIONS } from '../../types.d'

// login and sign up forms
export default function Auth() {
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (
    type: ACTIONS,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    const action = type === ACTIONS.SIGNUP ? ACTIONS.SIGNUP : ACTIONS.LOGIN

    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const res = await axios.post(`${BACKEND}/${action}`, { email, password })
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
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 px-4">
      <div className="flex w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-lg flex-col sm:flex-row items-center">
        {/* Left Section: Sign up */}
        <section className="sm:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4 text-white">{AUTH.SIGN_UP}</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form method="post" onSubmit={(e) => handleSubmit(ACTIONS.SIGNUP, e)}>
            <div className="mb-4">
              <label
                htmlFor="signup-email"
                className="block mb-2 text-gray-300"
              >
                {AUTH.EMAIL}
              </label>
              <input
                required
                type="text"
                id="signup-email"
                name="email"
                placeholder={AUTH.PLACEHOLDER_EMAIL}
                autoComplete="email"
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="signup-password"
                className="block mb-2 text-gray-300"
              >
                {AUTH.PASSWORD}
              </label>
              <input
                required
                type="password"
                id="signup-password"
                name="password"
                placeholder={AUTH.PLACEHOLDER_PASSWORD}
                autoComplete="current-password"
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 cursor-pointer"
            >
              {AUTH.SIGN_UP}
            </button>
          </form>
        </section>

        <hr className="sm:h-80 sm:w-0 h-0 w-full border-1" />

        {/* Right Section: Log in */}
        <section className="sm:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4 text-white">{AUTH.LOG_IN}</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form method="post" onSubmit={(e) => handleSubmit(ACTIONS.LOGIN, e)}>
            <div className="mb-4">
              <label htmlFor="login-email" className="block mb-2 text-gray-300">
                {AUTH.EMAIL}
              </label>
              <input
                required
                type="text"
                id="login-email"
                name="email"
                placeholder={AUTH.PLACEHOLDER_EMAIL}
                autoComplete="email"
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="login-password"
                className="block mb-2 text-gray-300"
              >
                {AUTH.PASSWORD}
              </label>
              <input
                required
                type="password"
                id="login-password"
                name="password"
                placeholder={AUTH.PLACEHOLDER_PASSWORD}
                autoComplete="current-password"
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 cursor-pointer"
            >
              {AUTH.LOG_IN}
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
