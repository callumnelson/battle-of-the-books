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
        throw new Error(`Access Denied: Teachers can only see their own sections`)
      }
    } 
  } catch (err) {
    console.log(err)
    res.redirect('/sections')
  }
}

const update = async (req, res) => {
  try {
    if (req.user.profile.role > 100){
      const section = await Section.findByIdAndUpdate(req.params.sectionId, 
        req.body,
        {new: true}
      )
      res.redirect('/sections')
    }else {
      throw new Error(`Access Denied: Students can't edit section info`)
    }
  } catch (err) {
    
  }
}

const deleteSection = async (req, res) => {
  try {
    if (req.user.profile.role > 100){
      const section = await Section.findById(req.params.sectionId)
      // For each student enrolled, remove section from sections
      //TODO remove all books, tickets from profile and reset to initial values
      const enrolledRes = await Profile.updateMany(
        { _id: { $in: section.students} }, 
        { isSignedUp: false, sections: [], district: null, school: '' }
      )
      //For each student in waitlist, set isSignedUp to false
      //TODO remove all books, tickets from profile and reset to initial values
      const waitlistRes = await Profile.updateMany(
        { _id: { $in: section.waitlist} }, 
        { isSignedUp: false, district: null, school: '' }
      )

      //Remove section from teacher's section list
      req.user.profile.sections.remove(section._id)
      await req.user.profile.save()

      //Delete section
      await section.deleteOne()
      res.redirect('/sections')
    }else {
      throw new Error(`Access denied: Students can't delete sections`)
    }
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
      //If we're removing them from the section and they were enrolled
      if (section.students.includes(student._id)) {
        //Remove student from section's students
        section.students.remove(student._id)
        //Remove section from student's profile
      } else if (section.waitlist.includes(student._id)){
        //Remove student from section's waitlist
        section.waitlist.remove(student._id)
      }
      await section.save()
      //Delete profile and user
      await Profile.findByIdAndDelete(student._id)
      await User.findOneAndDelete({email: student.email})
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
  update,
  deleteSection as delete,
  admitStudent,
  deleteStudent,
}