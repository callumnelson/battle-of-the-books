import { District } from '../models/district.js'
import { Profile } from '../models/profile.js'
import { User } from '../models/user.js'

const index = async (req, res) => {
  try {
    if (req.user.profile.role > 200){
      const districts = await District.find({})
      res.render('districts/index', { 
        title: 'Districts',
        districts
      })
    } else {
      throw new Error('Access denied')
    }
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const createSchool = async (req, res) => {
  try {
    //Only admin can add districts and schools
    if (req.user.profile.role > 200){
      const district = await District.findById(req.params.districtId)
      if (!district.schools.includes(req.body.newSchoolName)) {
        district.schools.push(req.body.newSchoolName)
        await district.save()
      }
      res.redirect('/districts')
    } else {
      throw new Error('Access denied')
    }
  } catch (err) {
    console.log(err)
    res.redirect('/districts')
  }
}

const create = async (req, res) => {
  try {
    //Only admin can add districts and schools
    if (req.user.profile.role > 200){
      const newDistrict = await District.create(req.body)
      res.redirect('/districts')
    } else {
      throw new Error('Access denied')
    }
  } catch (err) {
    console.log(err)
    res.redirect('/districts')
  }
}

const deleteDistrict = async (req, res) => {
  try {
    //Only admin can take this action
    if (req.user.profile.role > 200){
      const toDelete = await District.findById(req.params.districtId)
      const districtProfiles = await Profile.find({district: req.params.districtId})
      const districtEmails = districtProfiles.map(prof => prof.email)
      await Profile.deleteMany({district: toDelete._id})
      await User.deleteMany({email: {$in: districtEmails}})
      await toDelete.deleteOne()
      res.redirect('/districts')
    }else {
      throw new Error(`Access Denied: Inadequate permissions to delete district`)
    }
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const deleteSchool = async (req, res) => {
  try {
    //Only admin can take this action
    if (req.user.profile.role > 200){
      console.log(req.body)
      // const toDeleteDistrict = await District.find(req.params.districtId)
      // const schoolProfiles = await Profile.find({district: req.params.districtId})
      // const districtEmails = districtProfiles.map(prof => prof.email)
      // await Profile.deleteMany({_id: toDelete._id})
      // await User.deleteMany({email: {$in: districtEmails}})
      // await toDelete.deleteOne()
      // res.redirect('/districts')
    }else {
      throw new Error(`Access Denied: Inadequate permissions to delete district`)
    }
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

export {
  index,
  createSchool,
  create,
  deleteDistrict as delete,
  deleteSchool
}