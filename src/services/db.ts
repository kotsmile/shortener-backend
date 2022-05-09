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

export async function createLink(username: string, url: string) {
  const userId = await getUserId(username)
  if (!userId) return null

  return await prisma.link.create({
    data: { url, userId, short: getRandom() },
  })
}

export async function getLinks(username: string) {
  const userId = await getUserId(username)
  if (!userId) return null

  return await prisma.link.findMany({
    select: { url: true, short: true },
    where: { userId },
  })
}

export async function removeLinks(username: string, urls: string[]) {
  const userId = await getUserId(username)
  if (!userId) return null

  if (urls.length === 0)
    return await prisma.link.deleteMany({
      where: {
        userId,
      },
    })
  else
    return await prisma.link.deleteMany({
      where: {
        userId,
        short: {
          in: urls,
        },
      },
    })
}

export async function getURL(short: string) {
  return await prisma.link.findUnique({ select: { url: true }, where: { short } })
}
