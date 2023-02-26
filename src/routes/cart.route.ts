import express from 'express';
import { checkoutAll, createCartHandler, deleteCartHandler, getCartHandler, updateCartHandler } from '../controller/cart.controller';
import requireUser from '../middleware/requireUser';

const router = express.Router();

router.route('/').get(requireUser, getCartHandler).post(requireUser, createCartHandler);
router.route('/:cartId').put(requireUser, updateCartHandler).delete(requireUser, deleteCartHandler);
router.route('/checkout').post(requireUser, checkoutAll);

export default router;
