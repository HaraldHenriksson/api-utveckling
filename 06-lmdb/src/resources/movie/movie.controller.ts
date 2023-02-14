import { Request, Response } from 'express'
import Debug from 'debug'
import { Movie } from './movie.model'

const debug = Debug('lmdb:movie.controller')

/**
 * Get all movies
 */
export const index = async (req: Request, res: Response) => {
	try {
		// Find all movies
		const movies = await Movie.find()

		res.send({
			status: "success",
			data: movies,
		})

	} catch (err) {
		debug("Error thrown when finding movies", err)
		res.status(500).send({ status: "error", message: "Error thrown when finding movies" })
	}
}

/**
 * Get a movie
 *
 * GET /movies/:movieId
 */
export const show = async (req: Request, res: Response) => {
	const movieId = req.params.movieId
	try {
		// Find a single movie
		const movie = await Movie.find()

		// If no movie was found, report 404
		if (!movie) {
			return res.sendStatus(404)
		}

		res.send({
			status: "success",
			data: movie,
		})

	} catch (err) {
		debug("Error thrown when finding movie '%s': %o", movieId, err)
		res.status(500).send({ status: "error", message: "Error thrown when finding movie" })
	}
}

/**
 * Create a movie
 *
 * POST /movies
 */
export const store = async (req: Request, res: Response) => {
	try {
		// Create a new movie
		const movie = await new Movie(req.body).save()

		// Respond with newly created movie
		res.status(201).send({
			status: "success",
			data: movie,
		})

	} catch (err) {
		debug("Error thrown when creating movie", err)
		res.status(500).send({ status: "error", message: "Error thrown when finding movies" })
	}
}
