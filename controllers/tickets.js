import { Ticket } from '../models/ticket.js'
import { Profile } from '../models/profile.js'

const index = async (req, res) => {
  try {
    //TODO teacher should see all the tickets for all their students
    if (req.user.profile.role > 100) {

    //TODO student should only see their tickets
    } else {
      const student = await Profile.findById(req.user.profile._id)
      .populate('tickets')
      console.log(student)
      res.render('tickets/index', {
        title: 'Tickets',
        student
      })
    }
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const show = async (req, res) => {
  try {
    
  } catch (err) {
    console.log(err)
    res.redirect('/books')
  }
}

const create = async (req, res) => {
  try {
    
  } catch (err) {
    console.log(err)
    res.redirect('/books')
  }
}

const update = async (req, res) => {
  try {
    
  } catch (err) {
    
  }
}

export {
  index,
  show,
  create,
  update,
}