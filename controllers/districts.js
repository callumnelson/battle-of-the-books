import { District } from '../models/district.js'
import { Profile } from '../models/profile.js'
import { Section } from '../models/section.js'
import { User } from '../models/user.js'
import { Ticket } from '../models/ticket.js'

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
      const districtSections = districtProfiles.reduce( (a, c) => [...a, ...c.sections], [])
      const districtTickets = districtProfiles.reduce( (a, c) => [...a, ...c.tickets], [])
      
      await Section.deleteMany({_id: { $in: districtSections}})
      await Ticket.deleteMany({_id: { $in: districtTickets}})
      await Profile.deleteMany({district: req.params.districtId})
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
      const district = await District.findById(req.params.districtId)
      district.schools.remove(req.body.school)
      await district.save()
      const schoolProfiles = await Profile.find({
        district: req.params.districtId,
        school: req.body.school
      })
      const schoolEmails = schoolProfiles.map(prof => prof.email)
      const schoolSections = schoolProfiles.reduce( (a, c) => [...a, ...c.sections], [])
      const schoolTickets = schoolProfiles.reduce( (a, c) => [...a, ...c.tickets], [])
      
      await Section.deleteMany({_id: { $in: schoolSections}})
      await Ticket.deleteMany({_id: { $in: schoolTickets}})
      await Profile.deleteMany({
        district: req.params.districtId,
        school: req.body.school
      })
      await User.deleteMany({email: {$in: schoolEmails}})
      res.redirect('/districts')
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