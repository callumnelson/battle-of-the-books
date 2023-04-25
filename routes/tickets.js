import { Router } from 'express'

const router = Router()
import * as ticketsCtrl from '../controllers/tickets.js'
import { isLoggedIn } from '../middleware/middleware.js'

// ALL ROUTES ACCESS localhost:3000/tickets

// GET localhost:3000/tickets
router.get('/', isLoggedIn, ticketsCtrl.index)

// POST localhost:3000/tickets
router.post('/api', isLoggedIn, ticketsCtrl.createApiTicket)

// POST localhost:3000/tickets
router.post('/manual', isLoggedIn, ticketsCtrl.createManualTicket)

// PATCH localhost:3000/tickets/:ticketId
router.patch('/:ticketId/approve', isLoggedIn, ticketsCtrl.approve)

// DELETE localhost:3000/tickets/:ticketId
router.delete('/:ticketId', isLoggedIn, ticketsCtrl.delete)

export {
  router
}
