import express from 'express'

import { userRouter } from '@/routes/user'
import { healthRouter } from '@/routes/health'

export const router = express
  .Router()
  .use('/user', userRouter)
  .use('/health', healthRouter)
