import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './styles/theme-components'
import theme from './styles/Theme'
import GlobalStyle from './styles/GlobalStyle'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ScrollToTop from './util/scrollToTop'

// import { worker } from './mocks/browser'

// if (process.env.NODE_ENV === 'development') {
//   // eslint-disable-next-line @typescript-eslint/no-floating-promises
//   worker.start()
// }

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <BrowserRouter>
      <ScrollToTop />
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </ThemeProvider>
)
