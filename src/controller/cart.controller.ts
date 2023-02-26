import { Request, Response } from 'express';
import { createCart, deleteCart, findAndUpdateCart, getAllCart } from '../service/cart.service';
import { findAndUpdateProduct, getAllProduct } from '../service/product.service';

export async function createCartHandler(req: Request, res: Response) {
    try {
        const userId = res.locals.user._id;
        const body = req.body;
        const isExist = await getAllCart({ product: body.product });

        if (isExist[0]) {
            if (Number(isExist[0].product.stock) < body.quantity + isExist[0].quantity) return res.status(404).send('Quantity cant be more than stock');
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
        const cartId = req.params.cartId;
        const body = req.body;
        const cart = await getAllCart({
            _id: cartId
        });
        //@ts-ignore
        const stock = cart[0].product.stock;
        if (Number(stock) < body.quantity) return res.status(404).send('Quantity cant be more than stock');
        const edited = await findAndUpdateCart(
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
        let profit = [];

        for (let i = 0; i < body.productsId.length; i++) {
            const product = await getAllProduct({
                _id: body.productsId[i]
            });
            if (!product[0]) return res.status(404);
            const newStock = Number(product[0].stock) - body.quantities[i];
            newQuantities.push(newStock);
            profit.push(body.quantities[i] * Number(product[0].price));
        }
        for (let i = 0; i < body.productsId.length; i++) {
            await findAndUpdateProduct(
                { _id: body.productsId[i] },
                {
                    stock: `${newQuantities[i]}`,
                    profit: `${profit[i]}`
                },
                {
                    new: true
                }
            );
        }
        return res.sendStatus(200);
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}

// export async function checkoutOnce(req: Request, res: Response) {
//     try {
//          const body = req.body;
//          const productId = req.params.productId;
//         const products = await getAllProduct({
//             _id: { $in: body.productsId }
//         });
//     } catch (error) {

//     }
// }
