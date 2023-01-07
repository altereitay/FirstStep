const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const Student = require('../modules/StudentProfile')
const Employer = require('../modules/EmployerProfile')
const auth = require('../middleware/auth')
const mongoose = require('mongoose');
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: '../client/first-step-client/public',
    filename: function (req, file, cb) {
        cb(null, req.url + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}


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
            description,
            availability,
            certificateOfStudying,
            picture
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
 *@route    PUT api/profiles/student/:id
 *@desc     edit student profile
 *@access   Public
 */


router.put('/student/:id', [
        check('user', 'Please include an user id').notEmpty(),
        check('name', 'Please include profile name').notEmpty(),
        check('city', 'please include a city').notEmpty(),
        check('education', 'please include a education').notEmpty(),
        check('availability', 'please include a availability').notEmpty()
    ],
    async (req, res) => {
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
            description,
            availability,
            certificateOfStudying,
            picture
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
                return res.status(400).json({msg: 'profile dosent exist'})
            } else {
                profile = await Student.findOneAndUpdate({_id: req.params.id}, profileFields, {new: true});
                await profile.save();
                res.json({profile});
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
                return res.status(400).json({msg: 'user already have a profile'})
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
 *@route    PUT api/profiles/employer/:id
 *@desc     edit employer profile
 *@access   Public
 */

router.put('/employer/:id', [
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
                return res.status(400).json({msg: 'profile dosent exist'})
            } else {
                profile = await Employer.findOneAndUpdate({_id: req.params.id}, profileFields, {new: true});
                await profile.save();
                res.json({profile});
            }
        } catch (e) {
            console.error(e.message)
            res.status(500).send('server error')
        }

    });
/**
 *@route    GET api/profiles/employer
 *@desc     get all Employer profile
 *@access   Public
 */

router.get('/employer',
    async (req, res) => {
        try {
            const employer = await Employer.find();
            res.json(employer);
        } catch (e) {
            console.error(e.message)
            res.status(500).send('server error')
        }

    })

/**
 *@route    GET api/profiles/student
 *@desc     get all student profile
 *@access   Public
 */

router.get('/student',
    async (req, res) => {
        try {
            const student = await Student.find();
            res.json(student);
        } catch (e) {
            console.error(e.message)
            res.status(500).send('server error')
        }
    })

/**
 *@route    GET api/profiles/:id
 *@desc     get user profile
 *@access   Public
 */

router.get('/:id', auth, async (req, res) => {
    try {
        let profile = await Student.exists({user: mongoose.Types.ObjectId(req.params.id)})
        if (!profile) {
            profile = await Employer.find({user: req.params.id});
            if (!profile) {
                return res.status(400).json({msg: 'user dont have profile'})
            }
            const user = await Employer.findOne({user: mongoose.Types.ObjectId(req.params.id)});
            return res.json(user);

        }
        const user = await Student.findOne({user: mongoose.Types.ObjectId(req.params.id)});
        res.json(user);
    } catch (e) {

        console.error(e.message);
        res.status(500).send("server error ")
    }
});
/**
 *@route    GET api/profiles/
 *@desc     get all user profile
 *@access   Public
 */
router.get('/',
    async (req, res) => {
        try {
            const student = await Student.find();
            const employer = await Employer.find();
            const allProfile = student.concat(employer);
            res.json(allProfile);
        } catch (e) {
            console.error(e.message)
            res.status(500).send('server error')
        }

    })

/**
 *@route    POST api/profiles/students/certs/:id
 *@desc     Upload student certificate of studying
 *@access   Private
 */
router.post('/students/certs/:id', auth, async (req, res) => {
    const profile = await Student.findOne({user: req.params.id});
    if (!profile) {
        return res.status(404).json({errors: ['Profile Not Found']});
    }
    upload(req, res, async (err) => {
        if (err) {
            console.error(err)
            res.json({errors: [err]});
        } else {
            if (req.file === undefined) {
                res.json({errors: ['No File Selected!']});
            } else {
                profile.certificateOfStudying = '' + req.file.path;
                await profile.save();
                res.json({msg: 'File Uploaded!',});
            }
        }
    });
});
/**
 *@route    POST api/profiles/approve/:id
 *@desc     Aprrove user certificate
 *@access   Private
 */
router.put(`/approve/:id`, async (req, res) => {
    if (req.body.typeOfUser === "student") {
        const profile = await Student.findById(req.params.id)
        if (profile) {
            profile.isApproved = true
            await profile.save();
            return res.json({msg: 'Profile Approved'})
        }
    } else if (req.body.typeOfUser === "employer") {
        const profile = await Employer.findById(req.params.id)
        if (profile) {
            profile.isApproved = true
            await profile.save();
            return res.json({msg: 'Profile Approved'})
        }
    }
    res.status(404).json({errors:["Profile not found"]})
})

module.exports = router;
