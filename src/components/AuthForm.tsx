import { ACTIONS } from "../../types";
import { AUTH } from "../utils/frontendConsts";

interface Props{
  error: string | null
  errorStyles:{
                color: string;
              }
  handleSubmit: (type: ACTIONS, e: React.FormEvent<HTMLFormElement>) => Promise<void>
  action: ACTIONS.SIGNUP | ACTIONS.LOGIN
  text: string
}

export default function SignupForm({error, errorStyles, handleSubmit, action, text}: Props){

  const btnStyles = text == AUTH.LOG_IN ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'

  return(
    <section className="sm:w-1/2 p-4">
              <h2 className="text-2xl font-bold mb-4 text-white">{text}</h2>
              {error && <p className="mb-4" style={errorStyles}>{error}</p>}
              <form method="post" onSubmit={(e) => handleSubmit(action, e)}>
                <div className="mb-4">
                  <label
                    htmlFor={`${text}-email`}
                    className="block mb-2 text-gray-300"
                  >
                    {AUTH.EMAIL}
                  </label>
                  <input
                    required
                    type="text"
                    id={`${text}-email`}
                    name="email"
                    placeholder={AUTH.PLACEHOLDER_EMAIL}
                    autoComplete="email"
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor={`${text}-password`}
                    className="block mb-2 text-gray-300"
                  >
                    {AUTH.PASSWORD}
                  </label>
                  <input
                    required
                    type="password"
                    id={`${text}-password`}
                    name="password"
                    placeholder={AUTH.PLACEHOLDER_PASSWORD}
                    autoComplete="current-password"
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full text-white p-3 rounded-lg cursor-pointer ${btnStyles}`}
                >
                  {text}
                </button>
              </form>
            </section>
  )
}