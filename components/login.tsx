import React, { useEffect } from "react"
import CustomTextInput from './customTextInput'
import { loginValidationSchema } from '../utils/validation'
import CustomForm from './customForm'
import { useUser } from '../utils/hooks'
import Router from 'next/router'

const Login = () => {
  const { user, mutate } = useUser()

  useEffect(() => {
    if (user) {
      Router.push('/user')
    }
  }, [user])

  return (
    <CustomForm
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={loginValidationSchema}
      submitButtonText="Iniciar sesión"
      path="/api/login"
      handleResult={({ professional }) => {
        mutate(professional)
      }}
    >
      <CustomTextInput name="email" label="Correo electrónico"/>
      <CustomTextInput name="password" type="password" label="Contraseña"/>
    </CustomForm>
  )
}
export default Login