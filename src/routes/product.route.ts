import express from 'express';
import { createProductHandler, deleteProductHandler, getAllProductHandler, getProductHandler, updateProductHandler } from '../controller/product.controller';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import { CreateProductSchema, DeleteProductSchema, UpdateProductSchema } from '../schema/product.schema';
const router = express.Router();

router
    .route('/')
    .get(requireUser, getAllProductHandler)
    .post([requireUser, validateResource(CreateProductSchema)], createProductHandler);

router
    .route('/:productId')
    .get(requireUser, getProductHandler)
    .put([requireUser, validateResource(UpdateProductSchema)], updateProductHandler)
    .delete([requireUser, validateResource(DeleteProductSchema)], deleteProductHandler);

export default router;
