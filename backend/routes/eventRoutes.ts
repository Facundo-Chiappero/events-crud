import express from 'express';
import {
  getEvents,
  updateEvent,
  deleteEvent,
  createEvent
} from '../controllers/eventController';

const router = express.Router();

router.get('/event', getEvents);
router.post('/update', updateEvent);
router.post('/delete', deleteEvent);
router.post('/create', createEvent);

export default router;
