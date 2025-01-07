import { Request, Response, NextFunction } from 'express';
import Order, { IOrder } from '../models/Order';
import Product from '../models/Product';

// Obtener todos los pedidos
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders: IOrder[] = await Order.find().populate('items.product');
    res.json(orders);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(500).json({ message: 'Error al obtener los pedidos. Inténtalo nuevamente más tarde.' });
  }
};

// Crear un nuevo pedido

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ message: 'Los items del pedido son requeridos.' });
    return;
  }

  try {
    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        res.status(404).json({ message: `Producto con ID ${item.product} no encontrado.` });
        return;
      }

      total += product.price * item.quantity;
    }

    const order = new Order({
      items,
      total,
      status: 'pending',
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ message: 'Error interno al crear el pedido.' });
  }
};
