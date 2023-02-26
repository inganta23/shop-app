import { Request, Response } from 'express';
import { createCart, deleteCart, findAndUpdateCart, getAllCart } from '../service/cart.service';
import { findAndUpdateProduct, getAllProduct } from '../service/product.service';

export async function createCartHandler(req: Request, res: Response) {
    try {
        const userId = res.locals.user._id;
        const body = req.body;
        const isExist = await getAllCart({ product: body.product });
        if (isExist[0]) {
            const updated = await findAndUpdateCart(
                { _id: isExist[0]._id },
                {
                    quantity: isExist[0].quantity + body.quantity
                },
                {
                    new: true
                }
            );
            return res.send(updated);
        }
        const cart = await createCart({ ...body, user: userId });
        return res.send(cart);
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}

export async function getCartHandler(req: Request, res: Response) {
    try {
        const userId = res.locals.user._id;
        const cart = await getAllCart({ user: userId });
        return res.send(cart);
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}

export async function updateCartHandler(req: Request, res: Response) {
    try {
        const cartId = req.params.productId;
        const body = req.body;
        const edited = findAndUpdateCart(
            { _id: cartId },
            {
                quantity: body.quantity
            },
            {
                new: true
            }
        );
        res.send(edited);
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}

export async function deleteCartHandler(req: Request, res: Response) {
    try {
        const cartId = req.params.cartId;
        const data = await deleteCart({ _id: cartId });
        return res.sendStatus(200);
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}

export async function checkoutAll(req: Request, res: Response) {
    try {
        const body = req.body;
        let newQuantities = [];
        console.log(body);
        const products = await getAllProduct({
            _id: { $in: body.productsId }
        });
        for (let i = 0; i < products.length; i++) {
            const reverseI = products.length - 1 - i;

            const newStock = Number(products[i].stock) - body.quantities[reverseI];
            newQuantities.push(newStock);
        }
        newQuantities = newQuantities.reverse();

        for (let i = 0; i < products.length; i++) {
            const edited = await findAndUpdateProduct(
                { _id: body.productsId[i] },
                {
                    stock: `${newQuantities[i]}`
                },
                {
                    new: true
                }
            );
            console.log(edited);
        }
        res.sendStatus(200);
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}
