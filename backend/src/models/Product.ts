import mongoose, { Document, Schema } from 'mongoose';

// Interfaz Product
export interface IProduct extends Document {
    name: string;
    description?: string;
    price: number;
    available: boolean;
}

// Esquema
const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
}, {
     timestamps: true,
}
)

export default mongoose.model<IProduct>('Product', ProductSchema);