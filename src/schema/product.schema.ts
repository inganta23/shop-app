import { object, string, TypeOf } from 'zod';

const payload = {
    body: object({
        name: string({
            required_error: 'Product name is required'
        }).min(2, 'Product name should be 2 chars minimum'),
        stock: string({
            required_error: 'Stock is required'
        }),
        picture: string({
            required_error: 'Picture is required'
        }),
        description: string({
            required_error: 'Description is required'
        }).min(10, 'Description should be 10 chars minimum'),
        price: string({
            required_error: 'Price is required'
        }).min(3, 'Price should be 3 chars minimum')
    })
};

const params = {
    params: object({
        productId: string({
            required_error: 'task _id is required'
        })
    })
};

export const CreateProductSchema = object({
    ...payload
});

export const DeleteProductSchema = object({
    ...params
});

export const UpdateProductSchema = object({
    ...payload,
    ...params
});

export type CreateProductInput = TypeOf<typeof CreateProductSchema>;
export type DeleteProductInput = TypeOf<typeof DeleteProductSchema>;
export type UpdateProductInput = TypeOf<typeof UpdateProductSchema>;
