// src/controllers/chatbotController.ts

import { Request, Response, NextFunction } from 'express';

// Procesar mensajes del chatbot
export const processMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { message } = req.body;

  if (!message) {
    res.status(400).json({ message: 'El mensaje es requerido.' });
    return;
  }

  try {
    // Aquí integrarías con tu plataforma de NLP (Dialogflow, Rasa, etc.)
    // Por simplicidad, responderemos de forma estática

    let responseMessage = '';

    if (message.toLowerCase().includes('menu')) {
      responseMessage =
        'Nuestro menú incluye variedad de sushis como nigiri, sashimi, maki, etc. ¿Te gustaría ver el menú completo?';
    } else if (message.toLowerCase().includes('pedido')) {
      responseMessage =
        'Claro, para hacer un pedido, por favor indícame los tipos de sushi y las cantidades que deseas.';
    } else if (message.toLowerCase().includes('horarios')) {
      responseMessage =
        'Nuestro restaurante está abierto de lunes a viernes de 12:00 PM a 10:00 PM y sábados y domingos de 1:00 PM a 11:00 PM.';
    } else {
      responseMessage =
        '¡Lo siento! No entendí tu mensaje. Por favor, intenta nuevamente.';
    }

    res.json({ reply: responseMessage });
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

