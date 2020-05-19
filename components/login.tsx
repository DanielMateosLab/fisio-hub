import { loginValidationSchema } from '../utils/validation'
import CustomTextInput from './formUtils/customTextInput'
import CustomForm from './formUtils/customForm'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useDispatch } from 'react-redux'
import { logIn } from 'features/user/userSlice'

interface Props {
  email?: string
  avoidRoleSelection?: boolean
}

const Login = ({ email, avoidRoleSelection } : Props) => {
  const dispatch = useDispatch()

  return (
    <CustomForm
      initialValues={{
        email: email ? email : '',
        password: ''
      }}
      validationSchema={loginValidationSchema}
      submitButtonText="Iniciar sesión"
      requestEndpoint={{ path: `/api/login${ avoidRoleSelection ? '?avoidRoleSelection=1' : '' }` }}
      onSuccess={((data) => {
        dispatch(logIn(data))
      })}
    >
      { email
        ? <Typography variant="h6" > {email} </Typography>
        : <CustomTextInput name="email" label="Correo electrónico"/>
      }
      <CustomTextInput name="password" type="password" label="Contraseña"/>
    </CustomForm>
  )
}
export default Login