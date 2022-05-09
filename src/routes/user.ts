import express from 'express'
import {
  postCreateUserHandler,
  getListUserHandler,
  getVerifyUserHandler,
} from '@/controllers/user'

export const userRouter = express.Router()
userRouter
  .post('/create', postCreateUserHandler)
  .get('/list', getListUserHandler)
  .get('/verify', getVerifyUserHandler)
