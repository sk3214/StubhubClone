import { app } from '../../app';
import request from 'supertest';

it('responds with details about the current user', async () => {
    const cookieString = await global.signin();
    // const cookies = cookieString[0].split(';');

    // Find the cookie named "session"
    // const sessionCookie = cookies.find(cookie => cookie.startsWith('session='));
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookieString)
        .send()
    // console.log('response', response);
    expect(response.body.currentUser.email).toEqual('sagarkh@gmail.com');
});

it("responds with null if not authenticated", async () => {
    const response = await request(app)
        .get("/api/users/currentuser")
        .send()
        .expect(400);
    console.log('response', response);
    expect(response.body.currentUser).toEqual(undefined);
});