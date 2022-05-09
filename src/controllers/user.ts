import { Request, Response } from 'express'
import { createUser } from '@/services/db'
import { UserData, AuthUserData } from '@/types'
import { generateAccessToken } from '@/services/crypto'

export async function postCreateHandler(req: Request<{}, {}, UserData>, res: Response) {
  const { username, password } = req.body
  if (!username || !password) return res.sendStatus(400)

  try {
    await createUser(username, password)
  } catch (e) {
    console.error(e)
    return res.status(400).send(e)
  }
  return res.status(200).send('User created successfully')
}

export async function postLoginHandler(req: Request<{}, {}, UserData>, res: Response) {
  const { username, password } = req.body
  if (!username || !password) return res.sendStatus(400)

  const accessToken = generateAccessToken(username)
  res.json(accessToken)
}

export async function getCheckHandler(req: Request, res: Response<{}, AuthUserData>) {
  res.status(200).send(res.locals.username)
}
