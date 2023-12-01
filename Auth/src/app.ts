import express from 'express';
import bodyParser from 'body-parser';
import { currentUserRouter } from './routes/currentUser';
import { signInRouter } from './routes/signIn';
import { signOutRouter } from './routes/signOut';
import { signUpRouter } from './routes/signUp';

const app = express();
app.use(bodyParser.json());

// app.get('/api/users/currentuser', (req, res) => {
//     console.log('This is the current user route');
//     res.send('Hi there!');
// });
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000!!!!!!!!1');
});
