import { District } from '../models/district.js'

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
      const newDistrict = District.create(req.body)
      res.redirect('/districts')
    } else {
      throw new Error('Access denied')
    }
  } catch (err) {
    console.log(err)
    res.redirect('/districts')
  }
}

export {
  index,
  createSchool,
  create
}