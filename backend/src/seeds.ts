import mongoose from 'mongoose';
import Product from './models/Product';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sushi-chatbot';

// Leer el archivo JSON
const dataPath = path.join(__dirname, 'data', 'products.json');
const productsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

async function seed() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB conectado para seeding');

    // Limpiar la colección antes de sembrar
    await Product.deleteMany({});
    console.log('Colección de productos vaciada');

    // Insertar los datos
    await Product.insertMany(productsData);
    console.log('Productos insertados exitosamente');

    // Cerrar conexión y terminar
    await mongoose.disconnect();
    console.log('Conexión cerrada');
    process.exit(0);
  } catch (error) {
    console.error('Error al realizar seeding:', error);
    process.exit(1);
  }
}

seed();
