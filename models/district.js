import mongoose from 'mongoose'

const Schema = mongoose.Schema

const districtSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  schools: [{
    type: String,
  }]
}, {
  timestamps: true
})

const District = mongoose.model('District', districtSchema)

export {
  District
}