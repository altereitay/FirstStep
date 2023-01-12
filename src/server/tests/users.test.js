const request = require('supertest');
const app = require('../app');
jest.mock('../modules/User');
const User = require('../modules/User');
jest.mock('../modules/StudentProfile');
const Student = require("../modules/StudentProfile");
jest.mock('../modules/EmployerProfile');
const Employer = require('../modules/EmployerProfile')
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

describe('POST /api/users', ()=>{
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
describe('DELETE api/users/:id',()=>{
    test('user doesnt exists',async()=> {
        User.mockImplementation(() => {
            return {
                findById: jest.fn()
            };
        });
        Student.mockImplementation(() => {
            return {
                find:jest.fn(),
                findOneAndDelete:jest.fn()
            };
        });
        Student.find.mockReturnValue(true);
        Student.findOneAndDelete.mockResolvedValue(true);
        User.findById.mockReturnValue(false);
        const response=await request(app).delete(`/api/users/${studentObject.user}`)
        expect(response.statusCode).toBe(404);
        expect(response.body).toMatchObject({msg:"User Doesn't exists"});
    })
    test('profile doesnt exists',async ()=>{
        Student.mockImplementation(() => {
            return {
                find:jest.fn()
            };
        });
        Employer.mockImplementation(() => {
            return {
                find:jest.fn()
            };
        });
        Student.find.mockReturnValue(false);
        Employer.find.mockReturnValue(false);
        const response=await request(app).delete(`/api/users/${studentObject._id}`)
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({msg: 'user dont have profile'});
    })
    test('user delete',async ()=>{
        Student.mockImplementation(() => {
            return {
                find:jest.fn()
            };
        });
        User.mockImplementation(() => {
            return {
                findById: jest.fn(),
                findOneAndDelete:jest.fn()
            };
        });

        Student.find.mockReturnValue(true);
        User.findById.mockReturnValue(true);
        User.findOneAndDelete.mockReturnValue(true);
        const response=await request(app).delete(`/api/users/${studentObject._id}`)
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({msg: 'User Deleted Successfully'});
    })

})



