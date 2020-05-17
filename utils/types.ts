import { NextApiRequest, NextApiResponse } from 'next'

interface SuccessResponse<T> {
  status: 'success'
  data: T
}
interface FailResponse {
  status: 'fail'
  data: {
    [key: string]: string
  }
}
interface ErrorResponse {
  status: 'error'
  message: string
}
type NextFunction = (err?: any) => void

export type ResponseBody<T = { [key: string]: {} }> = SuccessResponse<T> | FailResponse | ErrorResponse

export interface RequestHandler<T = { [key: string]: {} }> {
  (req: NextApiRequest, res: NextApiResponse<ResponseBody<T>>, next: NextFunction ): void
}

export interface HandleResult<T = { [key: string]: any }> {
  (data: T): void
}

export interface RequestEndpoint {
  path: string
  method?: 'POST' | 'PUT'
}