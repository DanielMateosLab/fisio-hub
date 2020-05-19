import CustomForm from '../formUtils/customForm'
import { centerValidationSchema } from '../../utils/validation'
import CustomTextInput from '../formUtils/customTextInput'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import Typography from '@material-ui/core/Typography'
import { logIn } from 'features/user/userSlice'


const RegisterCenter = () => {
  const email = useSelector((state: RootState) => state.user.user?.email)
  const dispatch = useDispatch()

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

export default RegisterCenter