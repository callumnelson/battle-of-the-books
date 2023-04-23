import { Router } from 'express'

const router = Router()
import * as districtsCtrl from '../controllers/districts.js'
import { isLoggedIn } from '../middleware/middleware.js'

// ALL ROUTES ACCESS localhost:3000/districts

// GET localhost:3000/districts
router.get('/', isLoggedIn, districtsCtrl.index)

// POST localhost:3000/districts
router.post('/', isLoggedIn, districtsCtrl.create)

// PATCH localhost:3000/districts/:districtId
router.patch('/:districtId', isLoggedIn, districtsCtrl.createSchool)

export {
  router
}
