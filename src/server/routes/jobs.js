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
            const exists = await Job.exists({_id: req.params.id})
            if (!exists) {
                return res.status(404).json({errors: ["job doesn't exists"]})
            }
            const job = await Job.findOneAndUpdate({_id: req.params.id}, jobFields, {new: true})
            await job.save();
            res.json({job});
        } catch (e) {
            console.error(e.message)
            res.status(500).send('server error')
        }
    })

/**
 *@route    GET api/jobs/:id
 *@desc     get a jobs by employer id
 *@access   Private
 */
router.get('/:id', [auth],
    async (req, res) => {
        try {
            let employer = await Employer.findById(req.params.id);
            if (!employer) {
                return res.status(404).json({
                    errors: [{msg: 'No employer found'}]
                })
            }
            const jobs = await Job.find({profile: req.params.id});
            res.json(jobs);
        } catch (e) {
            console.error(e.message)
            res.status(500).send('server error')
        }
    })

/**
 *@route    DELETE api/jobs/:id
 *@desc     delete a job offer
 *@access   Private
 */
router.delete('/:id', [auth
    ],
    async (req, res) => {
        try {
            const exists = await Job.findById(req.params.id)
            if (!exists) {
                return res.status(404).json({msg: "Job Doesn't exists"});
            }
            await Job.findOneAndDelete({_id: req.params.id});
            res.json({msg: 'Job Deleted Successfully'});
        } catch (e) {
            console.error(e.message)
            res.status(500).send('server error')
        }
    })

/**
 *@route    GET api/jobs/
 *@desc     get all jobs based on params
 *@access   Public
 */
router.get('/', [],
    async (req, res) => {
        let {
            business,
            percentageOfJob,
            location,
            requiredSkills,
            jobType,
            requiredDays
        } = req.query
        try {
            let params = {}
            if (business) {
                params.business = business;
            }

            if (percentageOfJob) {
                params.percentageOfJob = percentageOfJob;
            }

            if (location) {
                params.location = location;
            }

            if (requiredSkills) {
                params.requiredSkills = requiredSkills;
            }

            if (jobType) {
                params.jobType = jobType;
            }

            if (requiredDays) {
                for (const day of requiredDays){
                    let mongoFormat = `requiredDays.${day}`
                    params[mongoFormat] = true;
                }
            }

            const jobs = await Job.find(params);
            res.json(jobs);
        } catch (e) {
            console.error(e.message)
            res.status(500).send('server error')
        }
    })
/**
 *@route    GET api/jobs/applied/:userId
 *@desc     Student get all jobs that applied for
 *@access   Public
 */
router.get('/applied/:userId', [],
    async (req, res) => {
        try {
            const jobs = await Job.find();
            let appliedJobs = []

            for (const job of jobs) {
                if (job.appliedStudents.find(element => element === req.params.userId)) {
                    appliedJobs.push(job)
                }
            }
            res.json(appliedJobs);
        } catch (e) {
            console.error(e.message)
            res.status(500).send('server error')
        }
    })
/**
 *@route    GET api/jobs/student/:id
 *@desc     get all jobs if its relevant by id
 *@access   Private
 */
router.get('/student/:id', [auth],
    async (req, res) => {
        try {
            let student = await Student.findById(req.params.id);
            if (!student) {
                return res.status(404).json({
                    errors: [{msg: 'No student found'}]
                })
            }
            let field = student.education[0].degree;
            const jobs = await Job.find({jobType: field});
            res.json(jobs);
        } catch (e) {
            console.error(e.message)
            res.status(500).send('server error')
        }
    })
/**
 *@route    GET api/jobs/aplication/:id
 *@desc     get all students that apply to job
 *@access   Private
 */
router.get('/aplication/:id', [auth],
    async (req, res) => {
        try {
            let job = await Job.findById(req.params.id);

            if (!job) {
                return res.status(404).json({
                    errors: [{msg: 'No job found'}]
                })
            }
            const newstudents = []
            for (const aplication of job.appliedStudents) {
                const student = await Student.findOne({user: aplication})
                if (student) {
                    newstudents.push(student)
                }
            }
            res.json(newstudents);
        } catch (e) {
            console.error(e.message)
            res.status(500).send('server error')
        }
    })

/**
 *@route    PUT api/jobs/apply/:id
 *@desc     adding a new student to applied students
 *@access   Public
 */
router.put('/apply/:id', [
        check('userId', '').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: [{msg: "user could not applied"}]})
        }
        try {
            const exists = await Job.exists({_id: req.params.id})
            if (!exists) {
                return res.status(404).json({errors: ["job doesn't exists"]})
            }
            const student = await Student.exists({user: req.body.userId})
            if (!student) {
                return res.status(404).json({errors: ["student doesn't exists"]})
            }
            const job = await Job.findById(req.params.id)
            job.appliedStudents.push(req.body.userId)
            await job.save();
            res.json({msg: "Applied successfully"});
        } catch (e) {
            console.error(e.message)
            res.status(500).send('server error')
        }
    })


module.exports = router;