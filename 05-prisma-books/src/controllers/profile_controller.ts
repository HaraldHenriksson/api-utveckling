/**
 * Profile Controller
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import prisma from '../prisma'
const debug = Debug("prisma-books:profile_controller")

/**
 * Get the authenticated user's profile
 */
export const getProfile = async (req: Request, res: Response) => {

	debug("WHO DIS??", req.user)
	res.send({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email,
	})
}

/**
 * Update the authenticated user's profile
 */
export const updateProfile = async (req: Request, res: Response) => {
}
