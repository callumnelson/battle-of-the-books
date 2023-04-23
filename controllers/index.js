import { District } from '../models/district.js'
import { Profile } from '../models/profile.js'

const index = async (req, res) => {
  try {
    const districts = await District.find({})
    .populate('schools')
    //Only get profiles of teachers. Not admin or students
    const teachers = await Profile.find({'role': 200 })
    .populate('district', 'name')
    .populate('sections', 'name')
    res.render('index', { 
      title: 'Home',
      districts,
      teachers,
    })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

export {
  index,
}