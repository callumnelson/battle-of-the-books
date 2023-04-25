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
      res.render('profile/show', { 
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
    res.render('profile/edit', {
      title: req.user.profile.name
    })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const update = async (req, res) => {
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
    console.log(profile)
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

export {
  show,
  edit,
  update
}