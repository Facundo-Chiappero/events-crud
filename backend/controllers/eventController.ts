import { RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: /event
export const getEvents: RequestHandler = async (_req, res) => {
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        images: true,
        date: true
      },
      orderBy: { date: 'desc' }
    });

    res.status(200).json(events);
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).json({ message: 'Error al obtener eventos' });
  }
};

// POST: /update
export const updateEvent: RequestHandler = async (req, res) => {
  const { id, title, description, price, date, images } = req.body;

  if (!id) {
    res.status(400).json({ message: 'Missing event ID' });
    return;
  }

  try {
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: { title, description, price, date, images }
    });

    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (err) {
    console.error('🔥 Error updating event:', err);
    res.status(500).json({ message: 'Server error updating event' });
  }
};

// POST: /delete
export const deleteEvent: RequestHandler = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).json({ message: 'Missing ID' });
    return;
  }

  try {
    await prisma.event.delete({ where: { id } });
    res.status(200).json({ message: 'Event deleted' });
  } catch (err) {
    console.error('🔥 Error deleting event:', err);
    res.status(500).json({ message: 'Failed to delete event' });
  }
};

// POST: /create
export const createEvent: RequestHandler = async (req, res) => {
  const { title, description, price, date, images, creatorId } = req.body;

  if (!title || !description || !price || !date || !creatorId) {
    res.status(400).json({ message: 'Missing required data' });
    return;
  }

  try {
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        price,
        date: new Date(date),
        images,
        creatorId
      }
    });

    res.status(201).json({ message: 'Event created', event: newEvent });
  } catch (error) {
    console.error('❌ Error creating event:', error);
    res.status(500).json({ message: 'Error creating event' });
  }
};
