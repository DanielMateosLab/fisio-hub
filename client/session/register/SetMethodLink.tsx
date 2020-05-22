import React from 'react'
import Link from '@material-ui/core/Link'
import { AuthenticateUserMethods } from './AuthenticateUser'
import { useDispatch } from 'react-redux'
import { setMethod, setRegisteredEmail } from 'client/redux/registerSlice'

interface Props {
  text: string
  method: AuthenticateUserMethods
  registeredEmail?: string
}

const SetMethodLink: React.FC<Props> = ({ text, method, registeredEmail = ''}) => {
  const dispatch = useDispatch()

  function handleClick(event: React.SyntheticEvent) {
    event.preventDefault()
    dispatch(setRegisteredEmail(registeredEmail))
    dispatch(setMethod(method))
  }

  return (
    <Link href="#" onClick={handleClick}>
      {" "} {text} {" "}
    </Link>
  )
}

export default SetMethodLink