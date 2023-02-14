import express from 'express'
const router = express.Router()
import { index, show, store } from './movie.controller'

/**
 * GET /movies
 */
router.get('/', index)

/**
 * GET /movies/:movieId
 */
router.get('/:movieId', show)

/**
 * POST /movies
 */
router.post('/', store)

export default router
