import React from 'react'
import Link from '@material-ui/core/Link'
import { AuthenticateUserMethods } from './authenticateUser'
import { useDispatch } from 'react-redux'
import { setMethod } from 'features/user/registerSlice'

interface Props {
  text: string
  method: AuthenticateUserMethods
}

const SetMethodLink: React.FC<Props> = ({ text, method}) => {
  const dispatch = useDispatch()

  function handleClick(event: React.SyntheticEvent) {
    event.preventDefault()
    dispatch(setMethod(method))
  }

  return (
    <Link href="#" onClick={handleClick}>
      {" "} {text} {" "}
    </Link>
  )
}

export default SetMethodLink