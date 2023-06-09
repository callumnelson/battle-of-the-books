import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  authors: [{
    type: String,
    required: true
  }],
  pageCount: {
    type: Number,
    required: true
  },
  readers: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }],
  publisher: {
    type: String
  },
  publishedDate: {
    type: Date
  },
  description: {
    type: String
  },
  averageRating: {
    type: Number
  },
  ratingsCount: {
    type: Number
  },
  categories: [{
    type: String, 
  }],
  googleId: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
})

const Book = mongoose.model('Book', bookSchema)

export {
  Book
}