/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import axios from 'axios'
import {
  BACKEND,
  ENDPOINTS,
  EVENT_MANAGER_ERRORS,
} from '../utils/frontendConsts'
import { REDUCER_ACTIONS } from '../../types.d'
import { useStore } from './useStore'
import { EventType } from '../reducer/reducer'

// i made this to avoid having a large amount of handlers, states y dispatchers in Main component, here you can find every modal related states and their dispatchers
export const useEventManager = () => {
  const { state, dispatch } = useStore()

  useEffect(() => {
    if (state.user) fetchEvents()
  }, [state.user])

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${BACKEND}/${ENDPOINTS.GET_EVENTS}`)
      dispatch({ type: REDUCER_ACTIONS.SET_EVENTS, payload: res.data })
    } catch (err) {
      console.error(EVENT_MANAGER_ERRORS.ERROR_FETCHING_EVENTS, err)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    dispatch({
      type: REDUCER_ACTIONS.SET_FORM_DATA,
      payload: {
        ...state.formData,
        [name]: value,
      },
    })
  }

  const openCreateModal = () => {
    dispatch({
      type: REDUCER_ACTIONS.SET_FORM_DATA,
      payload: {
        title: '',
        description: '',
        date: '',
        price: '',
        images: '',
      },
    })
    dispatch({ type: REDUCER_ACTIONS.SET_SHOW_CREATE_MODAL, payload: true })
  }

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await axios.post(`${BACKEND}/${ENDPOINTS.CREATE_EVENT}`, {
        title: state.formData.title,
        description: state.formData.description,
        date: new Date(state.formData.date).toISOString(),
        price: parseFloat(state.formData.price),
        images: state.formData.images.split(',').map((img) => img.trim()),
        creatorId: state.user?.id,
      })
      dispatch({ type: REDUCER_ACTIONS.SET_SHOW_CREATE_MODAL, payload: false })
      fetchEvents()
    } catch (err) {
      console.error(EVENT_MANAGER_ERRORS.ERROR_CREATING_EVENT, err)
    }
  }

  const openEditModal = (event: EventType) => {
    dispatch({ type: REDUCER_ACTIONS.SET_SELECTED_EVENT, payload: event })
    dispatch({
      type: REDUCER_ACTIONS.SET_FORM_DATA,
      payload: {
        title: event.title,
        description: event.description,
        date: event.date.slice(0, 16),
        price: event.price.toString(),
        images: event.images.join(', '),
      },
    })
    dispatch({ type: REDUCER_ACTIONS.SET_SHOW_MODAL, payload: true })
  }

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!state.selectedEvent) return

    try {
      await axios.post(`${BACKEND}/${ENDPOINTS.UPDATE_EVENT}`, {
        id: state.selectedEvent.id,
        title: state.formData.title,
        description: state.formData.description,
        date: new Date(state.formData.date).toISOString(),
        price: parseFloat(state.formData.price),
        images: state.formData.images.split(',').map((img) => img.trim()),
      })

      dispatch({ type: REDUCER_ACTIONS.SET_SHOW_MODAL, payload: false })
      dispatch({ type: REDUCER_ACTIONS.SET_SELECTED_EVENT, payload: null })
      fetchEvents()
    } catch (err) {
      console.error(EVENT_MANAGER_ERRORS.ERROR_UPDATING_EVENT, err)
    }
  }

  const openDeleteModal = (event: EventType) => {
    dispatch({ type: REDUCER_ACTIONS.SET_EVENT_TO_DELETE, payload: event })
    dispatch({ type: REDUCER_ACTIONS.SET_SHOW_DELETE_MODAL, payload: true })
  }

  const handleConfirmDelete = async () => {
    if (!state.eventToDelete) return
    try {
      await axios.post(`${BACKEND}/${ENDPOINTS.DELETE_EVENT}`, {
        id: state.eventToDelete.id,
      })
      fetchEvents()
    } catch (err) {
      console.error(EVENT_MANAGER_ERRORS.ERROR_DELETING_EVENT, err)
    } finally {
      dispatch({ type: REDUCER_ACTIONS.SET_SHOW_DELETE_MODAL, payload: false })
      dispatch({ type: REDUCER_ACTIONS.SET_EVENT_TO_DELETE, payload: null })
    }
  }

  const openPurchaseModal = (event: EventType) => {
    dispatch({ type: REDUCER_ACTIONS.SET_EVENT_TO_PURCHASE, payload: event })
    dispatch({ type: REDUCER_ACTIONS.SET_SHOW_PURCHASE_MODAL, payload: true })
  }

  const closePurchaseModal = () => {
    dispatch({ type: REDUCER_ACTIONS.SET_SHOW_PURCHASE_MODAL, payload: false })
    dispatch({ type: REDUCER_ACTIONS.SET_EVENT_TO_PURCHASE, payload: null })
  }

  return {
    formData: state.formData,
    showUpdateModal: state.showUpdateModal,
    showCreateModal: state.showCreateModal,
    showDeleteModal: state.showDeleteModal,
    selectedEvent: state.selectedEvent,
    eventToDelete: state.eventToDelete,
    eventToPurchase: state.eventToPurchase,
    showPurchaseModal: state.showPurchaseModal,
    handleInputChange,
    openCreateModal,
    handleCreateSubmit,
    openEditModal,
    handleUpdateSubmit,
    openDeleteModal,
    handleConfirmDelete,
    openPurchaseModal,
    closePurchaseModal,
    setShowUpdateModal: (val: boolean) =>
      dispatch({ type: REDUCER_ACTIONS.SET_SHOW_MODAL, payload: val }),
    setShowCreateModal: (val: boolean) =>
      dispatch({ type: REDUCER_ACTIONS.SET_SHOW_CREATE_MODAL, payload: val }),
    setShowDeleteModal: (val: boolean) =>
      dispatch({ type: REDUCER_ACTIONS.SET_SHOW_DELETE_MODAL, payload: val }),
    setEventToDelete: (event: EventType | null) =>
      dispatch({ type: REDUCER_ACTIONS.SET_EVENT_TO_DELETE, payload: event }),
  }
}
