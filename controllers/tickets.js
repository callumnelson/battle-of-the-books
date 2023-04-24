import { Ticket } from '../models/ticket.js'
import { Profile } from '../models/profile.js'
import { Book } from '../models/book.js'

const index = async (req, res) => {
  try {
    //TODO teacher should see all the tickets for all their students
    if (req.user.profile.role > 100) {

    //TODO student should only see their tickets
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
    res.redirect('/books')
  }
}

const createApiTicket = async (req, res) => {
  try {
    
  } catch (err) {
    console.log(err)
    res.redirect('/books')
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
  createApiTicket,
  createManualTicket,
  update,
  deleteTicket as delete
}