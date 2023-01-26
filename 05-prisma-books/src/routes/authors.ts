
// Handles all /authors routes

import express from 'express'
import prisma from '../prisma'
const router = express.Router()

router.get('/', async (req, res) => {
	try {
		const authors = await prisma.author.findMany()
		res.send(authors)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong"})
	}
})

// POST AUTHOR

router.post('/', async (req, res) => {
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

// GET AUTHO/
router.get('/', async (req, res) => {
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

router.post('/:authorId/books', async (req, res) => {
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

export default router
