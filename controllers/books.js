import { Book } from '../models/book.js'

const index = async (req, res) => {
  try {
    res.render('books/index', {
      title: 'Books',
      books: []
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
      data.items = data.items.filter( book => book.volumeInfo.pageCount > 0 )
      data.items.forEach( book => {
        book.googleId = book.id
        books.push(new Book(book.volumeInfo))
      })
    }
    res.render('books/index', {
      title: 'Book Search',
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