import { Router } from 'express'

const router = Router()
import * as indexCtrl from '../controllers/index.js'

// GET localhost:3000/
router.get('/', indexCtrl.index)

// GET localhost:3000/profileId
router.get('/:profileId', indexCtrl.show)

// GET localhost:3000/profile/edit
router.get('/:profileId/edit', indexCtrl.edit)

// PATCH localhost:3000/profile
router.patch('/:profileId', indexCtrl.update)

export {
  router
}
