/**
 * Register Controller
 */
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { JwtPayload } from '../types'
import prisma from '../prisma'
import { createUser, getUserByEmail } from '../services/user_service'
import debug from 'debug'

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
	const payload: JwtPayload = {
		sub: user.id, // sub = subject the token is issued for
		name: user.name,
		email: user.email
	}

	// sign payloag with secret and get acces token
	if (!process.env.ACCESS_TOKEN_SECRET) {
		return res.status(500).send({
			status: "fail",
			message: "No access token secret defined",
		})
	}
	const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_LIFETIME  ||  '4h',
	})

	if (!process.env.REFRESH_TOKEN_SECRET) {
		return res.status(500).send({
			status: "fail",
			message: "No access token secret defined",
		})
	}
	const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_LIFETIME  ||  '1d',
	})

	// respons with acess- and refresh-token
	res.send({
		status: "success",
		data: {
			access_token: access_token,
			refresh_token: refresh_token,
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

/**
 * Refresh token
 *
 * Recives a refresh-tole and issues a new access-token
 *
 * Authorization: Bearer <refresh-token>
 */
export const refresh = (req: Request, res: Response) => {
	// Make sure authorization header exists
	if (!req.headers.authorization) {
		debug("Authorization header missing")

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	// Split authorization header on ' '
	const [authSchema, token] = req.headers.authorization.split(" ")

	// Make sure Authorization schema is "Bearer"
	if (authSchema.toLowerCase() !== "bearer") {
		debug("Authorization schema isn't Bearer")

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	// Verify refresh-token and get refresh-token payload
	try {
		// Verify refresh-token using refresh-token secret
		const { sub, name, email } = (jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || "") as unknown) as JwtPayload

		// Construct access-token payload
		const payload: JwtPayload = {
			sub,
			name,
			email,
		}

		// remove `iat` and `exp` from payload
		delete payload.iat
		delete payload.exp

		// Issue a new access token
		if (!process.env.ACCESS_TOKEN_SECRET) {
			return res.status(500).send({
				status: "error",
				message: "No access token secret defined",
			})
		}
		const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '4h',
		})

		// Respond with new access token
		res.send({
			status: "success",
			data: {
				access_token,
			},
		})

	} catch (err) {
		 debug("Token failed verification")

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

}
