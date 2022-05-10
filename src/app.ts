import express from 'express'

import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import requestIp from 'request-ip'

import 'module-alias/register'

import * as dotenv from 'dotenv'
dotenv.config()

import { router } from '@/routes'

import config from '@/config.json'

express()
  .use(express.json())
  .use(cors())
  .use(helmet())
  .use(morgan(config.morganLogger))
  .use(router)
  .use(requestIp.mw())
  .listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
  })
