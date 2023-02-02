/**
 * Register Controller
 */
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import prisma from '../prisma'
import { createUser } from '../services/user_service'

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
