import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      black: string
      white: string
      gray: string
      danger: string
      success: string
      warning: string
      info: string
      bg: string
    }
    fonts: {
      sizes: {
        small: number
        medium: number
        large: number
        xlarge: number
        xxlarge: number
      }
      weights: {
        light: string
        regular: string
        bold: string
      }
    }
    screens: {
      width: number
      height: number
    }
  }
}
