const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

let User = require('../models/user.model')

// @route POST api/auth
// @desc Auth user
// @access Public
router.post('/', (req, res) => {
  const {email, password} = req.body;

  //simple validation
  if (!email || !password) {
    return res.status(400).json({msg: 'All fields are required'})
  }

  User.findOne({email})
    .then(user => {
      if (!user) return res.status(400).json({msg: 'User does not exist.'})

      //validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({msg: 'Invalid credentials.'})

          jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            {expiresIn: 3600},
            (err, token) => {
              if (err) throw  err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              })
            }
          )
        })
    })
});

// @route GET api/auth/user
// @desc get user data
// @access private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

module.exports = router