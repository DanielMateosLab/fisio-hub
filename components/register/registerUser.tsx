import CustomForm from '../formUtils/customForm'
import { registerValidationSchema } from '../../utils/validation'
import CustomTextInput from '../formUtils/customTextInput'
import React from 'react'
import RegisterEmailInput from './registerEmailInput'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import { setStep } from 'features/user/registerSlice'

const RegisterUser = () => {
  const dispatch = useDispatch()
  const { registeredEmail } = useSelector((state: RootState) => state.register)

  return (
    <div>
      <CustomForm
        initialValues={{
          email: '',
          password: '',
          repeatPassword: ''
        }}
        validationSchema={registerValidationSchema}
        submitButtonText="Registrarme"
        path="/api/register"
        handleResult={() => {
          dispatch(setStep(1))
        }}
        submitButtonDisabled={!!registeredEmail}
      >
        <RegisterEmailInput />

        <CustomTextInput
          name="password"
          type="password"
          label="Contraseña"
          disabled={!!registeredEmail}
        />

        <CustomTextInput
          name="repeatPassword"
          type="password"
          label="Repite la contraseña"
          disabled={!!registeredEmail}
        />
      </CustomForm>
    </div>
  )
}

export default RegisterUser