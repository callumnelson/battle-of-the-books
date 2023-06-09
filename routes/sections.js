import { Router } from 'express'

const router = Router()

import * as sectionsCtrl from '../controllers/sections.js'
import { isLoggedIn } from '../middleware/middleware.js'

//ALL ROUTES START AT localhost:3000/sections

// GET localhost:3000/sections
router.get('/', isLoggedIn, sectionsCtrl.index)

// GET localhost:3000/sections/:sectionId
router.get('/:sectionId', isLoggedIn, sectionsCtrl.show)

// POST localhost:3000/sections
router.post('/', isLoggedIn, sectionsCtrl.create)

// PUT localhost:3000/sections/:sectionId
router.put('/:sectionId', isLoggedIn, sectionsCtrl.update)

// PATCH localhost:3000/sections/:sectionId/profiles/:profileId
router.patch('/:sectionId/profiles/:profileId/admit', isLoggedIn, sectionsCtrl.admitStudent)

// DELETE localhost:3000/sections/:sectionId
router.delete('/:sectionId', isLoggedIn, sectionsCtrl.delete)

// DELETE localhost:3000/sections/:sectionId/profiles/:profileId
router.delete('/:sectionId/profiles/:profileId', isLoggedIn, sectionsCtrl.deleteStudent)

export {
  router
}
