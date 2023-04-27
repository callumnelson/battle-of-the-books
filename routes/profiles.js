import { Router } from 'express'

const router = Router()
import * as profileCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

// ALL ROUTES ACCESS localhost:3000/profiles

// GET localhost:3000/profiles/:profileId
router.get('/:profileId', isLoggedIn, profileCtrl.show)

// GET localhost:3000/profiles/:profileId/edit
router.get('/:profileId/edit', isLoggedIn, profileCtrl.edit)

// PATCH localhost:3000/profiles/:profileId/profilesetup
router.patch('/:profileId/profilesetup', isLoggedIn, profileCtrl.setUpProfile)

// PUT localhost:3000/profiles/:profileId/update
router.put('/:profileId', isLoggedIn, profileCtrl.update)

export {
  router
}
