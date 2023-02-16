import { model, Schema, Document } from 'mongoose'

export interface IMovie extends Document {
	title: string,
	runtime?: number,
	releaseYear?: number,
	genre?: string,
}

const MovieSchema: Schema = new Schema<IMovie>({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		unique: true,
	},
	runtime: {
		type: Number,
		 min: 1
	},
	releaseYear: {
		 type: Number,
		 min: 1888,
		 max: new Date().getFullYear(),
		 default: new Date().getFullYear(),
	},
	genre: {
		type: String,
		lowercase: true,
		enum: ["action", "sci-fi", "bromance"],
	},
})

export const Movie = model<IMovie>('Movie', MovieSchema)
