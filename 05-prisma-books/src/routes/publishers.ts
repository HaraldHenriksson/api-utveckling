import express from 'express'
import prisma from '../prisma'
const router = express.Router()

// GET / PUBLISHERS

router.get('/', async (req, res) => {
	try {
		const publisher = await prisma.publisher.findMany()
		res.send(publisher)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong"})
	}
})

// GET / PPUBLUSHER / PUBLISHERID
router.get('/:publisherId', async (req, res) => {
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

router.post('/', async (req, res) => {
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


export default router
