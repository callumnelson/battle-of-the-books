import { District } from '../models/district.js'
import { Profile } from '../models/profile.js'

const index = async (req, res) => {
  try {
    //If user is logged in and has enrolled or created sections
    if (req.user?.profile.sections.length > 0){
      res.redirect('/scoreboard')
    } else {
      const districts = await District.find({name: {$ne: 'Test Admin District'}})
      .populate('schools')
      //Only get profiles of teachers. Not admin or students
      const teachers = await Profile.find({role: 200})
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
    //Get sections from a teacher's perspective
    let teacherId = undefined
    if (req.user.profile.role > 100){
      teacherId = req.user.profile._id
    //Get sections from a student's perspective
    }else if (req.user.profile.role === 100){
      const student = await Profile.findById(req.user.profile._id)
      .populate('sections')
      teacherId = student.sections[0].teachers[0]
    }
    if (teacherId){
      const teacher = await Profile.findById(teacherId)
      .populate({
        path: 'sections',
          populate: {
            path: 'students',
              populate: {
                path: 'tickets',
                  populate: {
                    path: 'book'
                  }
              }
          } 
      })
      //Prep data for scoreboard
      let data = []

      teacher.sections.forEach( section => {
        let stats = {
          name: section.name,
          booksRead: 0,
          pagesRead: 0,
          points: 0,
          topReader: ''
        }
        let topReaderPoints = 0
        data.push( section.students.reduce( (a, c) => {
          let info =  {
            name: c.name,
            booksRead: 0,
            pagesRead: 0,
            points: 0
          }
          let res = c.tickets.reduce( (a, c) => {
            if (c.status){
              a.booksRead += 1
              a.pagesRead += c.book.pageCount
              a.points += Math.ceil(c.book.pageCount/300)
            }
            return a
          }, info)
          a.booksRead += res.booksRead
          a.pagesRead += res.pagesRead
          a.points += res.points
          if (res.points > topReaderPoints){
            a.topReader = res.name
            topReaderPoints = res.points
          }
          return a
        }, stats))
      })
      //Sort descending first by points and then by pages if it's a tie
      data.sort((a, b) => b.points - a.points || b.pagesRead - a.pagesRead)
      res.render('scoreboard', {
        title: 'Scoreboard',
        data
      })
    }else {
      throw new Error(`There was an issue retrieving the sections`)
    }
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

export {
  index,
  showScoreboard
}