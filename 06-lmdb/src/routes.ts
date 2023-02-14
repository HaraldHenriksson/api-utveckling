import express from "express"
import { Movie } from './resources/movie/movie.model'
import movieRouter from './resources/movie/movie.router'

// instantiate a new router
const router = express.Router()

/**
 * GET /
 */
router.get('/', async (req, res) => {
	// find all movies
	const movies = await Movie.find()

	res.send({
		message: "I AM MOVIE-DB-API, GIVES POPCORN",
		movies: movies,
	})
})

/**
 * /movies
 */
router.use('/moves', movieRouter)

export default router
