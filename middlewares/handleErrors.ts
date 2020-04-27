import { parseYupValidationErrors } from '../utils/validation'
import { NextApiResponse } from 'next'

export default (e: any, res: NextApiResponse) => {
  if (e.name == 'ValidationError') {
    e = parseYupValidationErrors(e)
  }

  const { status, message, errors } = e
  if (status) {
    res.status(status).json({ message, errors })
  }
  res.status(500).json({ message })
}