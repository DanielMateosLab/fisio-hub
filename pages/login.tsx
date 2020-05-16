import React from "react"
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import SwitchAuthFooter from 'components/switchAuthFooter'
import Login from '../components/login'

export default () => {
  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Inicia sesión
      </Typography>
      <Login handleResult={() => {}} />
      <SwitchAuthFooter auxiliaryText="¿No tienes cuenta? " linkText="Regístrate" href="/register" />
    </Container>
  )
}