import { Request, Response } from 'express';
import Product, { IProduct } from '../models/Product';


// Obtener todos los productos disponibles
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products: IProduct[] = await Product.find({ available: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Agregar un nuevo producto
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, available } = req.body;

  const product = new Product({
    name,
    description,
    price,
    available,
  });

  try {
    const newProduct: IProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};