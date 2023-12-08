import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signing out', async () => {
    const resp = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'sagarkh@gmail.com',
            password: 'password'
        });
    expect(resp.status).toBe(201);
    expect(resp.get('Set-Cookie')).toBeDefined();
    const response = await request(app)
        .post('/api/users/signout')
        .send({})
    expect(response.status).toBe(200);
    expect(response.get('Set-Cookie')[0]).toBeDefined();
});