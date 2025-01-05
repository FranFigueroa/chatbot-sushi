import express from 'express';
import { processMessage } from '../controllers/chatbotController';

const router = express.Router();

// Procesar mensaje chatbot
router.post('/message', processMessage);

export default router;