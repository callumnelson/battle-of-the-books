import { District } from '../models/district.js'
import { Profile } from '../models/profile.js'

const index = async (req, res) => {
  try {
    const districts = await District.find({})
    res.render('index', { 
      title: 'Home',
      districts 
    })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const show = async (req, res) => {
  try {
    res.render('profile', { 
      title: req.user.profile.name
    })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const edit = async (req, res) => {
  try {
    res.render('editProfile', {
      title: req.user.profile.name
    })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId)
    let district
    if (req.body.newDistrictName) {
      district = await District.create({
        name: req.body.newDistrictName,
        schools: [req.body.newSchoolName ? req.body.schoolName : req.body.newSchoolName]
      })
    } else {
      district = await District.findOne({name: req.body.districtName})
      if (req.body.newSchoolName) {
        district.schools.push(req.body.newSchoolName)
        await district.save()
      } else if (!district.schools.includes(req.body.schoolName)) {
        district.schools.push(req.body.newSchoolName)
      }
    }
    profile.district = district._id
    profile.isSignedUp = true
    await profile.save()
    res.redirect('/')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

export {
  index,
  show,
  edit,
  updateProfile as update
}