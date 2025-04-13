// in development BACKEND const is localhost
export const BACKEND =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3000'
    : '/.netlify/functions'
