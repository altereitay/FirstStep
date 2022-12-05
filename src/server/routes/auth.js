const exprees = require('express');
const router = exprees.Router();
const auth = require('../middleware/auth');
const User = require('../modules/User');

router.get('/', auth, async (req, res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }catch (e) {
        console.error(e.message)
        res.status(500).send('server error')
    }
});

module.exports = router;