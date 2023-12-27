import mongoose from 'mongoose';
import { config } from '../config/configDB';

export async function connectToMongoDB(){
    try {
        const client = await mongoose.connect(config.mongo.uri, {
            retryWrites: true,
            w: 'majority'
        });

        console.log('Connected to MongoDB server! 👩‍💻');

        return client;
    } catch (err) {
        console.error('Error:', err);
    }
}