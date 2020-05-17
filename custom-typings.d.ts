import { Db, MongoClient } from 'mongodb'
import { User } from 'storage/types'
import { RequestUser } from './pages/api/users'
import { ResponseBody } from './utils/types'

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