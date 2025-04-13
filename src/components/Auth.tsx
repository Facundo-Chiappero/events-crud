import axios from 'axios'
import { useState } from 'react'
import { BACKEND } from '../utils/const'
import { ACTIONS } from '../../types.d'

// form to sign up and log in
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
      window.location.reload() // Page reload after login/signup
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setError('El usuario ya existe')
        } else {
          setError(
            `Error: ${error.response?.data?.message || 'Error inesperado'}`
          )
        }
      } else {
        setError('Error de red o inesperado')
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
          <h2 className="text-2xl font-bold mb-4 text-white">Sign up</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form method="post" onSubmit={(e) => handleSubmit(ACTIONS.SIGNUP, e)}>
            <div className="mb-4">
              <label
                htmlFor="signup-email"
                className="block mb-2 text-gray-300"
              >
                Email
              </label>
              <input
                required
                type="text"
                id="signup-email"
                name="email"
                placeholder="John Doe"
                autoComplete="email"
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="signup-password"
                className="block mb-2 text-gray-300"
              >
                Password
              </label>
              <input
                required
                type="password"
                id="signup-password"
                name="password"
                placeholder="S4fe-PasSword"
                autoComplete="current-password"
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            >
              Sign up
            </button>
          </form>
        </section>

        {/* Divider */}
        <hr className="sm:h-80 sm:w-0 h-0 w-full border-1" />

        {/* Right Section: Log in */}
        <section className="sm:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4 text-white">Log in</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form method="post" onSubmit={(e) => handleSubmit(ACTIONS.LOGIN, e)}>
            <div className="mb-4">
              <label htmlFor="login-email" className="block mb-2 text-gray-300">
                Email
              </label>
              <input
                required
                type="text"
                id="login-email"
                name="email"
                placeholder="John Doe"
                autoComplete="email"
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="login-password"
                className="block mb-2 text-gray-300"
              >
                Password
              </label>
              <input
                required
                type="password"
                id="login-password"
                name="password"
                placeholder="S4fe-PasSword"
                autoComplete="current-password"
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
            >
              Log in
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
