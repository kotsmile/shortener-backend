import { PrismaClient } from '@prisma/client'
import { hash } from '@/services/crypto'
import { getRandom } from '@/services/utils'

const prisma = new PrismaClient()

export async function createUser(username: string, password: string) {
  const hashPassword = await hash(password)

  return await prisma.user.create({
    data: { username, password: hashPassword },
  })
}

export async function getUser(username: string) {
  return await prisma.user.findUnique({ where: { username } })
}

export async function getUserId(username: string): Promise<string | null> {
  const user = await prisma.user.findUnique({
    select: { id: true },
    where: { username },
  })
  if (!user) return null
  return user.id
}

export async function createLink(username: string, url: string, description?: string) {
  const userId = await getUserId(username)
  if (!userId) return null

  return await prisma.link.create({
    data: { id: getRandom(), url, userId, description },
  })
}

export async function getLinks(username: string) {
  const userId = await getUserId(username)
  if (!userId) return null

  return await prisma.link.findMany({
    where: { userId },
    include: { clicks: true },
  })
}

export async function removeLinks(username: string, linkIds: string[]) {
  const userId = await getUserId(username)
  if (!userId) return null

  if (linkIds.length === 0)
    return await prisma.link.deleteMany({
      where: {
        userId,
      },
    })
  else
    return await prisma.link.deleteMany({
      where: {
        userId,
        id: {
          in: linkIds,
        },
      },
    })
}

export async function getURL(linkId: string) {
  return await prisma.link.findUnique({ select: { url: true }, where: { id: linkId } })
}

export async function newClick(linkId: string, ip?: string) {
  return await prisma.click.create({ data: { linkId, ip } })
}
