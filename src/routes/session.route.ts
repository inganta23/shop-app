import express from 'express';
import { getUserSessionHandler, createUserSessionHandler, deleteSessionHandler } from '../controller/session.controller';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import { CreateSessionSchema } from '../schema/session.schema';

const router = express.Router();

router.route('/').get(requireUser, getUserSessionHandler).post(validateResource(CreateSessionSchema), createUserSessionHandler).delete(requireUser, deleteSessionHandler);

export default router;
