import { app } from '../../app';
import request from 'supertest';

it('responds with details about the current user', async () => {
    const signupResponse = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'sagarkh@gmail.com',
            password: 'password'
        });
    expect(signupResponse.status).toBe(201);
    const cookie = signupResponse.get('Set-Cookie');
    console.log('cookie', cookie);
    const cookieValue = cookie[0].split(';')[0].split('=')[1];
    const currentUserResponse = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookieValue)
        .send({});
    console.log('currentUserResponse', currentUserResponse);
    // Expect the response status to be 200 or adjust as needed
    expect(currentUserResponse.status).toBe(200);
    expect(currentUserResponse.body).toHaveProperty('email', 'sagarkh@gmail.com');
});