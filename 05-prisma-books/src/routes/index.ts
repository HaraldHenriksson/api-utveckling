import express from "express"
import { body } from 'express-validator'
import authors from './authors'
import books from './books'
import publishers from './publishers'
import { register } from '../controllers/register_controller'

// instantiate a new router
const router = express.Router()

/**
 * GET /
 */
router.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

/**
 * /authors
 */
router.use('/authors', authors)

/**
 * /books
 */
router.use('/books', books)

/**
 * /publishers
 */
router.use('/publishers', publishers)

/**
 * /register
 */
router.post('/register',[
	// place validation rules here

	// name required + at least 3 chars
	body('name').isString().withMessage('has to be a string').bail().isLength({ min: 3, max: 191 }).withMessage('has to be 3-191 chars long'),

	// email required + valid email
	body('email').isEmail(),

	// password required
	body('password').isString().bail().isLength({ min: 6 }),

], register)


export default router
