import { Response, Request } from 'express'

export function getHealthHandler(_: Request, res: Response) {
  res.status(200).send('Server is Healthy')
}
