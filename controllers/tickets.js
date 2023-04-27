import { Ticket } from '../models/ticket.js'
import { Profile } from '../models/profile.js'
import { Book } from '../models/book.js'

const index = async (req, res) => {
  try { 
    //Teacher accessing all their tickets
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
    //Student accessing their tickets  
    } else {
      const student = await Profile.findById(req.user.profile._id)
      .populate({path: 'tickets', populate: { path: 'book' }})
      .populate('currentBooks')
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

const deleteTicket = async (req, res) => {
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

const createApiTicket = async (req, res) => {
  try {
    const book = await Book.findById(req.body.bookId)
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
  } catch (err) {
    console.log(err)
    res.redirect('/tickets')
  }
}

const createManualTicket = async (req, res) => {
  try {
    //TODO If teacher, create many tickets and set owners to students selected in form
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
      //Update the ticket's status
      const ticket = await Ticket.findById(req.params.ticketId)
      ticket.status = true
      await ticket.save()
      const book = await Book.findById(ticket.book)
      const owner = await Profile.findById(ticket.owner)
      //If this is a checked out book take it off their checked out list
      if (owner.currentBooks.includes(book._id)) {
        owner.currentBooks.remove(book._id)
        await owner.save()
      }
      res.redirect('/tickets')
    }else {
      throw new Error(`Access Denied: Students can't approve tickets`)
    }
  } catch (err) {
    console.log(err)
    res.redirect('/tickets')
  }
}

const edit = async (req, res) => {
  try {
    const toEdit = await Ticket.findById(req.params.ticketId)
    if (req.user.profile.role < 200 && !toEdit.owner.equals(req.user.profile._id)){
      throw new Error(`Access Denied: Students can't edit other students' tickets`)
    }else {
      const student = await Profile.findById(req.user.profile._id)
      .populate({path: 'tickets', populate: { path: 'book' }})
      res.render('tickets/edit', {
        title: 'Edit Ticket',
        tickets: student.tickets,
        editId: toEdit._id
      })
    }
  } catch (err) {
    console.log(err)
    res.redirect('/tickets')
  }
}

const update = async (req, res) => {
  try {
    const toUpdate = await Ticket.findById(req.params.ticketId)
    if (req.user.profile.role < 200 && !toUpdate.owner.equals(req.user.profile._id)){
      throw new Error(`Access Denied: Students can't update other students' tickets`)
    }else {
      await Ticket.updateOne({_id: toUpdate._id}, {review: req.body.review}, {new: true})
      //This is a manual entry and the user may be updating the book
      if (req.body.title) {
        await Book.updateOne({_id: toUpdate.book}, {$set: req.body}, {new: true})
      }
      res.redirect('/tickets')
    }
  } catch (err) {
    console.log(err)
    res.redirect('/tickets')
  }
}

export {
  index,
  createApiTicket,
  createManualTicket,
  approve,
  deleteTicket as delete,
  edit,
  update
}