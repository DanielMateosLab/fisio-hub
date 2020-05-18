import React from 'react'
import { Form, Formik, FormikValues } from 'formik'
import handleSubmit from '../../utils/handleSubmit'
import Grid from '@material-ui/core/Grid'
import FormFooter from './formFooter'
import { HandleResult, RequestEndpoint } from '../../utils/types'
import { ObjectSchema } from 'yup'


interface CustomFormProps<T extends FormikValues = FormikValues> {
  initialValues: T
  validationSchema: ObjectSchema<T>
  requestEndpoint: RequestEndpoint
  handleResult: HandleResult
  submitButtonText: string
  validateOnBlur?: boolean
  validateOnChange?: boolean
}

/**
 * - Uses Formik to manage form state and validation logic.
 * - Puts the children inside a center justified Grid container.
 * - Appends {@link FormFooter} to the end - A MaterialUI button with submission errors above.
 * - Encapsulates submission logic and error handling with {@link handleSubmit} util. */
const CustomForm: React.FC<CustomFormProps> = (props) => {
  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      validateOnBlur={props.validateOnBlur}
      validateOnChange={props.validateOnChange}
      onSubmit={async (values, formikHelpers ) => {
        await handleSubmit(values, formikHelpers, props.requestEndpoint, props.handleResult)
      }}
    >
      {({ isSubmitting, errors, isValid }) => (
        <Form>
          <Grid container justify="center">
            { props.children }
            <FormFooter
              submitButtonText={props.submitButtonText}
              submitError={errors.submit as any}
              disabled={isSubmitting || !isValid}
            />
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
export default CustomForm