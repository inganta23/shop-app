import { get, omit } from 'lodash';
import config from 'config';
import SessionModel, { Session, SessionDocument } from '../models/session.model';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import { findUser } from './user.service';
import { FilterQuery, UpdateQuery } from 'mongoose';

export async function createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({
        user: userId,
        userAgent
    });

    return session.toJSON();
}

export async function findSessions(query: FilterQuery<Session>) {
    return SessionModel.find(query).lean();
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return SessionModel.updateOne(query, update);
}

export async function resIssueAccessToken({ refreshToken }: { refreshToken: string }) {
    const { decoded } = verifyJwt(refreshToken);

    if (!decoded || !get(decoded, 'session')) return;

    const session = await SessionModel.findById(get(decoded, 'session'));

    if (!session || !session.valid) return false;

    const user = await findUser({ _id: session.user });
    //remove password
    const newUser = omit(JSON.parse(JSON.stringify(user)), 'password');

    if (!newUser) return false;

    const accessToken = signJwt({ ...newUser, session: session._id }, { expiresIn: config.get('accessTokenTtl') });

    return accessToken;
}
