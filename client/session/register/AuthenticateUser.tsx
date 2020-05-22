import React from 'react'
import LoginForm from '../login/LoginForm'
import RegisterUserForm from './RegisterUserForm'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import SetMethodLink from './SetMethodLink'
import withGrowTransition from '../../common/withGrowTransition'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/rootReducer'

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(3)
  }
}))

export type AuthenticateUserMethods = 'login' | 'register'

const AuthenticateUser: React.FC = () => {
  const { method, registeredEmail } = useSelector((state: RootState) => state.register)
  const { marginTop } = useStyles()

  const LoginUser = () => {
    return (
      <>
        <LoginForm avoidRoleSelection email={registeredEmail} />
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
      { withGrowTransition(<RegisterUserForm/>, method == 'register') }
      { withGrowTransition(<LoginUser />, method == 'login') }
    </>
  )
}

export default AuthenticateUser