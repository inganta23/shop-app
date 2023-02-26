import mongoose, { Document, Schema } from 'mongoose';
import { UserDocument } from './user.model';

export interface Session {
    user: UserDocument['_id'];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SessionDocument extends Session, Document {}

const SessionSchema = new Schema<Session>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        valid: { type: Boolean, default: true },
        userAgent: { type: String }
    },
    {
        timestamps: true
    }
);

const SessionModel = mongoose.model<SessionDocument>('Session', SessionSchema);

export default SessionModel;
