import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseBody } from '../utils/types'
import { ValidationError } from 'yup'

// Exported for testing purposes
export const defaultErrorMessage = 'Ha ocurrido un error desconocido en el servidor.'

export default (e: any, req: NextApiRequest, res: NextApiResponse<ResponseBody>) => {
  if (e.name == 'ValidationError') {
    const { inner, path, message } = e as ValidationError
    let data = {} as { [key: string]: string }

    if (!inner.length) {
      data[path] = message
    } else {
      inner.forEach(
        ({ path, message }) => { data[path] = message })
    }

    res.status(400).json({ status: 'fail', data })
  }

  let { status = 500, message, errmsg } = e
  if (!message) {
    message = errmsg? errmsg : defaultErrorMessage
  }

  res.status(status).json({ status: 'error', message })
}