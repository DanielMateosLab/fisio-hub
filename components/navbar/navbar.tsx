import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import ToolbarContent from './toolbarContent'
import Toolbar from '@material-ui/core/Toolbar'

interface Props {
  userRequested: boolean
}
const Navbar: React.FC<Props> = ({userRequested}) => {
  return (
    <AppBar position="static">
      <Toolbar>
        { userRequested && <ToolbarContent /> }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar