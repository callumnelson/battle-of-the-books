import { Router } from 'express'

const router = Router()
import * as indexCtrl from '../controllers/index.js'
import { isLoggedIn } from '../middleware/middleware.js'

// GET localhost:3000/
router.get('/', indexCtrl.index)

// GET localhost:3000/scoreboard
router.get('/scoreboard', isLoggedIn, indexCtrl.showScoreboard)

export {
  router
}
