import { RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'
import { EVENT_MESSAGES, EVENT_ERRORS } from '../utils/backendConsts'

const prisma = new PrismaClient()

export const getEvents: RequestHandler = async (_req, res) => {
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        images: true,
        date: true,
      },
      orderBy: { date: 'desc' },
    })

    res.status(200).json(events)
  } catch (error) {
    console.error(EVENT_ERRORS.FETCH, error)
    res.status(500).json({ message: EVENT_MESSAGES.FETCH_ERROR })
  }
}

export const updateEvent: RequestHandler = async (req, res) => {
  const { id, title, description, price, date, images } = req.body

  if (!id) {
    res.status(400).json({ message: EVENT_MESSAGES.MISSING_ID })
    return
  }

  try {
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: { title, description, price, date, images },
    })

    res.status(200).json({ message: EVENT_MESSAGES.UPDATE_SUCCESS, event: updatedEvent })
  } catch (err) {
    console.error(EVENT_ERRORS.UPDATE, err)
    res.status(500).json({ message: EVENT_MESSAGES.UPDATE_ERROR })
  }
}

export const deleteEvent: RequestHandler = async (req, res) => {
  const { id } = req.body

  if (!id) {
    res.status(400).json({ message: EVENT_MESSAGES.MISSING_ID })
    return
  }

  try {
    await prisma.event.delete({ where: { id } })
    res.status(200).json({ message: EVENT_MESSAGES.DELETE_SUCCESS })
  } catch (err) {
    console.error(EVENT_ERRORS.DELETE, err)
    res.status(500).json({ message: EVENT_MESSAGES.DELETE_ERROR })
  }
}

export const createEvent: RequestHandler = async (req, res) => {
  const { title, description, price, date, images, creatorId } = req.body

  if (!title || !description || !price || !date || !creatorId) {
    res.status(400).json({ message: EVENT_MESSAGES.MISSING_DATA })
    return
  }

  try {
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        price,
        date: new Date(date),
        images,
        creatorId,
      },
    })

    res.status(201).json({ message: EVENT_MESSAGES.CREATE_SUCCESS, event: newEvent })
  } catch (error) {
    console.error(EVENT_ERRORS.CREATE, error)
    res.status(500).json({ message: EVENT_MESSAGES.CREATE_ERROR })
  }
}
