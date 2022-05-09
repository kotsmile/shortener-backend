import { Request, Response } from 'express'
import { AuthUserData } from '@/types'
import { createLink, getLinks, getURL, removeLinks } from '@/services/db'

export async function getListHandler(_: Request, res: Response<{}, AuthUserData>) {
  const links = await getLinks(res.locals.username)
  if (links === null) return res.sendStatus(400)

  return res.json(links)
}

export async function postCreateHandler(
  req: Request<{}, {}, { url?: string }>,
  res: Response<{}, AuthUserData>
) {
  const { url } = req.body
  if (!url) return res.sendStatus(400)

  const { username } = res.locals

  const link = await createLink(username, url)
  if (!link) return res.sendStatus(400)

  return res.send(link.short)
}

export async function postRemoveHandler(
  req: Request<{}, {}, { urls?: string[] }>,
  res: Response<{}, AuthUserData>
) {
  const { urls } = req.body
  if (!urls) return res.sendStatus(400)

  const { username } = res.locals

  const response = await removeLinks(username, urls)
  if (!response) return res.sendStatus(400)

  return res.json(response)
}

export async function getLinkHandler(
  req: Request<{ '0'?: string }, {}, { urls?: string[] }>,
  res: Response<{}, AuthUserData>
) {
  const short = req.params
  if (!short['0']) return res.sendStatus(400)

  const link = await getURL(short['0'])
  if (!link) return res.sendStatus(400)

  return res.redirect(link.url)
}
