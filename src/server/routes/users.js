const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../modules/User')
/**
 *@route    POST api/users
 *@desc     register a new user
 *@access  Public
 */

router.post('/', [
        check('email', 'Please include a valid email').isEmail(),
        check('typeOfUser', 'Please include type of user').notEmpty(),
        check('password', 'please enter a password longer then 6 characters').isLength({min: 6})
    ],
    async (req, res)=>{
         // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {email, password, typeOfUser} = req.body;
        try{
            // console.debug(email, password, typeOfUser)
            let user = await User.findOne({email});
            if (user){
                return  res.status(400).json({
                    errors:[{msg: 'User exist'}]
                })
            }

            user = new User({typeOfUser, email, password})

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt)

            await user.save()

            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload,
                require('../configs/defualt.json').JWT_SECRET,
                {expiresIn: 360000,},
                (err, token)=>{
                    if (err){
                        throw err;
                    }
                    res.json({token})
                })
        }catch (e) {
            console.error(e.message)
            res.status(500).send('server error')
        }

    });

module.exports = router;

//TODO: delete this