import { NextApiRequest, NextApiResponse } from 'next'
import { UserResponseData } from '../pages/api/users'

export interface SuccessResponse {
  status: 'success'
  data: UserResponseData
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

export type ResponseBody = SuccessResponse | FailResponse | ErrorResponse

export interface RequestHandler {
  (req: NextApiRequest, res: NextApiResponse<ResponseBody>, next: NextFunction ): void
}

export interface OnSuccess {
  (data: SuccessResponse['data']): void
}

export interface RequestEndpoint {
  path: string
  method?: 'POST' | 'PUT'
}

export type WithoutPassword<T> = Omit<T, 'password'>