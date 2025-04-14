// controllers/authController.ts
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { RequestHandler } from 'express'
import { AUTH_MESSAGES } from '../utils/backendConsts'

const prisma = new PrismaClient()

export const getUser: RequestHandler = async (req, res) => {
  const email = req.query.email as string
  if (!email) {
    res.status(400).json({ message: AUTH_MESSAGES.EMAIL_REQUIRED })
    return
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      res.status(404).json({ message: AUTH_MESSAGES.USER_NOT_FOUND })
      return
    }
    res.json([user])
  } catch (err) {
    console.error('Error verifying user:', err)
    res.status(500).send(AUTH_MESSAGES.SERVER_ERROR)
  }
}

export const logIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({ message: AUTH_MESSAGES.MISSING_FIELDS })
    return
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      res.status(404).json({ message: AUTH_MESSAGES.USER_NOT_FOUND })
      return
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(401).json({ message: AUTH_MESSAGES.INCORRECT_PASSWORD })
      return
    }

    res.status(200).json({ message: AUTH_MESSAGES.LOGIN_SUCCESS, user })
  } catch (error) {
    console.error('Error in logIn:', error)
    res.status(500).json({ message: AUTH_MESSAGES.LOGIN_ERROR })
  }
}

export const signUp: RequestHandler = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({ message: AUTH_MESSAGES.MISSING_FIELDS })
    return
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      res.status(409).json({ message: AUTH_MESSAGES.USER_EXISTS })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    })

    res.status(200).json({ message: AUTH_MESSAGES.USER_REGISTERED, user: newUser })
  } catch (error) {
    console.error('Error in signUp:', error)
    res.status(500).json({ message: AUTH_MESSAGES.SIGNUP_ERROR })
  }
}
