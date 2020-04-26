import { FormikHelpers } from 'formik'
import { FieldValidationError } from './validation'


export default async <T>(
  values: T,
  { setSubmitting, setFieldError }: FormikHelpers<T>,
  path: string,
  setSubmitError: Function
) => {
  try {
    const res = await fetch(path, {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    const body = await res.json()

    if(!res.ok) {
      const { errors, message } = body as FieldValidationError
      if (message == 'Validation Error' && errors && errors.length) {
        return errors.map(({ field, message }) => setFieldError(field, message))
      }
      return setSubmitError(message)
    }

    console.log(body)
  } catch (e) {
    setSubmitError(e.message)
  } finally {
    setSubmitting(false)
  }
}