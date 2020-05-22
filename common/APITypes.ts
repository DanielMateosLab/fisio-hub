import { NextApiRequest, NextApiResponse } from 'next'
import { UserResponseData } from '../pages/api/users'
import { ProfessionalsResponseData } from '../pages/api/professionals'
import { Center } from './entityTypes'

type DefaultSuccessResBody = Partial<UserResponseData & ProfessionalsResponseData & { center: Center }>

export interface SuccessResponse<T = DefaultSuccessResBody> {
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

export type ResponseBody<T = DefaultSuccessResBody> = SuccessResponse<T> | FailResponse | ErrorResponse

export interface RequestHandler<T = DefaultSuccessResBody> {
  (req: NextApiRequest, res: NextApiResponse<ResponseBody<T>>, next: NextFunction ): void
}

export interface OnSuccess {
  (data: SuccessResponse['data']): void
}

export interface RequestEndpoint {
  path: string
  method?: 'POST' | 'PUT'
}

