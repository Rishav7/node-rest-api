const router = require('express').Router()
const User = require('../models/User')

// bcrypt library
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
	try {
		//hashed password
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(req.body.password, salt)

		//generate user
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		})
		//save user
		const user = await newUser.save()
		res.status(200).json(user)
	} catch (err) {
		res.status(500).json(err)
	}
})

// login username

router.post('/login', async (req, res) => {
	try {
		//check user
		const user = await User.findOne({ email: req.body.email })
		!user && res.status(404).json('user not found')

		//check user password

		const validPassword = await bcrypt.compare(req.body.password, user.password)
		!validPassword && res.status(400).json('Wrong password')

		//send user details
		res.status(200).json(user)
	} catch (err) {
		res.status(500).json(err)
	}
})

module.exports = router
