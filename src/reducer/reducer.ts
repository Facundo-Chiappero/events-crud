import { User, REDUCER_ACTIONS } from '../../types.d'

export type FormData = {
  title: string
  description: string
  date: string
  price: string
  images: string
}

export type State = {
  user: User | null
  loading: boolean
  events: EventType[] | null
  formData: FormData
  showUpdateModal: boolean
  showCreateModal: boolean
  showDeleteModal: boolean
  selectedEvent: EventType | null
  eventToDelete: EventType | null
}

export type Action =
  | { type: REDUCER_ACTIONS.SET_USER; payload: User | null }
  | { type: REDUCER_ACTIONS.SET_LOADING; payload: boolean }
  | { type: REDUCER_ACTIONS.SET_EVENTS; payload: EventType[] }
  | { type: REDUCER_ACTIONS.SET_FORM_DATA; payload: FormData }
  | { type: REDUCER_ACTIONS.SET_SHOW_MODAL; payload: boolean }
  | { type: REDUCER_ACTIONS.SET_SHOW_CREATE_MODAL; payload: boolean }
  | { type: REDUCER_ACTIONS.SET_SHOW_DELETE_MODAL; payload: boolean }
  | { type: REDUCER_ACTIONS.SET_SELECTED_EVENT; payload: EventType | null }
  | { type: REDUCER_ACTIONS.SET_EVENT_TO_DELETE; payload: EventType | null }

export type EventType = {
  id: number
  title: string
  description: string
  price: number
  images: string[]
  date: string
}

export const initialState: State = {
  user: null,
  loading: true,
  events: null,
  formData: {
    title: '',
    description: '',
    date: '',
    price: '',
    images: '',
  },
  showUpdateModal: false,
  showCreateModal: false,
  showDeleteModal: false,
  selectedEvent: null,
  eventToDelete: null,
}

export const reducer = (state: State, action: Action): State => {
  if (action.type === REDUCER_ACTIONS.SET_USER) {
    return { ...state, user: action.payload }
  }
  if (action.type === REDUCER_ACTIONS.SET_LOADING) {
    return { ...state, loading: action.payload }
  }
  if (action.type === REDUCER_ACTIONS.SET_EVENTS) {
    return { ...state, events: action.payload }
  }
  if (action.type === REDUCER_ACTIONS.SET_FORM_DATA) {
    return { ...state, formData: action.payload }
  }
  if (action.type === REDUCER_ACTIONS.SET_SHOW_MODAL) {
    return { ...state, showUpdateModal: action.payload }
  }
  if (action.type === REDUCER_ACTIONS.SET_SHOW_CREATE_MODAL) {
    return { ...state, showCreateModal: action.payload }
  }
  if (action.type === REDUCER_ACTIONS.SET_SHOW_DELETE_MODAL) {
    return { ...state, showDeleteModal: action.payload }
  }
  if (action.type === REDUCER_ACTIONS.SET_SELECTED_EVENT) {
    return { ...state, selectedEvent: action.payload }
  }
  if (action.type === REDUCER_ACTIONS.SET_EVENT_TO_DELETE) {
    return { ...state, eventToDelete: action.payload }
  }

  return state
}
