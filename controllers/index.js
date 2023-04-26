import { District } from '../models/district.js'
import { Profile } from '../models/profile.js'

const index = async (req, res) => {
  try {
    //If user is logged in and has enrolled or created sections
    if (req.user?.profile.sections.length > 0){
      res.redirect('/scoreboard')
    } else {
      const districts = await District.find({})
      .populate('schools')
      //Only get profiles of teachers. Not admin or students
      const teachers = await Profile.find({'role': 200 })
      .populate('district', 'name')
      .populate('sections', 'name')

      const teachersWithSections = teachers.filter(teacher => {
        return teacher.sections.length > 0
      })
      res.render('index', { 
        title: 'Home',
        districts,
        teachers: teachersWithSections,
      })
    }
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const showScoreboard = async (req, res) => {
  try {
    res.render('scoreboard', {
      title: 'Scoreboard'
    })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

export {
  index,
  showScoreboard
}