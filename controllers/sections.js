import { Section } from '../models/section.js'
import { Profile } from '../models/profile.js'

const index = async (req, res) => {
  try {
    if (req.user.profile.role > 100) {
      const teacher = await Profile.findById(req.user.profile._id)
      .populate('sections')
      res.render('sections/index', { 
        title: 'Sections',
        teacher
      })
    // A student is trying to load their sections
    } else {
      const student = await Profile.findById(req.user.profile._id)
      .populate('sections')
      //If they're enrolled in at least one section, show what they're enrolled in
      if (student.sections.length) {
        res.render('sections/index', {
          title: 'Sections',
          student
        })
      } else {
        //TODO res.render message to ask a teacher for their signup code..?
        res.redirect('/')
      }
    }
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
      const newSection = await Section.create(req.body)
      newSection.teachers.push(teacher._id)
      teacher.sections.push(newSection._id)
      await newSection.save()
      await teacher.save()
      res.redirect('/sections')
    }
  } catch (err) {
    console.log(err)
    res.redirect('/sections')
  }
}

const show = async (req, res) => {
  try {
    //If a teacher is trying to access the sections show page
    if (req.user.profile.role > 100){
      const section = await Section.findById(req.params.sectionId)
      console.log(section)
      //Make sure that this teacher is actually the owner of the section
      if (section.teachers.includes(req.user.profile._id)){
        res.render('sections/show', {
          title: section.name,
          section
        })
      } else {
        throw new Error(`That's not your section!`)
      }
    } 
  } catch (err) {
    console.log(err)
    res.redirect('/sections')
  }
}

const deleteSection = async (req, res) => {
  try {
    const deleted = await Section.findByIdAndDelete(req.params.sectionId)
    res.redirect('/sections')
  } catch (err) {
    console.log(err)
    res.redirect('/sections')
  }
}

export {
  index,
  create,
  show,
  deleteSection as delete
}