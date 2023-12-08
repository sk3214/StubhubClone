import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
    return await request(app)
        .post('/api/users/signup')
        .send({
            email: 'sagarkh@gmail.com',
            password: 'password'
        }).expect(201);
});

it('returns a 400 with an invalid email and an error message', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'sagarkh',
            password: 'pass1'
        });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeInstanceOf(Array);
    expect(response.body.errors[0]).toHaveProperty('message', 'Email must be valid');
});


it('returns a 400 with an invalid password and an error message', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'sagarkh@gmail.com',
            password: 'pas'
        });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeInstanceOf(Array);
    expect(response.body.errors[0]).toHaveProperty('message', 'Password must be between 4 and 20 characters');
});

it('returns a 400 with missing email and password', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: '',
            password: ''
        });
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeInstanceOf(Array);
    expect(response.body.errors[1]).toHaveProperty('message', 'Password must be between 4 and 20 characters');
    expect(response.body.errors[0]).toHaveProperty('message', 'Email must be valid');
});

it('disallows duplicate emails', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'sagarkhuteta26@gmail.com',
            password: 'pass1'
        });
    expect(response.status).toBe(201);

    const response2 = await request(app).post('/api/users/signup').send({
        email: 'sagarkhuteta26@gmail.com',
        password: 'pass1'
    });
    expect(response2.status).toBeGreaterThanOrEqual(400);
    expect(response2.body.errors).toBeInstanceOf(Array);
    expect(response2.body.errors[0]).toHaveProperty('message', 'Email in use');
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'sagarkh23@gmail.com',
            password: 'pass1'
        });
    expect(response.status).toBe(201);
    // console.log('response', response);
    expect(response.get('Set-Cookie')).toBeDefined();
});