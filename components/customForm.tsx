import React, { useState } from 'react'
import { Form, Formik, FormikValues } from 'formik'
import handleSubmit from '../utils/handleSubmit'
import Grid from '@material-ui/core/Grid'
import FormFooter from './formFooter'
import { InferType } from 'prop-types'
import { HandleResult } from '../utils/types'


interface CustomFormProps<T extends FormikValues = FormikValues> {
  initialValues: T
  validationSchema: InferType<T>
  /** The path where a POST request is made when submitting the form. Via {@link handleSubmit} */
  path: string
  handleResult: HandleResult
  submitButtonText: string
}

/**
 * - Uses Formik to manage form state and validation logic.
 * - Puts the children inside a center justified Grid container.
 * - Appends {@link FormFooter} to the end - A MaterialUI button with submission errors above.
 * - Encapsulates submission logic and error handling with {@link handleSubmit} util. */
const CustomForm: React.FC<CustomFormProps> = (
  { initialValues,
    validationSchema,
    path,
    handleResult,
    submitButtonText,
    children
  }) => {
  let [ submitError, setSubmitError ] = useState('')

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, formikHelpers ) => {
        await handleSubmit(values, formikHelpers, setSubmitError, path, handleResult)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid container justify="center">
            { children }
            <FormFooter
              submitButtonText={submitButtonText}
              submitError={submitError}
              isSubmitting={isSubmitting}
            />
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
export default CustomForm