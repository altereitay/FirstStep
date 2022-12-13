const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const Student = require('../modules/StudentProfile')
const Employer = require('../modules/EmployerProfile')
const auth = require('../middleware/auth')
/**
 *@route    POST api/profiles/student
 *@desc     add a new student profile
 *@access   Public
 */


router.post('/student', [
        check('user', 'Please include an user id').notEmpty(),
        check('name', 'Please include profile name').notEmpty(),
        check('city', 'please include a city').notEmpty(),
        check('education', 'please include a education').notEmpty(),
        check('availability', 'please include a availability').notEmpty()
    ],
    async (req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const {
            user,
            name,
            dateOfBirth,
            city,
            education,
            skills,
            picture,
            description,
            availability,
            certificateOfStudying
        } = req.body;

        const profileFields = {
            user,
            name,
            dateOfBirth,
            city,
            education,
            availability
        }

        if (skills) {
            profileFields.skills = skills;
        }
        if (picture) {
            profileFields.picture = picture;
        }
        if (description) {
            profileFields.description = description;
        }
        if (certificateOfStudying) {
            profileFields.certificateOfStudying = certificateOfStudying;
        }
        try {
            let profile = await Student.exists({user});
            if (!profile) {
                profile = await Employer.exists({user});
            }
            if (profile) {
                return res.status(400).json({msg: 'user already have a profile'})
            } else {
                profile = new Student(profileFields);
                await profile.save();
                res.json(profile);
            }
        } catch (e) {
            console.error(e.message)
            res.status(500).send('server error')
        }

    });

/**
 *@route    POST api/profiles/employer
 *@desc     add a new employer profile
 *@access   Public
 */

router.post('/employer', [
        check('user', 'Please include an user id').notEmpty(),
        check('name', 'Please include profile name').notEmpty(),
        check('business', 'please include business name').notEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const {
            user,
            name,
            business,
            picture,
            description,
        } = req.body;

        const profileFields = {
            user,
            name,
            business,
            picture,
            description
        }
        if (picture) {
            profileFields.picture = picture;
        }
        if (description) {
            profileFields.description = description;
        }

        try {
            let profile = await Employer.exists({user});
            if (!profile) {
                profile = await Student.exists({user});
            }
            if (profile) {
                return res.status(400).json({msg:'user already have a profile'})
            } else {
                profile = new Employer(profileFields);
                await profile.save();
                res.json(profile);
            }
        } catch (e) {
            console.error(e.message)
            res.status(500).send('server error')
        }

    });
/**
 *@route    GET api/profile/:id
 *@desc     get user profile
 *@access   Public
 *///
router.get('/:id', auth, async (req, res) => {
    try {

        let profile = await Student.exists({user: req.params.id})
        if (!profile) {
            profile = await Employer.exists({user: req.params.id});
            const user = await Employer.find({user: req.params.id});

            return res.json(user);
            if (!profile) {
                return res.status(400).json({msg: 'user dont have profile'})
            }
        }
        const user = await Student.find({user: req.params.id});
        res.json(user);
    } catch (e) {

        console.error(e.message);
        res.status(500).send("server error ")
    }
});


module.exports = router;
