import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { ObjectID } from 'mongodb'
import bcrypt from 'bcryptjs'
import { Professional } from '../storage/professionalsDAO'
import { NextApiRequest } from 'next'
import { loginValidationSchema, parseYupValidationErrors } from './validation'
import { LoginError } from './errors'


passport.serializeUser<Professional, string>((user, done) => {
  done(null, user._id!.toString())
})

passport.deserializeUser<Professional, string, NextApiRequest>((req, id, done: Function) => {
  req.db
    .collection('professionals')
    .findOne(new ObjectID(id))
    .then((user: Professional) => {
      done(null, user)
    })
})

passport.use(new LocalStrategy(
  { usernameField: 'email', passReqToCallback: true },
  async (req, email, password, done) => {
    try {
      const user = await req.db.collection('professionals').findOne({ email })
      const isValidPassword = await bcrypt.compare(password, user.password)

      if (user && isValidPassword) {
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