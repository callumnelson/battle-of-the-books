import { District } from '../models/district.js'
import { Profile } from '../models/profile.js'
import { Section } from '../models/section.js'

const show = async (req, res) => {
  try {
    let accessedId = undefined
    //Student accessing their own profile or teacher accessing any profile
    if ((req.user.profile._id.equals(req.params.profileId) && req.user.profile.role < 200)){
      accessedId = req.params.profileId
    //Teacher accessing a student's profile
    } else if (req.user.profile.role > 100 && !req.user.profile._id.equals(req.params.profileId)) {
      accessedId = req.params.profileId
    //Teacher accessing their own profile
    } else if (req.user.profile.role > 100 && req.user.profile._id.equals(req.params.profileId)){
      accessedId = req.params.profileId
    }
    if (accessedId){
      const fullProfile = await Profile.findById(req.params.profileId)
      .populate('district')
      .populate({
        path: 'tickets',
          populate: {path: 'book'}
      })
      .populate({path: 'sections', 
          populate: {path: 'teachers', 
            populate: {path: 'name'}
        }
      })
      .populate('currentBooks')
      res.render('profiles/show', { 
        title: fullProfile.name,
        profile: fullProfile
      })
    }else {
      throw new Error(`Access Denied: Inadequate permissions to access profile`)
    }
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const edit = async (req, res) => {
  try {
    //Teacher editing a student's profile
    if (req.user.profile.role > 100 && !req.user.profile._id.equals(req.params.profileId)){
      const student = await Profile.findById(req.params.profileId)
      .populate('district')
      .populate({
        path: 'tickets',
          populate: {path: 'book'}
      })
      .populate({path: 'sections', 
          populate: {path: 'teachers', 
            populate: {path: 'name'}
        }
      })
      .populate('currentBooks')
      const teacher = await Profile.findById(req.user.profile._id)
      .populate('sections', 'name')
      res.render('profiles/edit', {
        title: req.user.profile.name,
        student,
        teacher,
        editId: student._id
      })
    } else {
      throw new Error(`Access Denied: User doesn't have permission to edit profiles`)
    }
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const setUpProfile = async (req, res) => {
  try {
    //Check that initial form submission is a real school and a real district and that the district contains the school
    if (req.body.district){
      let district = await District.findById(req.body.district)
      if (!district.schools.includes(req.body.school)) {
        throw new Error('Whoops, invalid school/district combo')
      }
    }
    req.body.isSignedUp = true

    //Update the profile
    const profile = await Profile.findByIdAndUpdate(req.user.profile._id, {
      $set: req.body
    }, {new: true})
    //Add the profile to the waitlist for that section if it's a student and there's a section on the request
    if (+req.body.role < 200 && req.body.section){
      const section = await Section.findById(req.body.section)
      section.waitlist.push(profile._id)
      await section.save()
    }
    res.redirect('/')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const update = async (req, res)  => {
  try {
    //Teacher updating a student's profile
    if (req.user.profile.role > 100 && !req.user.profile._id.equals(req.params.profileId)){
      const toUpdate = await Profile.findById(req.params.profileId)
      //Trying to change a student's section
      if (!toUpdate.sections[0].equals(req.body.sections)){
        const oldSection = await Section.findById(toUpdate.sections[0])
        const newSection = await Section.findById(req.body.sections)
        oldSection.students.remove(toUpdate._id)
        await oldSection.save()
        newSection.students.push(toUpdate._id)
        await newSection.save()
      }
      await toUpdate.updateOne(req.body)
      res.redirect(`/profiles/${toUpdate._id}`)
    }else {
      throw new Error(`Access Denied: User doesn't have permission to edit profiles`)
    }
  } catch (err) {
    console.log(err)
    res.redirect(`/`)
  }
}

export {
  show,
  edit,
  setUpProfile,
  update
}