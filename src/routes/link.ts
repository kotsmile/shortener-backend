import exress from 'express'

import { authJWT } from '@/middlewares/auth'
import { getListHandler, postCreateHandler, postRemoveHandler } from '@/controllers/link'

export const linkRouter = exress.Router()

linkRouter
  .get('/list', authJWT, getListHandler)
  .post('/create', authJWT, postCreateHandler)
  .post('/remove', authJWT, postRemoveHandler)
