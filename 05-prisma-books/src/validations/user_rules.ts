/**
*  Validation Rules for User
*/

import { body } from 'express-validator'
import prisma from '../prisma'
import { getUserByEmail } from '../services/user_service'

export const createUserRules = [
	// place validation rules here

	// name required + at least 3 chars
	body('name').isString().withMessage('has to be a string').bail().isLength({ min: 3, max: 191 }).withMessage('has to be 3-191 chars long'),

	// email required + valid email
	body('email').isEmail().custom(async value => {
		// check if a User with that emailalready exists
		const user = await getUserByEmail(value)

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
	body('email').optional().isEmail().custom(async (value: string) => {
		// check if a User with that email already exists
		const user = await getUserByEmail(value)

		if (user) {
			// user already exists, throw a hissy-fit
			return Promise.reject("Email already exists")
		}
	}),
	body('password').optional().isString().bail().isLength({ min: 6 }),
]
