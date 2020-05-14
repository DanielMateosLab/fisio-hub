import { Db, MongoClient } from 'mongodb'
import { User } from 'passport'
import { ResponseBody } from './utils/types'
import { RequestUser } from './utils/passport'


declare module 'http' {
  interface IncomingMessage {
    db: Db
    dbClient: MongoClient

    user: RequestUser

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