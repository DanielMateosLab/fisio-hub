import CustomForm from '../formUtils/customForm'
import { userValidationSchema } from '../../utils/validation'
import CustomTextInput from '../formUtils/customTextInput'
import React from 'react'
import RegisterEmailInput from './registerEmailInput'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import { setUser } from 'features/user/userSlice'
import { UserResponseData } from '../../pages/api/users'

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
        validationSchema={userValidationSchema}
        validateOnChange={false}
        submitButtonText="Registrarme"
        requestEndpoint={{ path: "/api/users" }}
        handleResult={({ user }: UserResponseData) => {
          dispatch(setUser(user!))
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