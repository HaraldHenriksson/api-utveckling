import { model, Schema, Document } from 'mongoose'
import { IDirector} from '../director/director.model'

export interface IMovie extends Document {
	title: string,
	runtime: number | null,
	releaseYear?: number,
	genre: string[],
	watched?: Date,
	director?: IDirector['_id'],
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
		default: null,
		 //min: 1
		 validate(value: number) {
			if (value < 1 && value !== null) {
				throw new Error("Just because you thought the movie wat bad, it shouldn't have a zero or negative value")
			}
		 }
	},
	releaseYear: {
		 type: Number,
		 min: 1888,
		 max: new Date().getFullYear(),
		 default: new Date().getFullYear(),
	},
	genre: {
		type: [String],
		lowercase: true,
		default: [],
		// enum: ["action", "sci-fi", "bromance"],
	},
	watched: {
		type: Date,
		default() {
			return Date.now()
		}
	},
	director: {
		type: Schema.Types.ObjectId,
		ref: 'Director',
	}
})

export const Movie = model<IMovie>('Movie', MovieSchema)
