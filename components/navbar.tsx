import React from 'react'
import { useUser } from '../utils/hooks'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  main: {
    flex: '1',
    justifyContent: 'space-evenly'
  }
})

const Navbar = () => {
  const { user, mutate } = useUser()
  const { main } = useStyles()

  const handleLogout = async () => {
    await fetch('/api/login', {
      method: 'DELETE'
    })
    mutate(null)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">FisioHub</Typography>
        <div className={main} />
        { user && <Button onClick={handleLogout} variant="text" color="inherit">Cerrar sesión</Button>}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar