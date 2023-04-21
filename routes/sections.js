import { Router } from 'express'

const router = Router()

import * as sectionsCtrl from '../controllers/sections.js'
import { isLoggedIn } from '../middleware/middleware.js'

//ALL ROUTES START AT localhost:3000/sections

// GET localhost:3000/sections
router.get('/', isLoggedIn, sectionsCtrl.index)

// POST localhost:3000/sections
router.post('/', isLoggedIn, sectionsCtrl.create)

export {
  router
}
