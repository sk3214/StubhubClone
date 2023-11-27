import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.get('/api/users/currentuser', (req, res) => {
    console.log('This is the current user endpoint');
    res.send('Hi there!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000!!');
});
