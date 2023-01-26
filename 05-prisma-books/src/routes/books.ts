import express from 'express'
import prisma from '../prisma'
const router = express.Router()

router.get('/', async (req, res) => {
	try {
		const book = await prisma.book.findMany()
		res.send(book)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong"})
	}
})


// POST NEW BOOK
router.post('/', async (req, res) => {
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

export default router
