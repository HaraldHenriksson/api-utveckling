/**
*  Validation Rules for User
*/

import { body } from 'express-validator'
import prisma from '../prisma'

export const createUserRules = [
	// place validation rules here

	// name required + at least 3 chars
	body('name').isString().withMessage('has to be a string').bail().isLength({ min: 3, max: 191 }).withMessage('has to be 3-191 chars long'),

	// email required + valid email
	body('email').isEmail().custom(async value => {
		// check if a User with that emailalready exists
		const user = await prisma.user.findUnique({
			where:{
				email: value,
			}
		})

		if (user) {
			// user already exists, throw a erroe
			return Promise.reject("Email already exists")
		}
	}),

	// password required
	body('password').isString().bail().isLength({ min: 6 }),
]


export const updateUserRules = [
	body('name').optional().isString().bail().isLength({ min: 3 }),
	body('email').optional().isEmail(),
	body('password').optional().isString().bail().isLength({ min: 6 }),
]
