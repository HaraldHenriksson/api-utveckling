// EXPRESS SERVER


const express = require('express')

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

app.listen(port, () => {
	console.log(`Example listening on localhost ${port}`)
})
