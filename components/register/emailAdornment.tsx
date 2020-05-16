import React from 'react'
import InputAdornment from '@material-ui/core/InputAdornment'
import CircularProgress from '@material-ui/core/CircularProgress'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import green from '@material-ui/core/colors/green'
import WarningIcon from '@material-ui/icons/Warning'
import amber from '@material-ui/core/colors/amber'
import { UserStatus } from './registerEmailInput'

interface AdornmentProps {
  status: UserStatus
}
const EmailAdornment: React.FC<AdornmentProps> = ({ status }) => {
  const checkingUser = status == 'checking'
  const isUserRegistered = status == 'registered'
  const isUserFree = status == 'free'

  return (
    <InputAdornment position="end">
      { checkingUser && <CircularProgress /> }
      { isUserFree && <CheckCircleIcon
        style={{ color: green['500'] }}
        fontSize="large"
      />}
      { isUserRegistered && <WarningIcon
        style={{ color: amber['500'] }}
        fontSize="large"
      />}
    </InputAdornment>
  )
}

export default EmailAdornment