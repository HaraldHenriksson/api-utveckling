// EXPRESS SERVER


const express = require('express')

const oneliners = require('./data/oneliners.json')

const app = express()

const port = 3000

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
app.get('/joke', (req, res) => {

	const i = Math.floor(Math.random() * oneliners.length)
	const joke = oneliners[i]

	res.send({
		Joke: joke
	})
})

app.listen(port, () => {
	console.log(`Example listening on localhost ${port}`)
})
