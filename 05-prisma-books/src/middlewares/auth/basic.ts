/**
 * HTTP Basic Authentification Middleware
 */

import { Request, Response, NextFunction } from 'express'
import Debug from 'debug'

const debug = Debug('prisma-book:basic')

export const basic = (req: Request, res: Response, next: NextFunction) => {
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

	// Verify hash against credentials, otherwide bail 🔴

	// Attach user to Request 🤩

	// Nothing to se here, move along.. ✅

	next()
}
