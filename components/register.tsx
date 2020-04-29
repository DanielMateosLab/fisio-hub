import React, { useEffect } from 'react'
import CustomTextInput from './customTextInput'
import { registerValidationSchema } from '../utils/validation'
import CustomForm from './customForm'
import { useUser } from '../utils/hooks'
import Router from 'next/router'


const Register = () => {
  const { user, mutate } = useUser()

  useEffect(() => {
    if (user) {
      Router.push('/user')
    }
  }, [user])

  return (
    <CustomForm
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: ''
      }}
      validationSchema={registerValidationSchema}
      submitButtonText="Registrarme"
      path="/api/register"
      handleResult={(({ professional }) => {
        mutate(professional)
      })}
    >
      <CustomTextInput name="firstName" label="Nombre"/>
      <CustomTextInput name="lastName" label="Apellidos"/>
      <CustomTextInput name="email" label="Correo electrónico"/>
      <CustomTextInput name="password" type="password" label="Contraseña"/>
      <CustomTextInput
        name="repeatPassword"
        label="Repite la contraseña"
        type="password"
      />
    </CustomForm>
  )
}
export default Register