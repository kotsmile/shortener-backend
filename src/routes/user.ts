import express from 'express'
import { postCreateHandler, postLoginHandler, getCheckHandler } from '@/controllers/user'
import { auth, authJWT } from '@/middlewares/auth'

export const userRouter = express.Router()
userRouter
  .post('/create', postCreateHandler)
  .post('/login', auth, postLoginHandler)
  .get('/check', authJWT, getCheckHandler)
  .options('/*', (_, res) => res.sendStatus(200))
