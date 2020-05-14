import { Middleware } from '../utils/types'
import ProfessionalsDAO from '../storage/professionalsDAO'
import usersDAO from '../storage/usersDAO'
import centersDAO from '../storage/centersDAO'

export const professionals: Middleware = (req, res, next) => {
  ProfessionalsDAO.injectDB(req.dbClient)
  next()
}

export const users: Middleware = (req, res, next) => {
  usersDAO.injectDB(req.db)
  next()
}

export const centers: Middleware = (req, res, next) => {
  centersDAO.injectDB(req.db)
  next()
}