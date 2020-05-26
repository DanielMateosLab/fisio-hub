import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import teal from '@material-ui/core/colors/teal'

export default createMuiTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#b71c1c',
      dark: '#7f0000',
      light: '#f05545',
      contrastText: '#ffffff'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: 16,
          height: 16,
          background: 'transparent'
        },
        '*::-webkit-scrollbar-thumb': {
          border: '4px solid white',
          borderRadius: 8,
          background: 'lightgrey',
          '&:hover': {
            background: 'darkgrey'
          }
        }
      }
    }
  }
})