import { Ticket } from '../models/ticket.js'
import { Profile } from '../models/profile.js'
import { Book } from '../models/book.js'

const index = async (req, res) => {
  try { 
    if (req.user.profile.role > 100) {
      const teacher = await Profile.findById(req.user.profile._id)
      .populate({path: 'sections', 
        populate: {path: 'students',
          populate: {path: 'tickets',
            populate: {path: 'book'}
          }
        }
      })
      const tickets = []
      teacher.sections.forEach( section => {
        section.students.forEach( student => {
          student.tickets.forEach( ticket => {
            tickets.push({
              ticket: ticket,
              student: student,
              section: section
            })
          })
        })
      })
      res.render('tickets/index', {
        title: 'Tickets',
        tickets,
        currentBooks: []
      })
      
    } else {
      const student = await Profile.findById(req.user.profile._id)
      .populate({path: 'tickets', populate: { path: 'book' }})
      .populate({path: 'currentBooks'})
      res.render('tickets/index', {
        title: 'Tickets',
        tickets: student.tickets,
        currentBooks: student.currentBooks
      })
    }
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const deleteTicket = async(req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId)
    const owner = await Profile.findById(ticket.owner)
    //You can only delete a ticket if it's yours or you're a teacher
    if (ticket.owner.equals(req.user.profile._id) || req.user.profile.role > 100){
      owner.tickets.remove(ticket._id)
      await owner.save()
      await ticket.deleteOne()
      res.redirect('/tickets')
    }else {
      throw new Error(`Access Denied: Students can't delete other students' tickets`)
    }
  } catch (err) {
    console.log(err)
    res.redirect('/tickets')
  }
}

const show = async (req, res) => {
  try {
    
  } catch (err) {
    console.log(err)
    res.redirect('/tickets')
  }
}

const createApiTicket = async (req, res) => {
  try {
    
  } catch (err) {
    console.log(err)
    res.redirect('/tickets')
  }
}

const createManualTicket = async (req, res) => {
  try {
    //If teacher, create many tickets and set owners to students selected in form
    if (req.user.profile.role > 100 ){
      
    } else {
      const book = await Book.create(req.body)
      const student = await Profile.findById(req.user.profile._id)
      const ticket = await Ticket.create({
        owner: req.user.profile._id,
        review: req.body.review,
        status: false,
        book: book._id
      })
      student.tickets.push(ticket)
      await student.save()
      res.redirect('/tickets')
    }
  } catch (err) {
    console.log(err)
    res.redirect('/tickets')
  }
}

const approve = async (req, res) => {
  try {
    if (req.user.profile.role > 100){
      const ticket = await Ticket.findById(req.params.ticketId)
      ticket.status = true
      await ticket.save()
      res.redirect('/tickets')
    }else {
      throw new Error(`Access Denied: Students can't approve tickets`)
    }
  } catch (err) {
    console.log(err)
    res.redirect('/tickets')
  }
}

export {
  index,
  show,
  createApiTicket,
  createManualTicket,
  approve,
  deleteTicket as delete
}