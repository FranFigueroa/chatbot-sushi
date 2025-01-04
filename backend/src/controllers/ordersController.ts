// src/controllers/ordersController.ts

import { Request, Response, NextFunction } from 'express';
import Order, { IOrder } from '../models/Order';
import Product from '../models/Product';

// Obtener todos los pedidos
export const getAllOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders: IOrder[] = await Order.find().populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Crear un nuevo pedido
export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ message: 'Los items del pedido son requeridos.' });
    return;
  }

  try {
    // Calcular el total del pedido
    let total = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        res.status(400).json({ message: `Producto con ID ${item.product} no encontrado.` });
        return;
      }
      total += product.price * item.quantity;
    }

    const order = new Order({
      items,
      total,
      status: 'pending',
    });

    const newOrder: IOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
