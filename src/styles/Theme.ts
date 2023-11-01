import baseStyled, {
  css,
  type CSSProp,
  type ThemedStyledInterface,
} from 'styled-components'

const sizes: Record<string, number> = {
  desktop: 768,
  mobile: 480,
}

type BackQuoteArgs = string[]

interface Media {
  desktop: (...args: BackQuoteArgs) => CSSProp | undefined
  mobile: (...args: BackQuoteArgs) => CSSProp | undefined
}

const media: Media = {
  desktop: (...args: BackQuoteArgs) => undefined,
  mobile: (...args: BackQuoteArgs) => undefined,
}

Object.keys(sizes).reduce((acc: Media, label: string) => {
  switch (label) {
    case 'desktop':
      acc.desktop = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (min-width: ${sizes.desktop}px) {
            ${args}
          }
        `
      break
    case 'mobile':
      acc.mobile = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.mobile}px) {
            ${args}
          }
        `
      break
    default:
      break
  }
  return acc
}, media)

const colors = {
  white: '#ffffff',
  black: '#000000',
  primaryColor: '#50bbdf',
  primaryColorVarient: '#0080B8',
  primary100: '#b1e2f1',
  primary50: '#e0f4f9',
  disable: '#d9d9d9',
}

const secondaryColors = {
  secondary: '#DF7450',
}

const fontSizes: string[] = []

const theme = {
  colors,
  fontSizes,
  secondaryColors,
  media,
}

export type Theme = typeof theme
export const styled = baseStyled as ThemedStyledInterface<Theme>
export default theme
