import express from 'express';
import { createUserHandler, getCurrentUser } from '../controller/user.controller';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import { CreateUserSchema } from '../schema/user.schema';

const router = express.Router();

router.route('/me').get(requireUser, getCurrentUser);
router.route('/').post(validateResource(CreateUserSchema), createUserHandler);

export default router;
