import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';

const prisma = new PrismaClient();

export const getUser: RequestHandler = async (req, res) => {
  const email = req.query.email as string;
  if (!email) {
    res.status(400).json({ message: 'Email requerido' });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    res.json([user]);
  } catch (err) {
    console.error('Error al verificar usuario:', err);
    res.status(500).send('Error del servidor');
  }
};

export const logIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Faltan datos' });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Contraseña incorrecta' });
      return;
    }

    res.status(200).json({ message: 'Login exitoso', user });
  } catch (error) {
    console.error('Error en logIn:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

export const signUp: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Faltan datos' });
    return;
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: 'Usuario ya existe' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({ data: { email, password: hashedPassword } });

    res.status(200).json({ message: 'Usuario registrado', user: newUser });
  } catch (error) {
    console.error('Error en signUp:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};
