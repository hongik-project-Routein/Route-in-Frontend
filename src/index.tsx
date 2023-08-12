import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Routes'
import { ThemeProvider } from './styles/theme-components'
import theme from './styles/Theme'
import GlobalStyle from './styles/GlobalStyle'
import { Provider } from 'react-redux'
import { RecoilRoot } from 'recoil'
import store from './modules/store'
import { CookiesProvider } from 'react-cookie'

import { worker } from './mocks/browser'

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  worker.start()
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <RecoilRoot>
          <Provider store={store}>
            <Router />
          </Provider>
        </RecoilRoot>
      </CookiesProvider>
    </ThemeProvider>
  </>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
