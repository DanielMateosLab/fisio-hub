import { FormikHelpers, FormikValues } from 'formik'
import { OnSuccess, RequestEndpoint } from './types'
import { fetchPostOrPut } from './fetcher'
import setFormErrors from './setFormErrors'

export default async(
  values: FormikValues,
  { setSubmitting, setFieldError }: FormikHelpers<any>,
  requestEndpoint: RequestEndpoint,
  onSuccess: OnSuccess
) => {
  try {
    const resBody = await fetchPostOrPut(requestEndpoint.path, values, 'POST')

    if (resBody.status !== 'success') {
      setFormErrors(resBody, setFieldError)
    } else {
      onSuccess(resBody.data)
    }
  } catch (e) {
    setFieldError(
      'submit',
      `Ha ocurrido un error desconocido, vuelve a intentarlo más tarde.
      Si el error persiste contacta con los administradores`
    )
  } finally {
    setSubmitting(false)
  }
}