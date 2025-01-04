// src/app.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import productsRouter from './routes/products';
import ordersRouter from './routes/orders';
import chatbotRouter from './routes/chatbot';

dotenv.config();

const app: Application = express();

// Middleware para parsear JSON en las solicitudes
app.use(express.json());



// Ruta básica para verificar que el servidor está funcionando
app.get('/', (req: Request, res: Response) => {
  res.send('¡Servidor de Chatbot para Sushi en funcionamiento!');
});

// Usar las rutas definidas
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/chatbot', chatbotRouter);


export default app;
