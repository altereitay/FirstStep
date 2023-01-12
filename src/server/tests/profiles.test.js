const request = require('supertest');
const app = require('../app');
jest.mock('../modules/EmployerProfile');
const Employer = require('../modules/EmployerProfile')
jest.mock('../modules/StudentProfile');
const Student = require('../modules/StudentProfile')
const jwt = require("jsonwebtoken");
const Job = require("../modules/JobOffer");
jest.mock('../modules/JobOffer')

const jobObject = {
    "_id": "63a376b8640d2183e97cbdf1",
    "profile": "639c4d9d5314b74b61906c40",
    "jobTitle": "test2",
    "business": "ew",
    "description": "rer",
    "percentageOfJob": "ewqe",
    "location": "rwq",
    "requiredSkills": ["ewq"],
    "jobType": ["weq"],
    "requiredDays": {
        "sunday": false,
        "monday": true,
        "tuesday": false,
        "wednesday": false,
        "thursday": false,
        "friday": false,
        "saturday": false
    },
    "appliedStudents": [],
}

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
const userObject = {
    "_id": "637e310e6e272c40bfe945e6",
    "email": "alter1eitai@gmail.com",
    "password": "$2a$10$bJ6i/D7C7hHTI51Qqh6tpuUCamq6TMyD/nTTTc1KWJ99cIfH/E.PS",
    "typeOfUser": "admin",
    "date": "1669214478671",
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

describe('POST api/profiles/employer', () => {
    test('empty request', async () => {
        const response = await request(app).post('/api/profiles/employer')

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
    })
    test('user already have profile', async ()=>{
        Employer.mockImplementation(() => {
            return {
                exists: jest.fn().mockReturnValue(true)
            };
        });
        Employer.exists.mockReturnValue(true);
        const response = await request(app).post('/api/profiles/employer').send(employerObject);

        expect(response.statusCode).toBe(400);
        expect(response.body.msg).toBe('user already have a profile')
    })

    test('a good request', async ()=>{
        Employer.mockImplementation(() => {
            return {
                exists: jest.fn(),
                save: jest.fn().mockResolvedValue(true)
            };
        });
        Employer.exists.mockReturnValue(false);

        const spy = jest.spyOn(Employer, 'constructor');
        spy.mockResolvedValue(new Employer(employerObject));
        const response = await request(app).post('/api/profiles/employer').send(employerObject);

        expect(response.statusCode).toBe(200);
        spy.mockReset();
    })
})


describe('PUT api/profiles/employer/:id', ()=>{
    afterEach(()=>{
        jest.restoreAllMocks()
    })

    test('an empty request', async ()=>{
        const response = await request(app).put('/api/profiles/employer/1').send()
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
    })

    test('profile doesnt exists', async ()=>{

        Employer.mockImplementation(() => {
            return {
                exists: jest.fn()
            };
        });
        Employer.exists.mockReturnValue(false);
        const response = await request(app).put('/api/profiles/employer/1').send(employerObject)

        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({msg: 'profile dosent exist'});
    })

    test('a good request', async ()=>{
        Employer.mockImplementation(() => {
            return {
                exists: jest.fn(),
                findOneAndUpdate: jest.fn()
            };
        });
        Employer.exists.mockReturnValue(true);
        Employer.findOneAndUpdate.mockReturnValue({profile:employerObject, save:jest.fn()});

        const response = await request(app).put(`/api/profiles/employer/${employerObject.user}`).send({...employerObject, name: 'update'})

        expect(response.statusCode).toBe(200);
        expect(response.body.profile.profile).toMatchObject(employerObject);

    })
})

describe('GET api/profiles/employer', () => {

    test('a good request', async()=> {
        Employer.mockImplementation(() => {
            return {
                find: jest.fn()
            }
        })
        Employer.find.mockReturnValue({employerObject})
        const response = await request(app).get('/api/profiles/employer')

        expect(response.statusCode).toBe(200);
    })
})

describe('GET api/profiles/student', () => {

    test('a good request', async()=> {
        Employer.mockImplementation(() => {
            return {
                find: jest.fn()
            }
        })
        Student.find.mockReturnValue({studentObject})
        const response = await request(app).get('/api/profiles/student')

        expect(response.statusCode).toBe(200);
    })
})

describe('POST api/profiles/approve/:id',()=>{
    test('student profile  doesnt exists',async ()=>{
        Student.mockImplementation(() => {
            return {
                findById: jest.fn()
            };
        });
        Student.findById.mockReturnValue(false);
        const response=await request(app).put('/api/profiles/approve/1').send({typeOfUser:'student'})
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('errors');
    })
    test('employer profile  doesnt exists',async ()=>{
        Employer.mockImplementation(() => {
            return {
                findById: jest.fn()
            };
        });
        Employer.findById.mockReturnValue(false);
        const response=await request(app).put('/api/profiles/approve/1').send({typeOfUser:'employer'})
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('errors');
    })
    test('student profile  exists',async ()=>{
        Student.mockImplementation(() => {
            return {
                findById: jest.fn()
            };
        });
        Student.findById.mockReturnValue({studentObject,save:jest.fn()});
        const response=await request(app).put('/api/profiles/approve/1').send({typeOfUser:'student'})
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({msg: 'Profile Approved'});
    })
    test('employer profile  exists',async ()=>{
        Student.mockImplementation(() => {
            return {
                findById: jest.fn()
            };
        });
        Employer.findById.mockReturnValue({employerObject,save:jest.fn()});
        const response=await request(app).put('/api/profiles/approve/1').send({typeOfUser:'employer'})
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({msg: 'Profile Approved'});
    })
})
describe('GET api/profiles/relevant/:id', ()=>{
    test('Job does not exist', async ()=>{
        Job.mockImplementation(() => {
            return {
                findById: jest.fn()
            }
        })
        Job.findById.mockReturnValue( false)

        const payload = {
            user: {
                id: userObject._id
            }
        }

        const tok = jwt.sign(payload, require('../configs/defualt.json').JWT_SECRET, {expiresIn: 360000})
        const response = await request(app).get('/api/profiles/relevant/1').set('x-auth-token', tok)

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('errors');
    })
})


