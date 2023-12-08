import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../app';
import mongoose from 'mongoose';

let mongo: any;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri, {});
    process.env.JWT_KEY = 'SagarKey';

});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});