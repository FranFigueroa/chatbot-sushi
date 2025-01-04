import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5000;
const MONGODB_URI: string = process.env.MONGODB_URI || '';

// Conectar a MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
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


