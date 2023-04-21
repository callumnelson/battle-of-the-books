import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  sections: [{
    type: Schema.Types.ObjectId, 
    ref: 'Section',
    default: []
  }],
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

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
