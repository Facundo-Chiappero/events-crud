export const AUTH_ROUTES = {
  GET_USER: '/getUser',
  LOGIN: '/logIn',
  SIGNUP: '/signUp',
}

export const EVENT_ROUTES = {
  GET_EVENTS: '/event',
  UPDATE_EVENT: '/update',
  DELETE_EVENT: '/delete',
  CREATE_EVENT: '/create',
}

export const PAYMENT_ROUTES = {
  CREATE_PREFERENCE: '/create_preference',
  WEBHOOK: '/webhook',
}

export const AUTH_MESSAGES = {
  EMAIL_REQUIRED: 'Email is required',
  USER_NOT_FOUND: 'User not found',
  SERVER_ERROR: 'Server error',
  MISSING_FIELDS: 'Missing fields',
  INCORRECT_PASSWORD: 'Incorrect password',
  LOGIN_SUCCESS: 'Login successful',
  USER_EXISTS: 'User already exists',
  USER_REGISTERED: 'User registered',
  LOGIN_ERROR: 'Error logging in',
  SIGNUP_ERROR: 'Error registering user',
}

export const EVENT_MESSAGES = {
  FETCH_ERROR: 'Error fetching events',
  MISSING_ID: 'Missing event ID',
  UPDATE_SUCCESS: 'Event updated successfully',
  UPDATE_ERROR: 'Server error updating event',
  DELETE_SUCCESS: 'Event deleted',
  DELETE_ERROR: 'Failed to delete event',
  MISSING_DATA: 'Missing required data',
  CREATE_SUCCESS: 'Event created',
  CREATE_ERROR: 'Error creating event',
}

export const EVENT_ERRORS = {
  FETCH: 'Error fetching events:',
  UPDATE: 'Error updating event:',
  DELETE: 'Error deleting event:',
  CREATE: 'Error creating event:',
}

export const PAYMENT = {
  AUTO_RETURN: 'approved',
  NOTIFICATION_URL: process.env.BACKEND + PAYMENT_ROUTES.WEBHOOK,
  APPROVED: 'approved',
  MERCADO_PAGO_URL: 'https://api.mercadopago.com/v1/payments'
}

export const PAYMENT_MESSAGES = {
  MISSING_DATA: 'Required data is missing',
  CREATE_ERROR: 'Error creating payment preference',
  WEBHOOK_SAVE_SUCCESS: 'Payment saved to database',
  WEBHOOK_NO_METADATA: 'Metadata not found',
  WEBHOOK_ERROR: 'Error in webhook',
}

export const PAYMENT_ERRORS = {
  CREATE: 'Error creating preference:',
  MISSING: 'Required data is missing',
  WEBHOOK: 'Webhook error:',
  WEBHOOK_NO_METADATA: 'Metadata not found',
}
