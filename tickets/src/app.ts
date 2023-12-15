import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@ticketix/common';

const app = express();
app.use(bodyParser.json());
app.set('trust proxy', true);
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));
// app.get('/api/users/currentuser1', (req, res) => {
//     console.log('This is the current user route');
//     res.send('Hi there!');
// });

app.all('*', async () => {
    throw new NotFoundError();
}
);
app.use(errorHandler);

export { app };