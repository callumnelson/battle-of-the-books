import { Section } from '../models/section.js'
import { Profile } from '../models/profile.js'
import { User } from '../models/user.js'

const index = async (req, res) => {
  try {
    if (req.user.profile.role > 100) {
      const teacher = await Profile.findById(req.user.profile._id)
      .populate('sections')
      res.render('sections/index', { 
        title: 'Sections',
        teacher
      })
    // A student is trying to load the sections page
    } else {
      res.redirect('/')
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
      .populate('students waitlist')
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

const admitStudent = async (req, res) => {
  try {
    if (req.user.profile.role > 100 ){
      const section = await Section.findById(req.params.sectionId)
      const student = await Profile.findById(req.params.profileId)
      //Remove from waitlist
      section.waitlist.remove(student._id)
      //Add to students list
      section.students.push(student._id)
      //Add section to student.sections
      student.sections.push(section._id)    
      await section.save()
      await student.save()
      res.redirect(`/sections/${section._id}`)
    }else {
      throw new Error(`Access Denied: Students can't admit students`)
    }
  } catch (err) {
    console.log(err)
    res.redirect(`/sections/${req.params.sectionId}`)
  }
}

const deleteStudent = async (req, res) => {
  try {
    //Only teachers can remove students
    if (req.user.profile.role > 100) {
      const section = await Section.findById(req.params.sectionId)
      const student = await Profile.findById(req.params.profileId)
      let email = student.email
      //Remove student from section's students
      section.students.remove(student._id)
      await section.save()
      //Remove section from student's profile and set signed up to false
      student.sections.remove(section._id)
      student.isSignedUp = false
      await student.save()
      //Delete profile and user
      Profile.findByIdAndDelete(student._id)
      User.findOneAndDelete({email: email})
      res.redirect(`/sections/${section._id}`)
    }else {
      throw new Error(`Access Denied: Only teachers can delete students`)
    }
  } catch (err) {
    console.log(err)
    res.redirect(`/sections/${req.params.sectionId}`)
  }
}

export {
  index,
  create,
  show,
  deleteSection as delete,
  admitStudent,
  deleteStudent
}