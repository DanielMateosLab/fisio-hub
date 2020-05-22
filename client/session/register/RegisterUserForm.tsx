import { userClientValidationSchema } from '../../../common/validation'
import CustomTextInput from '../../common/CustomTextInput'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logIn } from 'client/redux/sessionSlice'
import { Form, Formik } from 'formik'
import handleSubmit from '../../common/handleSubmit'
import Grid from '@material-ui/core/Grid'
import FormFooter from '../../common/FormFooter'
import SetMethodLink from './SetMethodLink'
import Collapse from '@material-ui/core/Collapse'
import EmailAdornment from './EmailAdornment'
import Typography from '@material-ui/core/Typography'

const RegisterUserForm = () => {
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
                  <Typography gutterBottom>
                    Vaya, el correo electrónico ya está registrado.
                    <SetMethodLink text="Inicia sesión" method="login" registeredEmail={values.email} />
                    o utiliza otro email.
                  </Typography>
                  <Typography variant="body2">¿Sorprendido? No te preocupes, probablemente otro centro en el que trabajes o del que
                    seas paciente utilice nuestra plataforma. Puedes utilizar el mismo correo con todos tus usuarios, si bien la
                    información y los datos son independientes.
                  </Typography>
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

export default RegisterUserForm