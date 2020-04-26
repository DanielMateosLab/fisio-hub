import React, { useState } from "react"
import { Formik, Form } from 'formik'
import CustomTextInput from './customTextInput'
import Grid from '@material-ui/core/Grid'
import { loginValidationSchema } from '../utils/validation'
import handleSubmit from '../utils/handleSubmit'
import FormFooter from '../components/formFooter'


const Login = () => {
  let [submitError, setSubmitError] = useState('')

  return(
    <div>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={loginValidationSchema}
        onSubmit={async (values, formikHelpers) => {
          await handleSubmit(values, formikHelpers, '/api/login', setSubmitError)
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <Grid container justify="center">
              <CustomTextInput name="email" label="Correo electrónico"/>
              <CustomTextInput name="password" type="password" label="Contraseña"/>
              <FormFooter isSubmitting={isSubmitting} submitError={submitError} submitButtonText='Iniciar sesión' />
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  )
}
export default Login