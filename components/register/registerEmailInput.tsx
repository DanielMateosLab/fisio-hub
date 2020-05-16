import CustomTextInput from '../formUtils/customTextInput'
import React, { useState } from 'react'
import UsedEmailWarning from './usedEmailWarning'
import Collapse from '@material-ui/core/Collapse'
import * as Yup from 'yup'
import EmailAdornment from './emailAdornment'
import SetMethodLink from './setMethodLink'
import { useDispatch } from 'react-redux'
import { setRegisteredEmail } from 'features/user/registerSlice'

export type UserStatus = 'noChecked' | 'checking' | 'registered' | 'free'

const RegisterEmailInput: React.FC = () => {
  const [ userStatus, setUserStatus ] = useState<UserStatus>('noChecked')
  const dispatch = useDispatch()

  async function validateEmailExistence(email: string) {
    if (userStatus == 'free') {
      return
    }
    setUserStatus('noChecked')
    dispatch(setRegisteredEmail('')) // Clean registeredEmail on new inputs

    const isEmail = await Yup
      .object({ email: Yup.string().email() })
      .validate({ email })
      .then(({ email } ) => !(email.length < 1))
      .catch(() => false)

    if (!isEmail) return

    setTimeout(() => {
      setUserStatus('checking')

      const emailExists = email == 'daniel.mat.lab@gmail.com' // TODO: this will be a query to the DB

      if (emailExists) {
        setUserStatus('registered')
        dispatch(setRegisteredEmail(email))
      } else {
        setUserStatus('free')
      }
    }, 1000)
  }

  return (
    <>
      <CustomTextInput
        name="email"
        label="Correo electrónico"
        validate={validateEmailExistence}
        onFocus={() => {
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