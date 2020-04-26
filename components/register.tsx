import React from 'react'
import CustomTextInput from './customTextInput'
import { registerValidationSchema } from '../utils/validation'
import CustomForm from './customForm'


const Register = () => (
  <CustomForm
    initialValues={{
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: ''
    }}
    validationSchema={registerValidationSchema}
    path="/api/register"
    submitButtonText="Registrarme"
  >
    <CustomTextInput name="firstName" label="Nombre" />
    <CustomTextInput name="lastName" label="Apellidos" />
    <CustomTextInput name="email" label="Correo electrónico" />
    <CustomTextInput name="password" type="password" label="Contraseña" />
    <CustomTextInput
      name="repeatPassword"
      label="Repite la contraseña"
      type="password"
    />
  </CustomForm>
)

export default Register