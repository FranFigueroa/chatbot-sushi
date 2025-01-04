import express from 'express';
import { processMessage } from '../controllers/chatbotController';

const router = express.Router();

// Procesar mensaje chatbot
router.post('/', processMessage);

export default router;