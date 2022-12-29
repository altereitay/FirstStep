const request = require('supertest');
const app = require('../app');
jest.mock('../modules/User');

const User = require('../modules/User');

test('POST /api/users', async () => {
    User.mockImplementation(() => {
        return {
            save: jest.fn().mockResolvedValue(true)
        };
    });

    const validEmail = 'valid@email.com';
    const validPassword = 'password';
    const validTypeOfUser = 'student';

    const response = await request(app)
        .post('/api/users')
        .send({email: validEmail, password: validPassword, typeOfUser: validTypeOfUser})
        .expect(200);

    expect(response.body).toHaveProperty('token');
    expect(User).toHaveBeenCalled();
});

test('POST /api/users with existing user', async () => {
    User.mockImplementation(() => {
        return {
            findOne: jest.fn(),
            save: jest.fn().mockResolvedValue(false)
        };
    });
    User.findOne.mockReturnValue(true)

    const validEmail = 'alter1eitai@gmail.com';
    const validPassword = '123456';
    const validTypeOfUser = 'student';

    const response = await request(app)
        .post('/api/users')
        .send({email: validEmail, password: validPassword, typeOfUser: validTypeOfUser})

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toEqual([{msg: 'User exist'}]);
});
