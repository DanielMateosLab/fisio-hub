import { NextApiRequest, NextApiResponse } from 'next'
import { Professional } from 'storage/types'
import { FieldError } from './errors'

type NextHandler = (err?: any) => void
export interface Middleware {
  (req: NextApiRequest, res: NextApiResponse, next: NextHandler): void
}

export interface ResponseBody {
  professional?: Omit<Professional, 'password'>
  message?: String
  errors?: FieldError[]
}

export interface HandleResult {
  (resBody: ResponseBody): void
}