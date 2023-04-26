import { Book } from '../models/book.js'
import { Profile } from '../models/profile.js'

const index = async (req, res) => {
  try {
    res.render('books/index', {
      title: 'Book Search',
      books: [],
      results: 0,
      searchTerms: undefined
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

const checkout = async (req, res) => {
  try {
    const result = await Book.find({googleId: req.params.bookGoogleId})
    const profile = await Profile.findById(req.user.profile._id)
    //If book exists already in our database
    if (result.length){
      profile.currentBooks.push(result[0])
      await profile.save()
    //Book doesn't already exist
    }else {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${req.params.bookGoogleId}`)
      const data = await response.json()
      data.volumeInfo.googleId = data.id
      const newBook = await Book.create(data.volumeInfo)
      profile.currentBooks.push(newBook)
      await profile.save()
    }
    res.redirect(`/books`)
  } catch (err) {
    console.log(err)
    res.redirect('/books')
  }
}

const search = async (req, res) => {
  try {
    //Copy original search terms before modification
    let searchTerms = {}
    Object.assign(searchTerms, req.body)
    //Prepare query
    req.body.title = req.body.title ? req.body.title.replaceAll(' ', '%20') : ''
    req.body.author = req.body.author ? req.body.author.replaceAll(' ', '%20') : ''
    let query
    if (req.body.title && req.body.author){
      query = `intitle:${req.body.title}+inauthor:${req.body.author}`
    }else if (req.body.title){
      query = `intitle:${req.body.title}`
    }else if (req.body.author){
      query = `inauthor:${req.body.author}`
    }
    const books = []
    if (query){
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&printType=books&maxResults=40`)
      const data = await response.json()
      if(data.totalItems){
        data.items = data.items.filter( book => book.volumeInfo.pageCount > 0 )
        data.items.forEach( book => {
          book.volumeInfo.googleId = book.id
          books.push(new Book(book.volumeInfo))
        })
      }
    }
    res.render('books/index', {
      title: 'Search Results',
      books,
      results : books.length,
      searchTerms
    })
    
  } catch (err) {
    console.log(err)
    res.redirect('/books')
  }
}

export {
  index,
  show,
  checkout,
  search
}