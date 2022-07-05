const express = require('express')
const app = express()

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')

//routes
const userRoutes = require('./routes/users.js')
const authRoutes = require('./routes/auth')

dotenv.config()

// mongoose.connect(
// 	process.env.MONGO_URL,
// 	{
// 		useNewUrlParser: true,

// 		useUnifiedTopology: true,
// 	},
// 	() => {
// 		console.log('connected to mongoDB')
// 	}
// )
mongoose.connect(
	process.env.MONGO_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) console.log(err)
		else console.log('mongdb is connected')
	}
)

// middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

// // //crud operations
app.get('/', (req, res) => {
	res.send('welcome to homepage')
})

// userRoutes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.listen(8800, () => {
	console.log('Server is running at port 8800')
})
