import { PrismaClient, User } from '@prisma/client'
import { hash } from '@/services/crypto'

const prisma = new PrismaClient()

export async function createUser(username: string, password: string) {
  const hashPassword = await hash(password)
  return await prisma.user.create({ data: { username, password: hashPassword } })
}

export async function getAllUsers(): Promise<User[]> {
  return await prisma.user.findMany()
}

export async function getUser(username: string): Promise<User | null> {
  return await prisma.user.findUnique({ where: { username } })
}
