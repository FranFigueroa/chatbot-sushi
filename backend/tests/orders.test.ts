import request from 'supertest';
import app from '../src/app';

describe('Orders API', () => {
  it('debe crear un nuevo pedido', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ items: [{ product: "...", quantity: 2 }] });
    expect(res.statusCode).toBe(201);
    // ...
  });
});
