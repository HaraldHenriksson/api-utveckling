/**
 * JWT Authentification Middleware
 */

import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import Debug from 'debug'
import { JwtPayload } from '../../types'

const debug = Debug('prisma-books:basic')

/**
 *  Validate token
 */
export const validateToken = (req: Request, res: Response, next: NextFunction) => {
	debug("Hello from auth/jws!")

	// Make sure Authorization header exists, otherwise bail 🔴
	if (!req.headers.authorization) {
		debug("Authorization header missing")

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	// Split Authorixation header on ` `
	const [authSchema, token] = req.headers.authorization.split(" ")

	// Check that Authorization scheme is "Bearer", otherwise bail 🔴
	if (authSchema.toLocaleLowerCase() !== "bearer") {
		debug("Authorization schema isn't Bearer")

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	if (!process.env.ACCESS_TOKEN_SECRET) {
		return res.status(500).send({
			status: "error",
			message: "No access token secret defined",
		})
	}
	// Verify token and attach payload to request, otherwide bail 🔴
	try {
		const payload = (jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as unknown) as JwtPayload
		debug("Yay got 📦: %0", payload)

	// Attach User to Request 🤩
		req.token = payload

	} catch (err) {
		debug("Token failed verification", err)

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}




	// Pass request along
	next()
}
