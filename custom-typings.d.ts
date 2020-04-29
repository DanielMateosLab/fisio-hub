import { Db } from 'mongodb'
import { Professional } from './storage/professionalsDAO'
import { MongoClient } from 'mongodb'
import { User } from 'passport'
import { ResponseBody } from './utils/types'

declare module 'http' {
  interface IncomingMessage {
    db: Db
    dbClient: MongoClient

    user: Professional

    logIn(user: User, done: (err: any) => void): void
    logIn(user: User, options: any, done: (err: any) => void): void

    logOut(): void

    isAuthenticated(): boolean
    isUnauthenticated(): boolean
  }

  interface ServerResponse {
    json: (body: ResponseBody) => void
  }
}