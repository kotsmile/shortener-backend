import express from 'express'

import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import 'module-alias/register'

import * as dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan(process.env.SERVER_LOGGER as string))

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started on port ${process.env.SERVER_PORT}`)
})
