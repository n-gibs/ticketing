import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY is undefined');
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is undefined');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    } catch (err) {
        console.log(err);
    }

    app.listen(3000, () => {
        console.log('listening on 3000');
    });
};

start();
