import mongoose from 'mongoose'

const Schema = mongoose.Schema

const districtSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const District = mongoose.model('District', districtSchema)

export {
  District
}