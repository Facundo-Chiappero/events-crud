import express, { Application } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import authRoutes from './routes/authRoutes';
import eventRoutes from './routes/eventRoutes';
import paymentRoutes from './routes/paymentRoutes';

config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND,
  credentials: true
}));

app.use(express.json());

app.use('/', authRoutes);
app.use('/', eventRoutes);
app.use('/', paymentRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
