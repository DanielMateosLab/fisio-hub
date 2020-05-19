import { userClientValidationSchema } from '../../utils/validation'
import CustomTextInput from '../formUtils/customTextInput'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logIn } from 'features/user/userSlice'
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

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          repeatPassword: ''
        }}
        validationSchema={userClientValidationSchema}
        onSubmit={async (values, formikHelpers ) => {
          await handleSubmit(
            values,
            formikHelpers,
            { path: "/api/users" },
            ({ user }) => {
            dispatch(logIn({ user }))
          })
        }}
      >
        {({ isSubmitting, isValid, errors, values }) => {
          const registeredEmail = !isValid && (errors.email === 'Ya hay un usuario con este correo electrónico')

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
                    <SetMethodLink text="Inicia sesión" method="login" registeredEmail={values.email} />
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
                  // @ts-ignore
                  submitError={errors.submit}
                  disabled={registeredEmail || isSubmitting}
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