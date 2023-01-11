const request = require('supertest');
const app = require('../app');
jest.mock('../modules/StudentProfile')
const Student = require('../modules/StudentProfile')
jest.mock('../modules/JobOffer')
const Job = require('../modules/JobOffer')
jest.mock('../modules/EmployerProfile')
const Employer = require('../modules/EmployerProfile')
const jwt = require("jsonwebtoken");


const jobObject = {
    "_id": "63a376b8640d2183e97cbdf1",
    "profile": "639c4d9d5314b74b61906c40",
    "jobTitle": "test2",
    "business": "ew",
    "description": "rer",
    "percentageOfJob": "ewqe",
    "location": "rwq",
    "requiredSkills": ["ewq"],
    "jobType": ["Software engineering"],
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

const userObject = {
    "_id": "637e310e6e272c40bfe945e6",
    "email": "alter1eitai@gmail.com",
    "password": "$2a$10$bJ6i/D7C7hHTI51Qqh6tpuUCamq6TMyD/nTTTc1KWJ99cIfH/E.PS",
    "typeOfUser": "admin",
    "date": "1669214478671",
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

describe('POST /api/jobs', () => {
    test('an empty request', async () => {
        const response = await request(app).post('/api/jobs')

        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('errors')
    })

    test('non existing employer', async () => {
        Employer.mockImplementation(() => {
            findOne: jest.fn().mockReturnValue(false)
        })

        const response = await request(app).post('/api/jobs').send(jobObject);
        expect(response.statusCode).toBe(404)
        expect(response.body.errors).toStrictEqual([{msg: 'No employer found'}])
    })

    test('a good request', async () => {
        Employer.mockImplementation(() => {
            findOne: jest.fn().mockReturnValue(true)
        })
        Employer.findOne.mockReturnValue(true)
        const spy = jest.spyOn(Job, 'constructor');
        spy.mockResolvedValue(new Job(jobObject));

        const response = await request(app).post('/api/jobs').send(jobObject)

        expect(response.statusCode).toBe(200)
        spy.mockReset();
    })
})

describe('PUT /api/jobs/:id', () => {
    test('an empty request', async () => {
        const response = await request(app).put('/api/jobs/1')

        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('errors')
    })
    test('non existing job', async () => {
        Job.mockImplementation(() => {
            exists: jest.fn().mockReturnValue(false)
        })
        const response = await request(app).put('/api/jobs/1').send(jobObject)

        expect(response.statusCode).toBe(404)
        expect(response.body).toHaveProperty('errors')
    })
    test('a good request', async () => {
        Job.mockImplementation(() => {
            exists: jest.fn()
            findOneAndUpdate: jest.fn()
        })
        Job.exists.mockReturnValue(true)
        Job.findOneAndUpdate.mockReturnValue({save: jest.fn().mockReturnValue(jobObject)})
        const response = await request(app).put('/api/jobs/1').send(jobObject)

        expect(response.statusCode).toBe(200)
    })
})

describe('GET /api/jobs/:id', () => {
    test('without token', async () => {
        const response = await request(app).get('/api/jobs/1')

        expect(response.statusCode).toBe(401)
        expect(response.body).toMatchObject({msg: 'No token, authorization denied'})
    })
    test('with token, non existing employer', async () => {
        Employer.mockImplementation(() => {
            return {
                findById: jest.fn().mockReturnValue(false)
            }
        })
        const payload = {
            user: {
                id: userObject._id
            }
        }

        const tok = jwt.sign(payload, require('../configs/defualt.json').JWT_SECRET, {expiresIn: 360000})

        const response = await request(app).get('/api/jobs/1').set('x-auth-token', tok)

        expect(response.statusCode).toBe(404)
        expect(response.body).toHaveProperty('errors')

    })

    test('a good request', async () => {
        Employer.mockImplementation(() => {
            return {
                findById: jest.fn()
            }
        })
        Employer.findById.mockReturnValue(true)

        Job.mockImplementation(() => {
            return {
                find: jest.fn()
            }
        })
        Job.find.mockReturnValue({jobs: {jobObject}})

        const payload = {
            user: {
                id: userObject._id
            }
        }

        const tok = jwt.sign(payload, require('../configs/defualt.json').JWT_SECRET, {expiresIn: 360000})

        const response = await request(app).get('/api/jobs/1').set('x-auth-token', tok)

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('jobs')

    })
})

describe('DELETE /api/jobs/:id', () => {
    test('without token', async () => {
        const response = await request(app).delete('/api/jobs/1')

        expect(response.statusCode).toBe(401)
        expect(response.body).toMatchObject({msg: 'No token, authorization denied'})
    })
    test('with token, non existing job id', async () => {
        Job.mockImplementation(() => {
            return {
                exists: jest.fn().mockReturnValue(false)
            }
        })
        const payload = {
            user: {
                id: userObject._id
            }
        }

        const tok = jwt.sign(payload, require('../configs/defualt.json').JWT_SECRET, {expiresIn: 360000})

        const response = await request(app).delete('/api/jobs/1').set('x-auth-token', tok)

        expect(response.statusCode).toBe(404)
        expect(response.body.msg).toBe("Job Doesn't exists")

    })

    test('a good request', async () => {

        Job.mockImplementation(() => {
            return {
                findById: jest.fn(),
                findOneAndDelete: jest.fn()
            }
        })
        Job.findById.mockReturnValue(true)

        const payload = {
            user: {
                id: userObject._id
            }
        }

        const tok = jwt.sign(payload, require('../configs/defualt.json').JWT_SECRET, {expiresIn: 360000})

        const response = await request(app).delete('/api/jobs/1').set('x-auth-token', tok)

        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toBe('Job Deleted Successfully')

    })
})

describe('GET /api/jobs', () => {
    test('a good request', async () => {
        Job.mockImplementation(() => {
            return {
                find: jest.fn()
            }
        })
        Job.find.mockReturnValue({jobs: {jobObject}})

        const response = await request(app).get('/api/jobs')

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('jobs')
    })
})

describe('GET /api/jobs/student/:id', () => {
    test('No auth token', async () => {
        const response = await request(app).get(`/api/jobs/student/${userObject._id}`)
        expect(response.statusCode).toBe(401)
    })

    test('non existing user', async () => {
        Student.mockImplementation(()=>{
            return {
                findById: jest.fn()
            }
        })
        Student.findById.mockReturnValue(false);

        const userId = '63bae3f89b092eafea6ecb30';

        const payload = {
            user: {
                id: userId
            }
        }
        const tok = jwt.sign(payload, require('../configs/defualt.json').JWT_SECRET, {expiresIn: 360000})

        const response = await request(app).get('/api/jobs/student/63bae3f89b092eafea6ecb30').set('x-auth-token', tok);
        expect(response.statusCode).toBe(404);
        expect(response.body).toMatchObject({"errors": [{"msg": "No student found"}]});

    })
    test('a good request', async () => {
        Student.mockImplementation(()=>{
            return {
                findById: jest.fn()
            }
        })
        Student.findById.mockReturnValue(studentObject);
        Job.mockImplementation(()=>{
            return {
                find: jest.fn()
            }
        })
        Job.find.mockReturnValue([jobObject]);

        const userId = '63bae3f89b092eafea6ecb30';

        const payload = {
            user: {
                id: userId
            }
        }
        const tok = jwt.sign(payload, require('../configs/defualt.json').JWT_SECRET, {expiresIn: 360000})

        const response = await request(app).get('/api/jobs/student/63bae3f89b092eafea6ecb30').set('x-auth-token', tok);
        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toMatchObject(jobObject);

    })

})
