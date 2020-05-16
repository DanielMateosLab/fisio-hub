import React from 'react'
import Login from '../login'
import RegisterUser from './registerUser'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import SetMethodLink from './setMethodLink'
import withGrowTransition from '../withGrowTransition'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import { setStep } from 'features/user/registerSlice'

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(3)
  }
}))

export type AuthenticateUserMethods = 'login' | 'register'

const AuthenticateUser: React.FC = () => {
  const { method, registeredEmail } = useSelector((state: RootState) => state.register)
  const { marginTop } = useStyles()
  const dispatch = useDispatch()

  const LoginUser = () => {
    return (
      <>
        <Login
          email={registeredEmail}
          handleResult={() => {
            // Not fired because handleSubmit request is not successful
            dispatch(setStep(1))
          }}
        />
        <Typography align="center" className={marginTop}>
          ¿Has cambiado de idea?
          <SetMethodLink
            text="Utilizar otra dirección de correo."
            method="register"
          />
        </Typography>
      </>
    )
  }

  return (
    <>
      { withGrowTransition(<RegisterUser/>, method == 'register') }
      { withGrowTransition(<LoginUser />, method == 'login') }
    </>
  )
}

export default AuthenticateUser