import mongoose from 'mongoose'

const Schema = mongoose.Schema

const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  section: {
    type: Schema.Types.ObjectId,
    ref: 'Section'
  },
  currentBooks: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }],
  finishedBooks: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }],
  ellStatus: {
    type: Boolean,
    default: false
  },
  swdStatus: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const Student = mongoose.model('Student', studentSchema)

export {
  Student
}
