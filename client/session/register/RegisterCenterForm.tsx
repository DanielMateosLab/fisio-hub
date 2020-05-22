import CustomForm from '../../common/CustomForm'
import { centerValidationSchema } from '../../../common/validation'
import CustomTextInput from '../../common/CustomTextInput'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import Typography from '@material-ui/core/Typography'
import { logIn, logOut } from 'client/redux/sessionSlice'
import { setMethod } from 'client/redux/registerSlice'
import Button from '@material-ui/core/Button'

const RegisterCenterForm = () => {
  const email = useSelector((state: RootState) => state.session.user?.email)
  const dispatch = useDispatch()

  const CancelButton = (
    <Button
      color='default'
      tabIndex={-1}
      onClick={() => {
        dispatch(logOut())
        dispatch(setMethod('register'))
      }}> Cancelar
    </Button>)

  return (
    <CustomForm
      initialValues={{
        firstName: '',
        lastName: '',
        centerName: '',
      }}
      validationSchema={centerValidationSchema}
      submitButtonText="Finalizar"
      additionalButton={CancelButton}
      requestEndpoint={{ path: "/api/centers" }}
      onSuccess={((data) => {
        dispatch(logIn(data))
      })}
    >
      <Typography variant="h6" > {email} </Typography>
      <CustomTextInput name="firstName" label="Nombre"/>
      <CustomTextInput name="lastName" label="Apellidos"/>
      <CustomTextInput name="centerName" label="El nombre de tu centro o servicio"/>
    </CustomForm>
  )
}

export default RegisterCenterForm