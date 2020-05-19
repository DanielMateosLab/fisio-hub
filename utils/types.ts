import { NextApiRequest, NextApiResponse } from 'next'
import { UserResponseData } from '../pages/api/users'
import { ProfessionalsResponseData } from '../pages/api/professionals'

type DefaultSuccessResBody = Partial<UserResponseData & ProfessionalsResponseData>

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

export type WithoutPassword<T> = Omit<T, 'password'>