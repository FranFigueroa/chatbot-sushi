import mongoose, { Document, Schema } from 'mongoose';
import { IProduct } from './Product';

// Interfaz items
interface IOrderItem {
  product: IProduct['_id'];
  quantity: number;
}

// Interfaz pedido
export interface IOrder extends Document {
  items: IOrderItem[];
  total: number;
  status: string;
  createdAt: Date;
}

// Esquema Pedido
const OrderSchema: Schema = new Schema({
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
  }],
  total: { type: Number, required: true, min: 0 },
  status: { type: String, default: 'pending' },
}, {
  timestamps: true, 
});

export default mongoose.model<IOrder>('Order', OrderSchema);
