import React from 'react'
import CustomTextInput from 'components/customTextInput'
import { registerValidationSchema } from 'utils/validation'
import CustomForm from 'components/customForm'
import { useGuestOnly, useUser } from 'utils/hooks'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import SwitchAuthFooter from 'components/switchAuthFooter'

const Register = () => {
  const { mutate } = useUser()
  useGuestOnly()

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Regístrate
      </Typography>
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
      <SwitchAuthFooter auxiliaryText="¿Ya estás registrado? " linkText="Inicia sesión" href="/login" />
    </Container>
  )
}
export default Register