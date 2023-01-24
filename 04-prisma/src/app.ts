import express from "express"
import prisma from "./prisma" // importing the prisma instance we created
import morgan from "morgan"

const app = express()
app.use(express.json())
app.use(morgan('dev'))

/**
 * GET /
 */

// GET USERS
app.get('/users', async (req, res) => {
	try {
	const users = await prisma.users.findMany()
	res.send(users)
	} catch (err) {
		console.error(err)
		res.status(500).send( { message: "Something went wrong quering the database."})
	}
})


// GET PHONES
app.get('/phones', async (req, res) => {
	try {
	const phones = await prisma.phones.findMany()
	res.send(phones)
	} catch (err) {
		console.error(err)
		res.status(500).send( { message: "Something went wrong quering the database."})
	}
})

// app.get('/phones', async (req, res) => {
// 	try {
// 	const phones = await prisma.users.findUnique()
// 	res.send(phones)
// 	} catch (err) {
// 		console.error(err)
// 		res.status(500).send( { message: "Something went wrong quering the database."})
// 	}
// })

// CREATE A NEW PHONE
app.post('/phones', async (req, res) => {
	try {
		const phone = await prisma.phones.create({
			data: req.body,
		})

		res.status(201).send(phone)

	} catch (err) {
		res.status(500).send( { message: "Something went wrong creating record database."})
	}
})

// GET USER WITH ID
app.get('/users/:userId', async (req, res) => {
	const userId = Number(req.params.userId)

	try {
	const user = await prisma.users.findUniqueOrThrow({
		where: {
			id: userId,
		},
		include: {
			phones: true,
		},
	})
	res.send(user)
	} catch (err) {
		res.status(404).send( { message: "User not found."})
	}

})


// GET PHONE WITH ID
app.get('/phone/:phoneId', async (req, res) => {
	const phoneId = Number(req.params.phoneId)

	try {
	const phone = await prisma.phones.findUniqueOrThrow({
		where: {
			id: phoneId,
		},
		include: {
			user: true,
		}
	})
	res.send(phone)
	} catch (err) {
		res.status(404).send( { message: "User not found."})
	}

})


// CREATE USER
app.post('/users', async (req, res) => {
	try {
		const user = await prisma.users.create({
			data: req.body,
		})

		res.status(201).send(user)

	} catch (err) {
		res.status(500).send( { message: "Something went wrong creating record database."})
	}
})

export default app
