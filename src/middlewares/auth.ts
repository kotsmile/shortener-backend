import { Request, Response, NextFunction } from 'express'

import { verifyJWT, verifyPassword } from '@/services/crypto'
import { getUser } from '@/services/db'

import { UserData, AuthUserData } from '@/types'

export async function authJWT(
  req: Request,
  res: Response<{}, AuthUserData>,
  next: NextFunction
) {
  const authHeader = req.headers['authorization']
  if (!authHeader) return res.sendStatus(403)

  const username = await verifyJWT(authHeader)
  if (!username) return res.sendStatus(403)

  res.locals.username = username
  next()
}

export async function auth(
  req: Request<{}, {}, UserData>,
  res: Response,
  next: NextFunction
) {
  const { username, password } = req.body
  if (!username || !password) return res.sendStatus(403)
  const user = await getUser(username)

  if (!user) return res.sendStatus(403)

  const result = await verifyPassword(password, user.password)
  if (!result) return res.sendStatus(403)

  next()
}
