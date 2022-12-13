const request = require('supertest');
const app = require('../app');
const server = require('../server')

describe('POST /api/users', ()=>{
    describe('given email, password and type of user', ()=>{
        test('should return a response of 200 ',async ()=>{
            const response = await request(server).post('/api/users').send({
                email:'test@example.com',
                password:'123456',
                typeOfUser:'student'
            })
            expect(response.statusCode).toBe(200);
        })

        test('should return a response of json ',async ()=> {
            const response = await request(server).post('/api/users').send({
                email: 'test@example.com',
                password: '123456',
                typeOfUser: 'student'
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        })
    })

    // describe('when email is incorrect', ()=>{
    //
    // })
})