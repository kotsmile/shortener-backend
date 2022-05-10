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

const port = 3000

express()
  .use(express.json())
  .use(cors())
  .use(helmet())
  .use(morgan(config.morganLogger))
  .use(router)
  .use(requestIp.mw())
  .listen(port, () => {
    console.log(`Server started on port ${port}`)
  })
