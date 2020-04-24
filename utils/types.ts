import { NextApiRequest, NextApiResponse } from "next";
import { Db } from "mongodb";

export interface CustomApiRequest extends NextApiRequest {
  db: Db
}

export type CustomApiHandler<T = any> = (
  req: CustomApiRequest,
  res: NextApiResponse<T>
) => void 

export interface ProffesionalInfo {
  name: string
  email: string
  password: string
}