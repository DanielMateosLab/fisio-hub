import CustomTextInput from '../formUtils/customTextInput'
import React, { useState } from 'react'
import UsedEmailWarning from './usedEmailWarning'
import Collapse from '@material-ui/core/Collapse'
import * as Yup from 'yup'
import EmailAdornment from './emailAdornment'
import SetMethodLink from './setMethodLink'
import { useDispatch } from 'react-redux'
import { setRegisteredEmail } from 'features/user/registerSlice'
import { UserResponseBody } from '../../pages/api/users'
import fetcher from '../../utils/fetcher'

export type UserStatus = 'noChecked' | 'checking' | 'registered' | 'free'

const RegisterEmailInput: React.FC = () => {
  const [ userStatus, setUserStatus ] = useState<UserStatus>('noChecked')
  const dispatch = useDispatch()

  async function validateEmail(email: string) {
    if (userStatus === 'free') return
    setUserStatus('noChecked')

    const isEmail = await Yup.string()
      .email('La dirección de correo electrónico no es válida')
      .required('Campo obligatorio')
      .validate(email)
      .catch(() => false)

    if (!isEmail) return

    setUserStatus('checking')

    console.log('Email validado')
    const emailExists = await fetcher(`/api/users?email=${email}`)
      .catch(() => false)
      .then((res: UserResponseBody) => res.status === 'success' && !!res.data.user)

    if (emailExists) {
      setUserStatus('registered')
      dispatch(setRegisteredEmail(email))
    } else {
      setUserStatus('free')
    }
  }

  return (
    <>
      <CustomTextInput
        name="email"
        label="Correo electrónico"
        validate={validateEmail}
        onFocus={() => {
          setRegisteredEmail('')
          setUserStatus('noChecked')
        }}
        InputProps={{
          endAdornment: <EmailAdornment status={userStatus} />
        }}
      />

      <Collapse in={userStatus == 'registered'}>
        <UsedEmailWarning>
          <SetMethodLink text="Inicia sesión" method="login"/>
        </UsedEmailWarning>
      </Collapse>
    </>
  )
}

export default RegisterEmailInput