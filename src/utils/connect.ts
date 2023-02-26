import mongoose from "mongoose";
import config from 'config';

export default async function connect() {
    const dbUri = config.get<string>('dbUri');

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(dbUri);
        console.log('Db Connected')
    } catch (error) {
        console.log('Cannot connect to db')
        process.exit()
    }
}