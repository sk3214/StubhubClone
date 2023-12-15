import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../app';
import request from 'supertest';
import mongoose from 'mongoose';

let mongo: any;

declare global {
    var signin: () => Promise<string[]>;
}

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


global.signin = async () => {
    const email = 'sagarkh@gmail.com'
    const password = 'password';
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password
        }).expect(201);
    const cookie = response.get('Set-Cookie');
    return cookie;
}