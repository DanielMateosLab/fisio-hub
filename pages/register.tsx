import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import RegisterCenter from '../components/register/registerCenter'
import AuthenticateUser from '../components/register/authenticateUser'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'

const Register = () => {
  const { step } = useSelector((state: RootState) => state.register)
  const steps = ['Tus datos de acceso', 'Algunos detalles más...']

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AuthenticateUser />
      case 1:
        return <RegisterCenter />
      default:
        return 'No deberías haber llegado hasta aquí'
    }
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        ¡Empieza a usar FisioHub!
      </Typography>

      <Stepper activeStep={step}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {}
          return (
            <Step key={label} {...stepProps}>
              <StepLabel>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>

      { getStepContent(step) }
      
    </Container>
  )
}
export default Register