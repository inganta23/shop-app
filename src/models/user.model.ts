import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface User {
    email: string;
    name: string;
    password: string;
    picture?:string;
}

export interface UserDocument extends User, Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        picture: { type: String },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

UserSchema.pre('save', async function (next) {
    let user = this as UserDocument;
    if (!user.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;
    return next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
