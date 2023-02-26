import mongoose, { Document, Schema } from 'mongoose';
import { UserDocument } from './user.model';

export interface Product {
    user: UserDocument['_id'];
    name: string;
    price: string;
    description: string;
    stock: string;
    picture: string;
    profit?: string;
}

export interface ProductDocument extends Product, Document {
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<Product>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true },
        price: { type: String, required: true },
        profit: { type: String },
        description: { type: String, required: true },
        stock: { type: String, required: true },
        picture: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const ProductModel = mongoose.model<ProductDocument>('Product', ProductSchema);

export default ProductModel;
