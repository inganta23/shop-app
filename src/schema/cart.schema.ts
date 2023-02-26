import { number, object, string, TypeOf } from 'zod';

const payload = {
    body: object({
        product: string({
            required_error: 'Product name is required'
        }),
        quantity: number({
            required_error: 'Quantityis required'
        })
    })
};

export const CreateCartSchema = object({
    ...payload
});

export type CreateCartInput = TypeOf<typeof CreateCartSchema>;
