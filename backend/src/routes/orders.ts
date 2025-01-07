import express from 'express';
import { getAllOrders, createOrder } from '../controllers/ordersController';

const router = express.Router();

// Ruta para obtener todos los pedidos
router.get('/', getAllOrders);

// Ruta para crear un nuevo pedido
router.post('/', createOrder);

export default router;
