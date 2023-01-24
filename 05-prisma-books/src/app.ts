import express from "express"
import prisma from "./prisma" // importing the prisma instance we created
import morgan from "morgan"

const app = express()
app.use(express.json())
app.use(morgan('dev'))

/**
 * GET /
 */
app.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

app.get('/authors', async (req, res) => {
	try {
		const authors = await prisma.author.findMany()
		res.send(authors)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong"})
	}
})

app.get('/books', async (req, res) => {
	try {
		const book = await prisma.book.findMany()
		res.send(book)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong"})
	}
})

export default app
