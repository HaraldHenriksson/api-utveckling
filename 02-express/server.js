// EXPRESS SERVER


const express = require('express')
const oneliners = require('./data/oneliners.json')
const users = require('./data/users.json')
const _ = require('lodash')
const app = express()
const morgan = require('morgan')
const port = 3000
const now = new Date()

// Parse any incoming JSON
app.use( express.json() )

// Middleware with morgan
app.use( morgan('dev'))

// Log information about all incoming request. Middleware
// app.use( (req, res, next) => {
// 	console.log("Someone requested something!")
// 	// console.log(`Method: ${req.method}`)
// 	// console.log(`Path: ${req.path}`)
// 	console.log(`${now.toLocaleString()} Method: ${req.method} Path: ${req.path}`)

// 	// make code continue
// 	next()
// })

app.get('/', (req, res) => {
	// res.send('Hello World 🌏')
	res.send({
		message: "Hello World 🌏",
		lolcats: "are funny"})
})

app.post('/', (req, res) => {
	res.send("I'm no mailbox 😡")
})

app.get('/coffee', (req, res) => {
	res.send('Coffee ☕️')
})

// GET random joke
// app.get('/joke', (req, res) => {

// 	const i = Math.floor(Math.random() * oneliners.length)
// 	const joke = oneliners[i]

// 	res.send({
// 		Joke: joke
// 	})
// })

// GET reandom joke with lodash
app.get('/joke', (req, res) => {

	// const i = _.random(0, oneliners.length - 1)
	// const joke = oneliners[i]

	const joke = _.sample(oneliners)

	res.send({
		Joke: joke
	})
})
// GET /users
// List all users
app.get('/users', (req, res) => {
	console.log("query-string:", req.query)
	res.send(users)
})

// POST /Users
// Create a new user
app.post('/users', (req, res) => {
	console.log(req.body)
})

// GET /users/:userId
app.get('/users/:userId', (req, res) => {
	const userId = Number(req.params.userId)


	// Find user in users array
	const user = users.find(user => user.id === userId)

	// Send user as response
	if(user) {
        res.send(user);
    } else {
        res.status(404).send({error: 'User not found'});
    }
})

// Catch requests where a route does not exist
// app.use( (req, res) => {
// 	res.status(404).send({
// 		message: `Sorry, no route exists for ${req.method} ${req.path}`
// 	})
// })

app.listen(port, () => {
	console.log(`Server started on localhost ${port}🥳`)
})
