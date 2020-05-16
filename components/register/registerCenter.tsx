import CustomForm from '../formUtils/customForm'
import { registerValidationSchema } from '../../utils/validation'
import CustomTextInput from '../formUtils/customTextInput'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import Typography from '@material-ui/core/Typography'

const RegisterCenter = () => {
  const email = useSelector((state: RootState) => state.user.user?.email)

  return (
    <CustomForm
      initialValues={{
        firstName: '',
        lastName: '',
        centerName: '',
      }}
      validationSchema={registerValidationSchema}
      submitButtonText="Finalizar"
      path="/api/register"
      handleResult={(({ professional }) => {
        return true
      })}
    >
      <Typography variant="h6" > {email} </Typography>
      <CustomTextInput name="firstName" label="Nombre"/>
      <CustomTextInput name="lastName" label="Apellidos"/>
      <CustomTextInput name="centerName" label="El nombre de tu centro o servicio"/>
    </CustomForm>
  )
}

export default RegisterCenter