import { Db, MongoClient } from 'mongodb'
import { User } from 'storage/types'
import { ResponseBody } from './utils/types'
import { AuthData } from './utils/passport'

declare module 'http' {
  interface IncomingMessage {
    db: Db
    dbClient: MongoClient

    session: any

    user: AuthData

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