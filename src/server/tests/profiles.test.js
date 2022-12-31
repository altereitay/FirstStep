const request = require('supertest');
const app = require('../app');
jest.mock('../modules/EmployerProfile');
const Employer = require('../modules/EmployerProfile')
jest.mock('../modules/StudentProfile');
const Student = require('../modules/StudentProfile')
const jwt = require("jsonwebtoken");

const employerObject = {
    "_id": "639b6582fa63e7290b2b1e92",
    "user": "639b6554fa63e7290b2b1e8b",
    "name": "test Tester",
    "business": "test business",
    "picture": "",
    "description": "mock data for employer checks",
    "isApproved": false
}

const studentObject = {
    "_id": "638f6bd5aaac83c3ff2cd8ff",
    "user": "638f571e13c8855f0798262d",
    "name": "test Tester",
    "dateOfBirth": "1664928000000",
    "city": "tel aviv",
    "education": [{
        "school": "SCE",
        "degree": "Software engineering ",
        "from": "1664928000000",
        "to": "1671062400000",
        "current": true,
        "_id": "638f6bd5aaac83c3ff2cd900"
    }],
    "skills": ["js"],
    "description": "delete",
    "availability": [{
        "sunday": true,
        "monday": true,
        "tuesday": false,
        "wednesday": false,
        "thursday": false,
        "friday": false,
        "saturday": false,
        "_id": "638f6bd5aaac83c3ff2cd901"
    }],
    "isApproved": false
}

describe('GET api/profiles/:id', () => {
    test('without auth token', async () => {
        const response = await request(app)
            .get('/api/profiles/1')

        expect(response.statusCode).toBe(401);
    });


    test('with token and good id', async () => {
        Employer.mockImplementation(() => {
            return {
                findOne: jest.fn().mockResolvedValue(employerObject),
                find: jest.fn().mockResolvedValue(true)
            };
        });
        Employer.find.mockReturnValue(true);
        Student.mockImplementation(() => {
            return {
                exists: jest.fn().mockResolvedValue(false)
            };
        });


        Employer.findOne.mockReturnValue(employerObject)
        const userId = '639b6554fa63e7290b2b1e8b';
        // const userId = '1';

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
        expect(response.body).toMatchObject(employerObject);
    });
})

describe('POST api/profiles/student', () => {
    test('empty request', async () => {
        const response = await request(app).post('/api/profiles/student')

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
    })
    test('user already have profile', async ()=>{
        Student.mockImplementation(() => {
            return {
                exists: jest.fn().mockReturnValue(true)
            };
        });
        Student.exists.mockReturnValue(true);
        const response = await request(app).post('/api/profiles/student').send(studentObject);

        expect(response.statusCode).toBe(400);
        expect(response.body.msg).toBe('user already have a profile')
    })

    test('a good request', async ()=>{
        Student.mockImplementation(() => {
            return {
                exists: jest.fn(),
                save: jest.fn().mockResolvedValue(true)
            };
        });
        Student.exists.mockReturnValue(false);

        Employer.mockImplementation(() => {
            return {
                exists: jest.fn()
            };
        });
        Employer.exists.mockReturnValue(false);

        const spy = jest.spyOn(Student, 'constructor');
        spy.mockResolvedValue(new Student(studentObject));
        const response = await request(app).post('/api/profiles/student').send(studentObject);

        expect(response.statusCode).toBe(200);
        spy.mockReset();
    })
})

describe('PUT api/profiles/student/:id', ()=>{
    afterEach(()=>{
        jest.restoreAllMocks()
    })

    test('an empty request', async ()=>{
        const response = await request(app).put('/api/profiles/student/1').send()
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
    })

    test('profile doesnt exists', async ()=>{

        Student.mockImplementation(() => {
            return {
                exists: jest.fn()
            };
        });
        Student.exists.mockReturnValue(false);
        const response = await request(app).put('/api/profiles/student/1').send(studentObject)

        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({msg: 'profile dosent exist'});
    })

    test('a good request', async ()=>{
        Student.mockImplementation(() => {
            return {
                exists: jest.fn(),
                findOneAndUpdate: jest.fn()
            };
        });
        Student.exists.mockReturnValue(true);
        Student.findOneAndUpdate.mockReturnValue({profile:studentObject, save:jest.fn()});

        const response = await request(app).put(`/api/profiles/student/${studentObject.user}`).send({...studentObject, name: 'update'})

        expect(response.statusCode).toBe(200);
        expect(response.body.profile.profile).toMatchObject(studentObject);

    })

})