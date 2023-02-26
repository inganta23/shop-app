import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import ProductModel, { Product, ProductDocument } from '../models/product.model';

export async function createProduct(input: Product) {
    try {
        return ProductModel.create(input);
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getAllProduct(query: FilterQuery<ProductDocument> = {}) {
    return ProductModel.find(query);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
    return ProductModel.deleteOne(query);
}

export async function findAndUpdateProduct(query: FilterQuery<ProductDocument>, update: UpdateQuery<Product>, options: QueryOptions) {
    return ProductModel.findOneAndUpdate(query, update, options);
}
