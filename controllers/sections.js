import { Section } from '../models/section.js'
import { Profile } from '../models/profile.js'

const index = async (req, res) => {
  const teacher = await Profile.findById(req.user.profile._id)
  .populate('sections')
  res.render('sections/index', { 
    title: 'Sections Home',
    teacher 
  })
}

const create = async (req, res) => {
  
}

export {
  index,

}