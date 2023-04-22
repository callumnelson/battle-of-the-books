import { Router } from 'express'

const router = Router()
import * as indexCtrl from '../controllers/index.js'

// GET localhost:3000/
router.get('/', indexCtrl.index)

export {
  router
}
