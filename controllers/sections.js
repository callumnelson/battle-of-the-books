import { Section } from '../models/section.js'
import { Profile } from '../models/profile.js'

const index = async (req, res) => {
  try {
    const teacher = await Profile.findById(req.user.profile._id)
    .populate('sections')
    res.render('sections/index', { 
      title: 'Sections Home',
      teacher 
    })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const create = async (req, res) => {
  try {
    const teacher = await Profile.findById(req.user.profile._id)
    .populate('sections')
    //If a section with that name, year, and grade already exists, don't let the user create it again
    let duplicate = teacher.sections.find( section => {
      return section.name === req.body.name && section.schoolYear === +req.body.schoolYear && section.gradeLevel === req.body.gradeLevel 
    })
    if (duplicate) {
      //TODO make this show to the user
      throw new Error('Oops, duplicate section!')
    } else {
      req.body.teacher = req.user.profile._id
      const newSection = await Section.create(req.body)
      teacher.sections.push(newSection._id)
      await teacher.save()
      res.redirect('/sections')
    }
  } catch (err) {
    console.log(err)
    res.redirect('/sections')
  }
}

export {
  index,
  create
}