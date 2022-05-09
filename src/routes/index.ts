import express from 'express'

import { userRouter } from '@/routes/user'
import { linkRouter } from '@/routes/link'
import { healthRouter } from '@/routes/health'

import { getLinkHandler } from '@/controllers/link'

export const router = express.Router()

router
  .use('/user', userRouter)
  .use('/link', linkRouter)
  .use('/health', healthRouter)
  .get('/*', getLinkHandler)
