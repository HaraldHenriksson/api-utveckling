/**
 * HTTP Basic Authentification Middleware
 */

import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'
import Debug from 'debug'
import { getUserByEmail } from '../../services/user_service'

const debug = Debug('prisma-books:basic')

export const basic = async (req: Request, res: Response, next: NextFunction) => {
	debug("Hello from auth/basic!")

	// Make sure Authorization Hearer exists, otherwise bail 🔴
	debug(req.headers)
	if(!req.headers.authorization) {
		debug("Authorization header missing")

		return res.status(404).send({
			status: "fail",
			data: "Atuorization required",
		})
	}

	// Split Authorization header
	debug("Authorization header: %0", req.headers.authorization)
	const [authSchema, base64Payload] = req.headers.authorization.split(" ")

	// Check that Authorixation sceme is "basic", otherwise bail 🔴
	if (authSchema.toLowerCase() !== "basic") {
		debug("Authorization schema isn't Basic")

		return res.status(404).send({
			status: "fail",
			data: "Atuorization required",
		})
	}

	// Decode credintials from base64 => ascii
	const decodePayload = Buffer.from(base64Payload, "base64").toString("ascii")
	debug("decodedPayload:", decodePayload)
	// decodedPayload = "jn@thehiveresistance.com:abc123"

	// Split decoded payload on `:`
	const [email, password] = decodePayload.split(":")

	// Get user form database, otherwise bail 🔴
	const user = await getUserByEmail(email)
	if (!user) {
		debug("User %s does not exist", email)

		return res.status(404).send({
			status: "fail",
			data: "Atuorization required",
		})
	}

	// Verify hash against credentials, otherwide bail 🔴
	const result = await bcrypt.compare(password, user.password)
	if (!result) {
		debug("Password for user %s didn't match", email)

		return res.status(404).send({
			status: "fail",
			data: "Atuorization required",
		})
	}
	debug("Password for user %s was correct", email)



	// Attach user to Request 🤩

	// Nothing to se here, move along.. ✅

	next()
}
