const request = require('supertest');
const app = require('../app');
jest.mock('../modules/User');
const User = require('../modules/User');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const userObject = {
    "_id": "637e310e6e272c40bfe945e6",
    "email": "alter1eitai@gmail.com",
    "password": "$2a$10$bJ6i/D7C7hHTI51Qqh6tpuUCamq6TMyD/nTTTc1KWJ99cIfH/E.PS",
    "typeOfUser": "admin",
    "date": "1669214478671",
}
const userCrets = {
    email: 'test@example.com',
    password: '123456'
}
describe('GET /api/auth', () => {
    test('no token included', async () => {
        const response = await request(app).get('/api/auth')

        expect(response.statusCode).toBe(401)
        expect(response.body).toMatchObject({msg: 'No token, authorization denied'})
    })
    test('token included', async () => {
        User.mockImplementation(() => {
            return {
                findById: jest.fn()
            };
        });
        User.findById.mockReturnValue({select: jest.fn().mockReturnValue(userObject)})

        const payload = {
            user: {
                id: userObject._id
            }
        }

        const tok = jwt.sign(payload, require('../configs/defualt.json').JWT_SECRET, {expiresIn: 360000})

        const response = await request(app).get('/api/auth').set('x-auth-token', tok)

        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject(userObject)

    })
})

describe('POST api/auth/login', () => {
    test('empty request',async () => {
        const response = await request(app).post('/api/auth/login')

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
    })

    test('email dont exists', async ()=>{
        User.mockImplementation(()=>{
            return{
                findOne: jest.fn()
            }
        })
        User.findOne.mockReturnValue(false)
        const response = await request(app).post('/api/auth/login').send(userCrets)

        expect(response.statusCode).toBe(400)
        expect(response.body.errors).toMatchObject([{msg: 'invalid credentials'}])
    })

    test('password dont match', async ()=>{
        User.mockImplementation(()=>{
            return{
                findOne: jest.fn()
            }
        })
        User.findOne.mockReturnValue({password:'123457'})
        const response = await request(app).post('/api/auth/login').send(userCrets)

        expect(response.statusCode).toBe(400)
        expect(response.body.errors).toMatchObject([{msg: 'invalid credentials'}])
    })

    test('a good request', async ()=>{
        User.mockImplementation(()=>{
            return{
                findOne: jest.fn()
            }
        })
        User.findOne.mockReturnValue(userObject)
        const response = await request(app).post('/api/auth/login').send(userCrets)

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('token')
    })


})