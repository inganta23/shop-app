import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import CartModel, { Cart, CartDocument } from '../models/cart.model';

export async function createCart(input: Cart) {
    try {
        return CartModel.create(input);
    } catch (error: any) {
        throw new Error(error);
    }
}
export async function getAllCart(query: FilterQuery<CartDocument> = {}) {
    try {
        return CartModel.find(query).populate('product');
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findAndUpdateCart(query: FilterQuery<CartDocument>, update: UpdateQuery<Cart>, options: QueryOptions) {
    try {
        return CartModel.findOneAndUpdate(query, update, options);
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteCart(query: FilterQuery<CartDocument>) {
    return CartModel.deleteOne(query);
}
