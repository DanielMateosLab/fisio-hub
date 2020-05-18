import React from 'react'
import InputAdornment from '@material-ui/core/InputAdornment'
import WarningIcon from '@material-ui/icons/Warning'
import amber from '@material-ui/core/colors/amber'

const EmailAdornment: React.FC = () => (
  <InputAdornment position="end">
    <WarningIcon
      style={{ color: amber['500'] }}
      fontSize="large"
    />
  </InputAdornment>
)

export default EmailAdornment