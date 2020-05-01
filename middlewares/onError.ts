import { parseYupValidationErrors } from '../utils/validation'
import { NextApiRequest, NextApiResponse } from 'next'

// Exported for testing purposes
export const defaultErrorMessage = 'Ha ocurrido un error desconocido en el servidor.'

export default (e: any, req: NextApiRequest, res: NextApiResponse) => {
  if (e.name == 'ValidationError') {
    e = parseYupValidationErrors(e)
  }

  let { status = 500, message, errors } = e
  if (!message) {
    message = defaultErrorMessage
  }

  res.status(status).json({ message, errors })
}