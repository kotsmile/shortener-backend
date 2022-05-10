import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import config from '@/config.json'

export function createSalt(size = 16) {
  return crypto.randomBytes(size).toString('hex')
}

export async function hash(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = createSalt()

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(salt + ':' + derivedKey.toString('hex'))
    })
  })
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(':')
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(key == derivedKey.toString('hex'))
    })
  })
}

export async function generateSecretToken() {
  return crypto.randomBytes(64).toString('hex')
}

export function generateAccessToken(username: string) {
  return jwt.sign(
    {
      data: username,
    },
    process.env.SECRET_TOKEN,
    { expiresIn: config.tokenExp }
  )
}

export async function verifyJWT(authHeader: string): Promise<string | null> {
  const token = authHeader
  if (token == null) return null

  return new Promise((resolve) => {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, data) => {
      if (err) {
        console.error(err)
        resolve(null)
        return
      }
      if (data) {
        resolve((data as { data: string }).data)
        return
      }
      resolve(null)
    })
  })
}
