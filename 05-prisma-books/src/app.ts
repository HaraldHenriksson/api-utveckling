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

// POST AUTHOR

app.post('/authors', async (req, res) => {
	try {
		const author = await prisma.author.create({
			data: {
				name: req.body.name,
				birthdate: req.body.birthdate,
			}
		})

		res.status(201).send(author)

	} catch (err) {
		res.status(500).send({ message: "Something went wrong"})
	}
})

// GET AUTHOR

app.get('/authors', async (req, res) => {
	try {
		const authors = await prisma.author.findMany({
			include: {
				books: true,
			}
		})
		res.send(authors)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong" })
	}
})

// POST /AUTHOR/:AUTHORID/BOOKS

app.post('/authors/:authorId/books', async (req, res) => {
	try {
		const result = await prisma.author.update({
			where: {
				id: Number(req.params.authorId),
			},
			data: {
				books: {
					connect: {
						id: req.body.bookId,
					}
				}
			}
		})
		res.send(result)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong"})
	}
})


// GET BOOKS

app.get('/books', async (req, res) => {
	try {
		const book = await prisma.book.findMany()
		res.send(book)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong"})
	}
})


// POST NEW BOOK
app.post('/books', async (req, res) => {
	try {
		const book = await prisma.book.create({
			data: {
				title: req.body.title,
				pages: req.body.pages,
				isbn: req.body.isbn,
				publisherId: req.body.publisherId
			}
		})

		res.status(201).send(book)

	} catch (err) {
		res.status(500).send({ message: "Something went wrong"})
	}
})


// GET / PUBLISHERS

app.get('/publishers', async (req, res) => {
	try {
		const publisher = await prisma.publisher.findMany()
		res.send(publisher)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong"})
	}
})

// GET / PPUBLUSHER / PUBLISHERID
app.get('/publisher/:publisherId', async (req, res) => {
	const publisherId = Number(req.params.publisherId)
	try {
		const publisher = await prisma.publisher.findUniqueOrThrow({
			where: {
				id: publisherId,
			},
			include: {
				books: true,
			}
		})
		res.send(publisher)
	} catch (err) {
		res.status(404).send({ message: "Not found"})
	}
})


// POST / publishers

app.post('/publishers', async (req, res) => {
	try {
		const publisher = await prisma.publisher.create({
			data: {
				name: req.body.name,
			}
		})

		res.status(201).send(publisher)

	} catch (err) {
		res.status(500).send({ message: "Something went wrong"})
	}
})

export default app
