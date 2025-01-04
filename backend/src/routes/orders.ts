import express from 'express';
import { getAllOrders, createOrder } from '../controllers/ordersController';

const router = express.Router();

// Logs para depuración
console.log('Controlador de Pedidos Importado:', { getAllOrders, createOrder });

// GET /api/orders - Obtener todos los pedidos
router.get('/', getAllOrders);

// POST /api/orders - Crear un nuevo pedido
router.post('/', createOrder);

export default router;
