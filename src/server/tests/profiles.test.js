const request = require('supertest');
const app = require('../app');
jest.mock('../modules/EmployerProfile');
const Employer = require('../modules/EmployerProfile');
const jwt = require("jsonwebtoken");


test('GET api/profiles/:id without auth token', async () => {
    const response = await request(app)
        .get('/api/profiles/1')

    expect(response.statusCode).toBe(401);
});


test('GET api/profiles/:id', async () => {
    Employer.mockImplementation(() => {
        return {
            findOne: jest.fn()
        };
    });

    const obj = {
        "_id":"639b6582fa63e7290b2b1e92",
        "user":"639b6554fa63e7290b2b1e8b",
        "name":"test Tester",
        "business":"test business",
        "picture":"",
        "description":"mock data for employer checks",
        "isApproved":false
    }
    Employer.findOne.mockReturnValue(obj)
    const userId = '639b6554fa63e7290b2b1e8b';

    const payload = {
        user: {
            id: userId
        }
    }
    const tok = jwt.sign(payload, require('../configs/defualt.json').JWT_SECRET, {expiresIn: 360000})

    const response = await request(app)
        .get(`/api/profiles/${userId}`)
        .set('x-auth-token', tok)


    expect(response.statusCode).toBe(200)
    expect(response).toHaveProperty('headers.content-type', 'application/json');

});
