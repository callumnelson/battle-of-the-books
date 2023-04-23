import { Router } from 'express'

const router = Router()
import * as booksCtrl from '../controllers/books.js'
import { isLoggedIn } from '../middleware/middleware.js'

// ALL ROUTES ACCESS localhost:3000/books

// GET localhost:3000/books
router.get('/', isLoggedIn, booksCtrl.index)

// GET localhost:3000/
router.get('/:bookId', isLoggedIn, booksCtrl.show)

// GET localhost:3000/books/search
router.get('/search', isLoggedIn, booksCtrl.search)

// POST localhost:3000/books
router.post('/', isLoggedIn, booksCtrl.create)

// PUT localhost:3000/books/:bookId/profiles/:profileId
router.put('/books/:bookId/profiles/:profileId', booksCtrl.checkout)

export {
  router
}
