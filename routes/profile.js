import { Router } from 'express'

const router = Router()
import * as profileCtrl from '../controllers/profile.js'
import { isLoggedIn } from '../middleware/middleware.js'

// ALL ROUTES ACCESS localhost:3000/profile

// GET localhost:3000/profile
router.get('/', isLoggedIn, profileCtrl.show)

// GET localhost:3000/profile/edit
router.get('/edit', isLoggedIn, profileCtrl.edit)

// GET localhost:3000/profile/update
router.patch('/update', isLoggedIn, profileCtrl.update)

export {
  router
}
