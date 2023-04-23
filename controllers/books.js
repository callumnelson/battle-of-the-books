import { Book } from '../models/book.js'

const index = async (req, res) => {
  try {
    const books = await Book.find({})
    res.render('books/index', {
      title: 'Books',
      books
    })
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

const checkout = async (req, res) => {
  try {
    
  } catch (err) {
    console.log(err)
    res.redirect('/books')
  }
}

const search = async (req, res) => {
  try {
    
  } catch (err) {
    
  }
}

export {
  index,
  show,
  create,
  checkout,
  search
}