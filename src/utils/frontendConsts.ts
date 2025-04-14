// all the text is here, to avoid using magic strings

export const BACKEND =
  import.meta.env.MODE === 'development'
    ? 'https://yummy-frogs-exist.loca.lt' // in development BACKEND has this value
    : 'https://events-crud.onrender.com'

//the first link is given by localtunnel, required to use mercado pago webhooks, run: `npm run tunnel` in backend folder to get a url, enter the url, enter the link bellow the blue button, copy the numbers and paste on the input field, then you can use de tunnel . you also need to update the url in mercado pago web page.
//the second link is where the backend is deployed

export const AUTH = {
  SIGN_UP: 'Sign up',
  LOG_IN: 'Log in',
  EMAIL: 'Email',
  PASSWORD: 'Password',
  PLACEHOLDER_EMAIL: 'John Doe',
  PLACEHOLDER_PASSWORD: 'S4fe-PasSword',

  USER_ALREADY_EXISTS: 'User already exists',
  UNEXPECTED_ERROR: 'Unexpected error',
  NETWORK_OR_UNKNOWN_ERROR: 'Network or unexpected error',
}

export const ENDPOINTS = {
  GET_USER: 'getUser',
  LOG_IN: 'logIn',
  SIGN_UP: 'signUp',
  GET_EVENTS: 'event',
  UPDATE_EVENT: 'update',
  DELETE_EVENT: 'delete',
  CREATE_EVENT: 'create',
  CREATE_PREFERENCE: 'create_preference',
  WEBHOOK: 'webhook',
}

export const MAIN = {
  BUY_BUTTON: 'Buy',
  NO_EVENTS_MESSAGE: 'There are no events',
  PRICE_LABEL: 'Price: $',
}

export const HEADER = {
  TITLE: 'Events',
  CREATE_EVENT_BUTTON: 'Create Event',
  LOGOUT_BUTTON: 'Log out',
}

export const AUTH_CONTEXT = {
  LOCAL_STORAGE_KEY: 'user',
  ERROR_CHECKING_USER: 'Error checking user',
}

export const EVENT_MANAGER_ERRORS = {
  ERROR_CREATING_EVENT: 'Error creating event:',
  ERROR_UPDATING_EVENT: 'Error updating event:',
  ERROR_DELETING_EVENT: 'Error deleting event:',
  ERROR_FETCHING_EVENTS: 'Error fetching events:',
}

export const USE_STORE_ERROR = 'useStore must be used within a StoreProvider'

export const MODAL_TEXTS = {
  LABEL_TITLE: 'Title',
  LABEL_DESCRIPTION: 'Description',
  LABEL_DATE: 'Date',
  LABEL_PRICE: 'Price',
  LABEL_IMAGES: 'Images (comma-separated URLs)',
  BUTTON_SAVE: 'Save',
  BUTTON_CANCEL: 'Cancel',
  BUTTON_CONFIRM: 'Confirm',

  CREATE_EVENT_TITLE: 'Create New Event',

  DELETE_EVENT_TITLE: 'Delete Event',
  DELETE_EVENT_CONFIRM: "This action can't be undone.",
  NO_EVENTS_TO_DELETE: 'There are no events to delete.',

  PURCHASE_CONFIRMATION: 'Confirm Purchase',
}

export const FORM_PLACEHOLDERS = {
  TITLE: 'Rock Concert, Cooking Class, Charity Marathon...',
  DESCRIPTION:
    'An exciting night filled with live music from local and international bands.',
  PRICE: '1000',
  IMAGES: 'https://my-image.com, https://my-other-image.com',
}
