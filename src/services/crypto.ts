import crypto from 'crypto'

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

export async function verify(password: string, hash: string) {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(':')
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(key == derivedKey.toString('hex'))
    })
  })
}
