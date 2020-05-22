import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import RegisterCenterForm from '../client/session/register/RegisterCenterForm'
import AuthenticateUser from '../client/session/register/AuthenticateUser'
import { useSelector } from 'react-redux'
import { RootState } from '../client/redux/rootReducer'
import { useRouter } from 'next/router'

const Register = () => {
  const { user, professional } = useSelector((state: RootState) => state.session)
  const router = useRouter()

  useEffect(() => {
    professional && router.push('/user')
  }, [professional])

  const step = user ? 1 : 0
  const steps = ['Tus datos de acceso', 'Algunos detalles más...']

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AuthenticateUser />
      case 1:
        return <RegisterCenterForm />
      default:
        return 'No deberías haber llegado hasta aquí'
    }
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        ¡Empieza a usar FisioHub!
      </Typography>

      <Stepper activeStep={step} orientation="horizontal">
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