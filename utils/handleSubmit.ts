import { ValidationErrorBody } from './validation'
import { FormikHelpers } from 'formik'

export default async <T>(
  values: T,
  { setSubmitting, setFieldError }: FormikHelpers<T>,
  path: string,
  setSubmitError: Function
) => {
  try {
    const res = await fetch(path, {
      method: 'post',
      body: JSON.stringify(values)
    })
    if (res.status == 400) {
      const { errors }: ValidationErrorBody = await res.json()
      for (const fieldError of errors) {
        const { field, message } = fieldError
        setFieldError(field, message)
      }
      return
    }
    if (!res.ok) {
      const { message } = await res.json()
      setSubmitError(message)
    }
  } catch (e) {
    setSubmitError(e.message)
  } finally {
    setSubmitting(false)
  }
}