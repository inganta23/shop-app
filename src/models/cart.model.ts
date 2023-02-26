import mongoose, { Document, Schema } from 'mongoose';
import { ProductDocument } from './product.model';
import { UserDocument } from './user.model';

export interface Cart {
    user: UserDocument['_id'];
    product: ProductDocument['_id'];
    quantity: number;
}

export interface CartDocument extends Cart, Document {
    createdAt: Date;
    updatedAt: Date;
}

const CartSchema = new Schema<Cart>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true }
    },
    {
        timestamps: true
    }
);

const CartModel = mongoose.model<CartDocument>('Cart', CartSchema);

export default CartModel;
