import { loginValidationSchema } from '../utils/validation'
import CustomTextInput from './formUtils/customTextInput'
import CustomForm from './formUtils/customForm'
import React from 'react'
import Typography from '@material-ui/core/Typography'

interface Props {
  email?: string
  handleResult: (resBody: any) => void
}

const Login = ({ email, handleResult } : Props) => {
  return (
    <CustomForm
      initialValues={{
        email: email ? email : '',
        password: ''
      }}
      validationSchema={loginValidationSchema}
      submitButtonText="Iniciar sesión"
      path="/api/login"
      handleResult={handleResult}
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