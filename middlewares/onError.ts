import { parseYupValidationErrors } from '../utils/validation'
import { NextApiRequest, NextApiResponse } from 'next'

export default (e: any, req: NextApiRequest, res: NextApiResponse) => {
  if (e.name == 'ValidationError') {
    e = parseYupValidationErrors(e)
  }

  const { status, message, errors } = e
  if (status) {
    return res.status(status).json({ message, errors })
  }

  res.status(500).json({ message })
}