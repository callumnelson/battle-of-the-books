import { Router } from 'express'

const router = Router()
import * as profileCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

// ALL ROUTES ACCESS localhost:3000/profiles

// GET localhost:3000/profile
router.get('/:profileId', isLoggedIn, profileCtrl.show)

// GET localhost:3000/profiles/edit
router.get('/edit', isLoggedIn, profileCtrl.edit)

// GET localhost:3000/profiles/:profileId/update
router.patch('/:profileId/update', isLoggedIn, profileCtrl.update)

export {
  router
}
