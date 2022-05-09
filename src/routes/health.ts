import express from 'express'

import { getHealthHandler } from '@/controllers/health'

export const healthRouter = express.Router()
healthRouter.route('/').get(getHealthHandler)
