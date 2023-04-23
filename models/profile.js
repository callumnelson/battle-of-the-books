import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
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
    ref: 'Book',
    default: []
  }],
  finishedBooks: [{
    type: Schema.Types.ObjectId,
    ref: 'Book',
    default: []
  }],
  tickets: [{
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
    default: []
  }],
  ellStatus: {
    type: Boolean,
    default: false
  },
  swdStatus: {
    type: Boolean,
    default: false
  },
  role: {
    type: Number,
    required: true,
    //100 > student
    //200 > teacher
    //300 > admin
    default: 100
  },
  isSignedUp: {
    type: Boolean,
    default: false
  },
  district: {
    type: Schema.Types.ObjectId,
    ref: 'District'
  },
  school: {
    type: String,
  }
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
