const exprees = require('express');
const router = exprees.Router();
const auth = require('../middleware/auth');
const Employer = require('../modules/EmployerProfile');
const Job = require('../modules/JobOffer');
const {check, validationResult} = require("express-validator");

/**
 *@route    POST api/jobs
 *@desc     add a new job offer
 *@access   Public
 */
router.post('/', [
        check('jobTitle', 'please include a job name').exists(),
        check('business', 'please include a business name').exists(),
        check('description', 'please include a job description').exists(),
        check('percentageOfJob', 'please include a percentage of job').exists(),
        check('location', 'please include a job location').exists(),
        check('requiredSkills', 'please include the required skills for the job').exists(),
        check('jobType', 'please include type of the job').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const {
            jobTitle,
            business,
            description,
            percentageOfJob,
            profile,
            location,
            requiredSkills,
            jobType,
            picture,
            requiredDays
        } = req.body;
        try {
            let employer = await Employer.findOne({_id: profile});
            if (!employer) {
                return res.status(404).json({
                    errors: [{msg: 'No employer found'}]
                })
            }
            const jobFields = {
                profile,
                jobTitle,
                business,
                description,
                percentageOfJob,
                location,
                requiredSkills,
                jobType
            }
            if (picture) {
                jobFields.picture = picture;
            }
            if (requiredDays) {
                jobFields.requiredDays = requiredDays;
            }
            const job = new Job(jobFields);
            await job.save();
            res.json({job});
        } catch (e) {
            console.error(e.message)
            res.status(500).send('server error')
        }
    })

/**
 *@route    PUT api/jobs/:id
 *@desc     update a job offer
 *@access   Public
 */
router.put('/:id', [
        check('jobTitle', 'please include a job name').exists(),
        check('business', 'please include a business name').exists(),
        check('description', 'please include a job description').exists(),
        check('percentageOfJob', 'please include a percentage of job').exists(),
        check('location', 'please include a job location').exists(),
        check('requiredSkills', 'please include the required skills for the job').exists(),
        check('jobType', 'please include type of the job').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const {
            jobTitle,
            business,
            description,
            percentageOfJob,
            profile,
            location,
            requiredSkills,
            jobType,
            picture,
            requiredDays
        } = req.body;
        try {


            const jobFields = {
                profile,
                jobTitle,
                business,
                description,
                percentageOfJob,
                location,
                requiredSkills,
                jobType
            }
            if (picture) {
                jobFields.picture = picture;
            }
            if (requiredDays) {
                jobFields.requiredDays = requiredDays;
            }
            const job = await Job.findOneAndUpdate({_id:req.params.id},jobFields,{new:true})
            //const job = await Job.findById({profile:req.params.id})
            console.log(job);
            await job.save();
            res.json({job});
        } catch (e) {
            console.error(e.message)
            res.status(500).send('server error')
        }
    })

/**
 *@route    GET api/jobs/:id
 *@desc     add a new job offer
 *@access   Public
 */
router.get('/:id', [auth
    ],
    async (req, res) => {
        try {
            let employer = await Employer.findById(req.params.id);
            if (!employer) {
                return res.status(404).json({
                    errors: [{msg: 'No employer found'}]
                })
            }
            const jobs = await Job.find({profile:req.params.id});
            res.json(jobs);
        } catch (e) {
            console.error(e.message)
            res.status(500).send('server error')
        }
    })

module.exports = router;