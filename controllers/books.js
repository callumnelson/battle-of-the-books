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
    req.body.title = req.body.title ? req.body.title.replaceAll(' ', '%20') : ''
    req.body.author = req.body.author ? req.body.author.replaceAll(' ', '%20') : ''
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${req.body.title}+inauthor:${req.body.author}&printType=books&maxResults=40`)
    const data = await response.json()
    
    const books = []
    if(data.totalItems){
      // let filtered = data.items.filter( book => book.pageCount )
      data.items.forEach( book => {
        book.googleId = book.id
        books.push(new Book(book.volumeInfo))
      })
    }
    res.render('books/searchResults', {
      title: 'Search Results',
      books
    })
    
  } catch (err) {
    console.log(err)
    res.redirect('/books')
  }
}

export {
  index,
  show,
  create,
  checkout,
  search
}