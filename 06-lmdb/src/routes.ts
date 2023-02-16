import express from "express"
import { Movie } from './resources/movie/movie.model'
import movieRouter from './resources/movie/movie.router'
import directorRouter from './resources/director/director.router'
import personRouter from "./resources/person/person.router"

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
 * /people
 */
router.use('/people', personRouter)

/**
 * /movies
 */
router.use('/movies', movieRouter)

/**
 * /directors
 */
router.use('/directors', directorRouter)

export default router
