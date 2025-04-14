import express from 'express'
import {
  getEvents,
  updateEvent,
  deleteEvent,
  createEvent,
} from '../controllers/eventController'
import { EVENT_ROUTES } from '../utils/backendConsts'

const router = express.Router()

router.get(EVENT_ROUTES.GET_EVENTS, getEvents)
router.post(EVENT_ROUTES.UPDATE_EVENT, updateEvent)
router.post(EVENT_ROUTES.DELETE_EVENT, deleteEvent)
router.post(EVENT_ROUTES.CREATE_EVENT, createEvent)

export default router
