import { FormikHelpers } from 'formik'
import { FieldValidationError } from './errors'


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
        return errors.forEach(({ field, message }) => setFieldError(field, message))
      }
      return setSubmitError(message)
    }

    console.log(body)
  } catch (e) {
    // Este punto es alcanzado solo cuando hay un error 500 que no se maneja.
    setSubmitError('Error en el servidor, prueba de nuevo más tarde.')
  } finally {
    setSubmitting(false)
  }
}