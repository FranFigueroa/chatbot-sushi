import { Request, Response, NextFunction } from 'express';

// Procesa mensajes del chatbot
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
    let responseMessage = '';

    const lowerCaseMessage = message.toLowerCase();

    // Respuestas personalizadas
    if (lowerCaseMessage.includes('hola') || lowerCaseMessage.includes('buenas')) {
      responseMessage = '¡Hola! Bienvenido al Chatbot de Sushi. ¿En qué puedo ayudarte hoy?';
    } else if (lowerCaseMessage.includes('menu')) {
      responseMessage =
        'Nuestro menú incluye variedades como nigiri, sashimi, maki y más. ¿Te gustaría detalles de algún tipo de sushi en particular?';
    } else if (lowerCaseMessage.includes('pedido')) {
      responseMessage =
        'Para hacer un pedido, dime los tipos de sushi y las cantidades que deseas. Cuando terimnes, en el mismo mensaje responde "Listo el pedido!" ¡Estoy aquí para ayudarte!';
    } else if (lowerCaseMessage.includes('horarios')) {
      responseMessage =
        'Nuestro restaurante está abierto de lunes a viernes de 12:00 PM a 10:00 PM y los fines de semana de 1:00 PM a 11:00 PM.';
    } else if (lowerCaseMessage.includes('dirección')) {
      responseMessage =
        'Nos encontramos en Avenida Sushi N.º 123. ¡Esperamos tu visita pronto!';
    } else if (lowerCaseMessage.includes('gracias')) {
      responseMessage = '¡De nada! Si tienes más preguntas, no dudes en escribirme.';
    } else if (lowerCaseMessage.includes('adiós') || lowerCaseMessage.includes('chau')) {
      responseMessage = '¡Adiós! Espero haberte ayudado. ¡Que tengas un excelente día!';
    } else if (lowerCaseMessage.includes('precios')) {
      responseMessage =
        'Los precios varían dependiendo del tipo de sushi. Por ejemplo, nigiri desde $6.99 y rolls desde $4.99. ¿Te gustaría algo en especial?';
    } else if (lowerCaseMessage.includes('promociones')) {
      responseMessage =
        'Hoy tenemos una promoción: ¡2x1 en nigiri de atún! ¿Te interesa?';
    }else if (lowerCaseMessage.includes('Listo el pedido!')) {
      responseMessage =
        'Pedido agendado, a que direccion?';
    } 
    else {
      responseMessage =
        '¡Lo siento! No entendí tu mensaje. ¿Puedes reformularlo o preguntar algo diferente?';
    }

    res.json({ reply: responseMessage });
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
};


