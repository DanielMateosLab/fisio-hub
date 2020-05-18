import CustomForm from '../formUtils/customForm'
import { centerValidationSchema } from '../../utils/validation'
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
      validationSchema={centerValidationSchema}
      submitButtonText="Finalizar"
      requestEndpoint={{ path: "/api/centers" }}
      handleResult={(() => {
        return true
      })}
    >
      <Typography variant="h6" > {email} </Typography>
      {/* Prepopulate name and first name with the first role values? */}
      <CustomTextInput name="firstName" label="Nombre"/>
      <CustomTextInput name="lastName" label="Apellidos"/>
      <CustomTextInput name="centerName" label="El nombre de tu centro o servicio"/>
    </CustomForm>
  )
}

export default RegisterCenter