import express from 'express';
import { createPreference, handleWebhook } from '../controllers/paymentController';
import { PAYMENT_ROUTES } from '../utils/backendConsts';

const router = express.Router();

router.post(PAYMENT_ROUTES.CREATE_PREFERENCE, createPreference);
router.post(PAYMENT_ROUTES.WEBHOOK, handleWebhook);

export default router;
