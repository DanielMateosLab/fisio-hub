import { FormikHelpers } from 'formik'
import { FieldValidationError } from './errors'
import { HandleResult } from './types'


export default async <T>(
  values: T,
  { setSubmitting, setFieldError }: FormikHelpers<T>,
  setSubmitError: Function,
  path: string,
  handleResult: HandleResult
) => {
  let res
  try {
    setSubmitError('')
    res = await fetch(path, {
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

    handleResult(body)
  } catch (e) {
    if (res && res.status == 401) {
      return setSubmitError('Contraseña o dirección de correo electrónico incorrecta')
    }
    // Este punto es alcanzado solo cuando hay un error 500 que no se maneja.
    setSubmitError('Error en el servidor, prueba de nuevo más tarde.')
  } finally {
    setSubmitting(false)
  }
}