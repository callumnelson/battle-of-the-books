import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: false
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  }
}, {
  timestamps: true
})

const Ticket = mongoose.model('Ticket', ticketSchema)

export {
  Ticket
}