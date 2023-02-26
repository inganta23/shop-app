import { omit } from 'lodash';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import config from 'config';
import axios from 'axios';
import qs from 'qs';
import UserModel, { User, UserDocument } from '../models/user.model';

export async function createUser(input: User) {
    try {
        const user = await UserModel.create(input);
        return omit(user.toJSON(), 'password');
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function validatePassword({ email, password }: { email: string; password: string }) {
    try {
        const user = await UserModel.findOne({ email });

        if (!user) return false;
        const isValid = await user.comparePassword(password);

        if (!isValid) return false;

        return omit(user.toJSON(), 'password');
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findUser(query: FilterQuery<User>) {
    return UserModel.findOne(query).lean();
}

export async function findAndUpdateUser(query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions = {}) {
    return UserModel.findOneAndUpdate(query, update, options);
}

// Google Oauth

interface GoogleTokensResult {
    access_token: string;
    expires_in: Number;
    refresh_token: string;
    scope: string;
    id_token: string;
}

export async function getGoogleOAuthTokens({ code }: { code: string }): Promise<GoogleTokensResult> {
    const url = 'https://oauth2.googleapis.com/token';

    const values = {
        code,
        client_id: config.get('googleClientId'),
        client_secret: config.get('googleClientSecret'),
        redirect_uri: config.get('googleOauthRedirectUrl'),
        grant_type: 'authorization_code'
    };

    try {
        const res = await axios.post<GoogleTokensResult>(url, qs.stringify(values), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return res.data;
    } catch (error: any) {
        console.error(error.response.data.error);
        console.error(error, 'Failed to fetch Google Oauth Tokens');
        throw new Error(error.message);
    }
}

interface GoogleUserResult {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

export async function getGoogleUser({ id_token, access_token }: { id_token: string; access_token: string }): Promise<GoogleUserResult> {
    try {
        const res = await axios.get<GoogleUserResult>(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${id_token}`
            }
        });
        return res.data;
    } catch (error: any) {
        console.error(error, 'Error fetching Google user');
        throw new Error(error.message);
    }
}
