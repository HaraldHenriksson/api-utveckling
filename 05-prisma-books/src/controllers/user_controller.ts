/**
 * Register Controller
 */
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import prisma from '../prisma'
import { createUser, getUserByEmail } from '../services/user_service'

/**
 * Login a user
 */
export const login = async (req: Request, res: Response) => {
	// destructure email and password from request body
	const { email, password } = req.body

	// find user with email, otherwise bail 🛑
	const user = await getUserByEmail(email)
if (!user) {
	return res.status(401).send({
		status: "fail",
		message: "Authorization required"
	})
}

	// verify credentioals against hash against credentials, otherwise bail 🛑
	const result = await bcrypt.compare(password, user.password)
	if (!result) {
		return res.status(401).send({
			status: "fail",
			message: "Authorization required"
		})
	}

	// construct jqt-payload
	const payload = {
		sub: user.id, // sub = subject the token is issued for
		name: user.name,
	}

	// sign payloag with secret and get acces token
	if (!process.env.ACCESS_TOKEN_SECRET) {
		return res.status(500).send({
			status: "fail",
			message: "No access token secret defined",
		})
	}
	const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)

	// respons with acess-tokem
	res.send({
		status: "success",
		data: {
			access_token: access_token,
		}
	})
}

/**
 * Register a new user
 */
export const register = async (req: Request, res: Response) => {
	// Validate incoming data
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}

	// Get only the validated data from the request
	const validatedData = matchedData(req)

	// Calculate a hash + salt for the password
	const hashedPassword = await bcrypt.hash(validatedData.password, Number(process.env.SALT_ROUNDS || 10))

	validatedData.password = hashedPassword

	// store the user in the database
	try {
		const user = await createUser({
			name: validatedData.name,
			email: validatedData.email,
			password: validatedData.password,

		})

	// Resopns with 201 Created + status success
	res.status(201).send({ "status": "success", "data": validatedData })

	} catch (err) {
		return res.status(500.).send({ status: "error", message: "could not create use in database"})
	}
}
