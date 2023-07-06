import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Routes'
import { ThemeProvider } from './styles/theme-components'
import theme from './styles/Theme'
import GlobalStyle from './styles/GlobalStyle'
import { legacy_createStore as createStore } from 'redux'
import rootReducer from './modules'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { worker } from './mocks/browser'

const store = createStore(rootReducer, composeWithDevTools())

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  worker.start()
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ThemeProvider>
  </>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
