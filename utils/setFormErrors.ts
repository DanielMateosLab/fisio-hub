import { FormikHelpers } from 'formik'
import { ResponseBody } from './types'

interface SetFormErrors {
  (body: ResponseBody ,setFieldError: FormikHelpers<any>['setFieldError']): void
}
const setFormErrors: SetFormErrors = (body, setFieldError) => {
  if (body.status === 'fail') {
    const errors = Object.keys(body.data)

    if (!errors.length) return setFieldError(
      'submit',
      `Ha ocurrido un error desconocido, vuelve a intentarlo más tarde. 
      Si el error persiste contacta con los administradores`
    )

    return errors.forEach(field => setFieldError(field, body.data[field]))
  }

  if (body.status === 'error') return setFieldError('submit', body.message)
}

export default setFormErrors