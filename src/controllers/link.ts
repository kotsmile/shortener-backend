import { Request, Response } from 'express'
import { AuthUserData, LinkData } from '@/types'
import { createLink, getLinks, getURL, newClick, removeLinks } from '@/services/db'

export async function getListHandler(_: Request, res: Response<{}, AuthUserData>) {
  const links = await getLinks(res.locals.username)
  if (links === null) return res.sendStatus(400)

  return res.json(links)
}

export async function postCreateHandler(
  req: Request<{}, {}, LinkData>,
  res: Response<{}, AuthUserData>
) {
  const { url, description } = req.body
  if (!url) return res.sendStatus(400)

  const { username } = res.locals

  const link = await createLink(username, url, description)
  if (!link) return res.sendStatus(400)

  return res.send(link.id)
}

export async function postRemoveHandler(
  req: Request<{}, {}, { linkIds?: string[] }>,
  res: Response<{}, AuthUserData>
) {
  const { linkIds } = req.body
  if (!linkIds) return res.sendStatus(400)

  const { username } = res.locals

  const response = await removeLinks(username, linkIds)
  if (!response) return res.sendStatus(400)

  return res.json(response)
}

export async function getLinkHandler(
  req: Request<{ '0'?: string }>,
  res: Response<{}, AuthUserData>
) {
  const params = req.params
  if (!params['0']) return res.sendStatus(400)

  const linkId = params['0']

  const link = await getURL(linkId)
  if (!link) return res.sendStatus(400)

  await newClick(linkId, req.clientIp)

  return res.redirect(link.url)
}
