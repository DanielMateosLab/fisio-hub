import { AppProps } from 'next/app'
import CssBaseline from '@material-ui/core/CssBaseline'
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../client/common/theme'
import { Provider } from 'react-redux'
import store from 'client/redux/store'
import UserFetcher from '../client/session/UserFetcher'

// import App from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store} >
        <UserFetcher >
          <Component {...pageProps} />
        </UserFetcher>
      </Provider>
    </ThemeProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
