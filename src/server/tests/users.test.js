const request = require('supertest');
const app = require('../app');
jest.mock('../modules/User');
const User = require('../modules/User');
const jwt = require("jsonwebtoken");

const userObject = {
    "_id": "637e310e6e272c40bfe945e6",
    "email": "alter1eitai@gmail.com",
    "password": "$2a$10$bJ6i/D7C7hHTI51Qqh6tpuUCamq6TMyD/nTTTc1KWJ99cIfH/E.PS",
    "typeOfUser": "admin",
    "date": "1669214478671",
}

describe('POST /api/users', () => {
    test('a new user', async () => {
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

    test('with existing user', async () => {
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

})

describe('PUT /api/users/:id', () => {
    test('no auth token', async () => {
        const response = await request(app).put('/api/users/1');
        expect(response.statusCode).toBe(401);
        expect(response.body).toMatchObject({msg: 'No token, authorization denied'});
    })

    test('with token, no body', async () => {
        const payload = {
            user: {
                id: userObject._id
            }
        }

        const tok = jwt.sign(payload, require('../configs/defualt.json').JWT_SECRET, {expiresIn: 360000})


        const response = await request(app).put('/api/users/1').set('x-auth-token', tok);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
    })

    test('with token, non existing user', async () => {
        User.mockImplementation(() => {
            return {
                exists: jest.fn()
            }
        })
        User.exists.mockReturnValue(false)
        const payload = {
            user: {
                id: userObject._id
            }
        }

        const tok = jwt.sign(payload, require('../configs/defualt.json').JWT_SECRET, {expiresIn: 360000})


        const response = await request(app).put('/api/users/1').send(userObject).set('x-auth-token', tok);
        expect(response.statusCode).toBe(404);
        expect(response.body).toMatchObject({errors: [{msg: "User Doesn't exists"}]});
    })

    test('a good request', async () => {
        User.mockImplementation(() => {
            return {
                exists: jest.fn(),
                findOneAndUpdate: jest.fn()
            }
        })
        User.exists.mockReturnValue(true)
        User.findOneAndUpdate.mockReturnValue({...userObject, save: jest.fn()})
        const payload = {
            user: {
                id: userObject._id
            }
        }

        const tok = jwt.sign(payload, require('../configs/defualt.json').JWT_SECRET, {expiresIn: 360000})


        const response = await request(app).put('/api/users/1').send(userObject).set('x-auth-token', tok);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    })
})