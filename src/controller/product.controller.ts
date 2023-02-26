import { Request, Response } from 'express';
import { CreateProductInput, DeleteProductInput, UpdateProductInput } from '../schema/product.schema';
import { createProduct, deleteProduct, findAndUpdateProduct, getAllProduct } from '../service/product.service';

export async function createProductHandler(req: Request<{}, {}, CreateProductInput['body']>, res: Response) {
    try {
        const userId = res.locals.user._id;
        const body = req.body;
        const product = await createProduct({ ...body, user: userId });
        return res.send(product);
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}

export async function getAllProductHandler(req: Request, res: Response) {
    try {
        // const userId = res.locals.user._id;
        const allProduct = await getAllProduct();
        return res.send(allProduct);
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}

export async function getProductHandler(req: Request, res: Response) {
    try {
        const productId = req.params.productId;
        const product = await getAllProduct({ _id: productId });
        return res.send(product);
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}

export async function deleteProductHandler(req: Request<DeleteProductInput['params']>, res: Response) {
    try {
        const userId = res.locals.user._id;
        const productId = req.params.productId;
        const product = await getAllProduct({ _id: productId });
        if (!product) return res.sendStatus(403);
        if (String(product[0].user) !== userId) return res.sendStatus(403);
        await deleteProduct({ _id: productId });
        return res.sendStatus(200);
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}

export async function updateProductHandler(req: Request<UpdateProductInput['params']>, res: Response) {
    try {
        const userId = res.locals.user._id;
        const productId = req.params.productId;
        const updateContent = req.body;
        const product = await getAllProduct({ _id: productId });

        if (!product) return res.sendStatus(403);
        if (String(product[0].user) !== userId) return res.sendStatus(403);

        const updatedTask = await findAndUpdateProduct({ _id: productId }, updateContent, {
            new: true
        });

        return res.send(updatedTask);
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}
