import { Request, Response } from 'express';
import { omit } from 'lodash';
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../service/user.service';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(user);
    } catch (error: any) {
        console.log(error);
        return res.status(409).send(error.message);
    }
}

export async function getCurrentUser(req: Request, res: Response) {
    const user = omit(res.locals.user, 'iat', 'exp', 'createdAt', 'updatedAt', '__v');
    return res.send(user);
}
