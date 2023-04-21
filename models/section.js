import mongoose from 'mongoose'

const Schema = mongoose.Schema

const sectionSchema = new Schema({
  teachers: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  coTeachers: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  name: {
    type: String,
    required: true
  },
  schoolYear: {
    type: Number,
    required: true,
    default: function(){
      let today = new Date()
      return today.getMonth() < 6 ? today.getFullYear() : (today.getFullYear() + 1) 
    }
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  gradeLevel: {
    type: String,
    required: true,
    enum: ['K', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']
  },
  students: {
    type: [{
      type: Schema.Types.ObjectId, 
      ref: 'Profile',
      default: []
    }]
  },
  waitlist: {
    type: [{
      type: Schema.Types.ObjectId, 
      ref: 'Profile',
      default: []
    }]
  }
}, {
  timestamps: true
})

const Section = mongoose.model('Section', sectionSchema)

export {
  Section
}
