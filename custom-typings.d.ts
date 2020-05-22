import { Db, MongoClient } from 'mongodb'
import { ResponseBody } from './common/APITypes'
import { AuthData } from './server/passport'

declare module 'http' {
  interface IncomingMessage {
    db: Db
    dbClient: MongoClient

    session: any

    user: AuthData

    /** Adds the given info to the req.user (and serializes the user?) */
    logIn(user: AuthData, done: (err: any) => void): void
    logIn(user: AuthData, options: any, done: (err: any) => void): void

    logOut(): void

    isAuthenticated(): boolean
    isUnauthenticated(): boolean
  }

  interface ServerResponse {
    json: (body: ResponseBody) => void
  }
}
