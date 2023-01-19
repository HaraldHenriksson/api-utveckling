/**
 * Express Server
 */

// Require stuff
require('dotenv').config()
const express = require('express')
const _ = require('lodash')
const morgan = require('morgan')
const PORT = 3000

// Get the client
const mysql = require('mysql2/promise')

const connection = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
})

// Create a new Express app
const app = express()

// Parse any incoming JSON
app.use(express.json())

// Log information about all incoming requests using morgan
app.use(morgan('dev'))

// GET /
app.get('/', (req, res) => {
	res.send({
		message: "Oh, hi there ☺️",
	})
})

//GET movies
app.get('/movies', async (req, res) => {
	const db = await connection
	const [rows] = await db.query('SELECT * FROM imdb_movies')
	res.send(rows)
})

app.get('/movies/:movieId', async (req, res) => {

	const movieId = Number(req.params.movieId)

	const db = await connection
	const [rows] = await db.query(`SELECT * FROM imdb_movies WHERE id=?`, [movieId])

	// METHOD WITH RETURN CALLED GUARD CLAUSE
	if(!rows.length) {
		res.status(404).send({error: `Movie ${movieId} not found`});
		return //stops code from continue
    }

	res.send(rows[0]);
})

// POST
// Create a movie
app.post('/movies', async (req, res) => {
	console.log("Incoming!", req.body)
	const { title, genre, runtime, release_date } = req.body

	// STEP 1: Check that all required data is present, otherwise fail with HTTP 400
	if (typeof title !== "string" || typeof genre !== "string") {
		res.status(400).send({
			message: "Title or genre missing or not strings",
		})
		return
	}

	// STEP 2: Check that the incoming data is of the correct data type
	if (runtime && typeof runtime !== "number") {
		res.status(400).send({
			message: "runtime has to be a number",
		})
		return
	}

	const releaseDate = new Date(release_date)
	if (!releaseDate instanceof Date || isNaN(releaseDate)) {
		res.status(400).send({
			message: "release_date has to be a valid date",
		})
		return
	}

	const db = await connection
	const [result] = await db.query('INSERT INTO movies SET ?', {
		title,
		genre,
		runtime,
		release_date,
	})

	res.status(201).send({
		...req.body,
		id: result.insertId,
	})
})

app.patch('/movies/:movieId', async (req, res) => {
	const db = await connection

	try{
	const result = db.query('UPDATE movies SET ? WHERE id = ?', [req.body, req.params.movieId])
	} catch (err) {
		res.status(500).send({ message: "You send bad data?!"})
	}

	res.send(req.body)
})

app.delete('/movies/:movieId', async (req, res) => {
	const db = await connection

	try{
	const result = db.query('DELETE FROM movies WHERE id = ?', [req.params.movieId])
	} catch (err) {
		res.status(500).send({ message: "You try to delete already deleted movie?!"})
	}

	res.send({ message: "K."})
})

// Catch requests where a route does not exist
app.use((req, res) => {
	res.status(404).send({
		message: `Sorry, no route exists for ${req.method} ${req.path}`,
	})
})

// Start listening for incoming requests on port 3000
app.listen(PORT, () => {
	console.log(`🥳 Yay, server started on localhost:${PORT}`)
})
