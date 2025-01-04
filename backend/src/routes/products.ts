import express from 'express';
import { getAllProducts, createProduct } from '../controllers/productsController';

const router = express.Router();

// Obtener productos disponibles
router.get('/', getAllProducts);

// Agregar un nuevo producto
router.post('/', createProduct);

export default router;