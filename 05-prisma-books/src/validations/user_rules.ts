/**
*  Validation Rules for User
*/

import { body } from 'express-validator'

export const createUserRules = [
	// place validation rules here

	// name required + at least 3 chars
	body('name').isString().withMessage('has to be a string').bail().isLength({ min: 3, max: 191 }).withMessage('has to be 3-191 chars long'),

	// email required + valid email
	body('email').isEmail(),

	// password required
	body('password').isString().bail().isLength({ min: 6 }),
]


export const updateUserRules = [
	body('name').optional().isString().bail().isLength({ min: 3 }),
	body('email').optional().isEmail(),
	body('password').optional().isString().bail().isLength({ min: 6 }),
]
