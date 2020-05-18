import { userValidationSchema } from '../../utils/validation'
import CustomTextInput from '../formUtils/customTextInput'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from 'features/user/userSlice'
import { UserResponseData } from '../../pages/api/users'
import { Form, Formik } from 'formik'
import handleSubmit from '../../utils/handleSubmit'
import Grid from '@material-ui/core/Grid'
import FormFooter from '../formUtils/formFooter'
import UsedEmailWarning from './usedEmailWarning'
import SetMethodLink from './setMethodLink'
import Collapse from '@material-ui/core/Collapse'
import EmailAdornment from './emailAdornment'

const RegisterUser = () => {
  const dispatch = useDispatch()
  let [ submitError, setSubmitError ] = useState('')

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          repeatPassword: ''
        }}
        validationSchema={userValidationSchema}
        validateOnChange={false}
        onSubmit={async (values, formikHelpers ) => {
          await handleSubmit(
            values,
            formikHelpers,
            setSubmitError,
            { path: "/api/users" },
            ({ user }: UserResponseData) => {
            dispatch(setUser(user!))
          })
        }}
      >
        {({ isSubmitting, isValid, errors }) => {
          const registeredEmail = errors.email === 'El email está registrado'

          return (
            <Form>
              <Grid container justify="center">
                <CustomTextInput
                  name="email"
                  label="Correo electrónico"
                  InputProps={{
                    endAdornment: registeredEmail && <EmailAdornment />
                  }}
                />

                <Collapse in={registeredEmail}>
                  <UsedEmailWarning>
                    <SetMethodLink text="Inicia sesión" method="login"/>
                  </UsedEmailWarning>
                </Collapse>

                <CustomTextInput
                  name="password"
                  type="password"
                  label="Contraseña"
                  disabled={registeredEmail}
                />

                <CustomTextInput
                  name="repeatPassword"
                  type="password"
                  label="Repite la contraseña"
                  disabled={registeredEmail}
                />

                <FormFooter
                  submitButtonText={'Registrarme'}
                  submitError={submitError}
                  disabled={!isValid || isSubmitting}
                />
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default RegisterUser