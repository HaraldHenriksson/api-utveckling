/**
 * Pfofile Router
 */

import express from 'express'
import { getProfile } from '../controllers/profile_controller'
const router = express.Router()

/**
 * Get /profile
 */
router.get('/', getProfile)

/**
 * PATCH /profile
 */

/**
 * GET /profile/bookd
 */

/**
 * POST /profile/books
 */

/**
 * DELETE /profile/books/:bookId
 */


export default router
