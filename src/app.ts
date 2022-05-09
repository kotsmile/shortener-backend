import express from 'express'

import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import 'module-alias/register'

import * as dotenv from 'dotenv'
dotenv.config()

import { router } from '@/routes'

express()
  .use(express.json())
  .use(cors())
  .use(helmet())
  .use(morgan(process.env.SERVER_LOGGER))
  .use(router)
  .listen(process.env.SERVER_PORT, () => {
    console.log(`Server started on port ${process.env.SERVER_PORT}`)
  })
