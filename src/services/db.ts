import { PrismaClient } from '@prisma/client'
import { hash, generateAccessToken } from '@/services/crypto'

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
