import { CookieOptions, Request, Response } from 'express';
import config from 'config';
import { validatePassword } from '../service/user.service';
import { createSession, findSessions, updateSession } from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';
import { UserDocument } from '../models/user.model';
import { CreateSesionInput } from '../schema/session.schema';

const accessTokenCookieOptions: CookieOptions = {
    maxAge: 900000, // 15 mins
    httpOnly: true,
    // domain: 'localhost',
    path: '/',
    sameSite: 'lax',
    secure: false
};

const refreshTokenCookieOptions: CookieOptions = {
    ...accessTokenCookieOptions,
    maxAge: 3.154e10 // 1 year
};

export async function createUserSessionHandler(req: Request<{}, {}, CreateSesionInput['body']>, res: Response) {
    const user = await validatePassword(req.body);

    if (!user) return res.status(401).send('Invalid email or password');

    const session = await createSession(user._id, req.get('user-agent') || '');

    const accessToken = signJwt({ ...user, session: session._id }, { expiresIn: config.get('accessTokenTtl') });

    const refreshToken = signJwt({ ...user, session: session._id }, { expiresIn: config.get('refreshTokenTtl') });

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);

    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;

    const sessions = await findSessions({ user: userId });

    return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;

    await updateSession({ _id: sessionId }, { valid: false });
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.send({
        accessToken: null,
        refreshToken: null
    });
}
