import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcryptjs'
import { User } from '../storage/types'
import { NextApiRequest } from 'next'
import { LoginError } from './errors'
import UsersDAO from '../storage/usersDAO'

passport.serializeUser<User, string>((user, done) => {
  done(null, user._id!.toString())
})

passport.deserializeUser<User, string, NextApiRequest>((req, id, done) => {
  UsersDAO.injectDB(req.db)
  UsersDAO.getUserById(new ObjectId(id))
    .then(user => user && done(null, user))
})

passport.use(new LocalStrategy(
  { usernameField: 'email', passReqToCallback: true },
  async (req, email, password, done) => {
    try {
      UsersDAO.injectDB(req.db)
      const user = await UsersDAO.getUserByEmail(email)
      const isValidPassword = user && user.password && await bcrypt.compare(password, user.password)

      if (isValidPassword) {
        done(null, user)
      } else {
        done(new LoginError(), false)
      }
    } catch (e) {
      done(new LoginError(), false)
    }
  }
))

export default passport