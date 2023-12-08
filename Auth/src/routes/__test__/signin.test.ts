import request from 'supertest';
import { app } from '../../app';


it('fails when a email that does not exist is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'abc@gmail.com',
            password: 'password'
        }).expect(400);
});

it('returns a 200 on successful signin', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'sagarkh23@gmail.com',
            password: 'pass1'
        });
    expect(response.status).toBe(201);

    const resp = await request(app).post('/api/users/signin').send({
        email: 'sagarkh23@gmail.com',
        password: 'pass1'
    })
    expect(resp.status).toBe(200);
    expect(resp.get('Set-Cookie')).toBeDefined();
});

it('returns a 400 on unsuccessful signin', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'sagarkh23@gmail.com',
            password: 'pass1'
        });
    expect(response.status).toBe(201);

    const resp = await request(app).post('/api/users/signin').send({
        email: 'sagarkh23@gmail.com',
        password: 'pass2'
    })
    expect(resp.status).toBe(400);
});