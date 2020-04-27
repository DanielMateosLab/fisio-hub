import { CustomApiRequest } from '../utils/types'
import { NextApiResponse } from 'next'

export default async(
  req: CustomApiRequest,
  res: NextApiResponse,
  ...middlewares: Function[]
) => {
  for (let i = 0; i < middlewares.length; i++) {
    await middlewares[i](req, res)
    if (res.finished) {
      break
    }
  }
}