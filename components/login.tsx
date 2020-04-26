import React from "react"
import CustomTextInput from './customTextInput'
import { loginValidationSchema } from '../utils/validation'
import CustomForm from './customForm'


const Login = () => (
  <CustomForm
    initialValues={{
      email: '',
      password: ''
    }}
    validationSchema={loginValidationSchema}
    path="/api/login"
    submitButtonText="Iniciar sesión"
  >
    <CustomTextInput name="email" label="Correo electrónico"/>
    <CustomTextInput name="password" type="password" label="Contraseña"/>
  </CustomForm>
)
export default Login