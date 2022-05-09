import { Request, Response } from 'express'
import { createUser, getAllUsers, getUser } from '@/services/db'
import { verify } from '@/services/crypto'

type UserData = { username?: string; password?: string }

export async function postCreateUserHandler(
  req: Request<{}, {}, {}, UserData>,
  res: Response
) {
  const { username, password } = req.query
  if (!username || !password) return res.sendStatus(400)

  try {
    await createUser(username, password)
  } catch (e) {
    console.error(e)
    return res.status(400).send(e)
  }
  return res.status(200).send('User created successfully')
}

// TODO: remove
export async function getListUserHandler(req: Request, res: Response) {
  res.send(await getAllUsers())
}

// TODO: remove
export async function getVerifyUserHandler(
  req: Request<{}, {}, {}, UserData>,
  res: Response
) {
  const { username, password } = req.query
  if (!username || !password) return res.sendStatus(400)

  try {
    const user = await getUser(username)
    if (!user) return res.status(400)
    return res.status(200).send({ result: await verify(password, user.password) })
  } catch (e) {
    console.error(e)
    return res.status(400)
  }
}
