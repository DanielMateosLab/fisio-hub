import React, { useEffect } from "react"
import CustomTextInput from 'components/customTextInput'
import { loginValidationSchema } from 'utils/validation'
import CustomForm from 'components/customForm'
import { useUser } from 'utils/hooks'
import Router from 'next/router'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import SwitchAuthFooter from 'components/switchAuthFooter'

const Login = () => {
  const { user, mutate } = useUser()

  useEffect(() => {
    if (user) {
      Router.push('/user')
    }
  }, [user])

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Inicia sesión
      </Typography>
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
      <SwitchAuthFooter auxiliaryText="¿No tienes cuenta? " linkText="Regístrate" href="/register" />
    </Container>
  )
}
export default Login