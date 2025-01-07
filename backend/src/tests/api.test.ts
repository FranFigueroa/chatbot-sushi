import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

// Conexión a la base de datos antes de ejecutar los tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sushi-chatbot');
});

// Desconectar la base de datos después de los tests
afterAll(async () => {
  await mongoose.disconnect();
});

describe('Orders API Tests', () => {
  it('debería crear un nuevo pedido', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        items: [
          { product: '677da25572d4f473367e71d8', quantity: 2 } // Cambia esto por un ID válido
        ]
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBeGreaterThan(0);
  });

  it('debería manejar pedidos con datos inválidos', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ items: [] });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Los items del pedido son requeridos.');
  });
});
