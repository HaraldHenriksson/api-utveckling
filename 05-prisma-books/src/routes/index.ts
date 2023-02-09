import express from "express"
import { body } from 'express-validator'
import authors from './authors'
import books from './books'
import profile from './profile'
import publishers from './publishers'
import { login, refresh, register } from '../controllers/user_controller'
import { createUserRules } from "../validations/user_rules"
//import { basic } from "../middlewares/auth/basic"
import { validateToken } from "../middlewares/auth/jwt"

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
 * /profile
 */
router.use('/profile', validateToken, profile)

/**
 * /publishers
 */
router.use('/publishers', publishers)

/**
 * POST /login
 */
router.use('/login', login)

/**
 * POST /refresh
 */
router.post('/refresh', refresh)

/**
 * /register
 */
router.post('/register', createUserRules, register)


export default router
