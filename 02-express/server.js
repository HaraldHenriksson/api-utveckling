// EXPRESS SERVER


const express = require('express')

const app = express()

const port = 3000

app.get('/', (req, res) => {
	res.send('Hello World🌏')
})

app.get('/coffee', (req, res) => {
	res.send('Coffee☕️')
})

app.listen(port, () => {
	console.log(`Example listening on localhost ${port}`)
})
