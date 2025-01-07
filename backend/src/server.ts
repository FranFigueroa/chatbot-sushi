import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

// Cargar variables de entorno desde .env
dotenv.config();

// Definir el puerto y el URI de MongoDB desde las variables de entorno
const PORT: number = Number(process.env.PORT) || 5000;
const MONGODB_URI: string = process.env.MONGODB_URI || '';

// Verificar que MONGODB_URI no esté vacío
if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI no está definido en el archivo .env');
  process.exit(1);
}

// Conectar a MongoDB sin las opciones depreciadas
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB conectado correctamente');
    // Iniciar el servidor después de conectar a la base de datos
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1); // Terminar el proceso si no se puede conectar a la base de datos
  });
