import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/currentUser';
import { signInRouter } from './routes/signIn';
import { signOutRouter } from './routes/signOut';
import { signUpRouter } from './routes/signUp';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(bodyParser.json());
app.set('trust proxy', true);
app.use(cookieSession({
    signed: false,
    secure: true
}));
// app.get('/api/users/currentuser1', (req, res) => {
//     console.log('This is the current user route');
//     res.send('Hi there!');
// });
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.all('*', async (req, res, next) => {
    throw new NotFoundError();
}
);
app.use(errorHandler);

const start = async () => {
    // if (!process.env.JWT_KEY) {
    //     throw new Error('JWT_KEY must be defined');
    // }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
    app.listen(3000, () => {
        console.log('Server is running on port 3000!!!!!!!!!!');
    });
}

start();