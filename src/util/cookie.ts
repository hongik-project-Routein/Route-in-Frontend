import { Cookies } from 'react-cookie'

const cookies = new Cookies()

// refresh token을 cookie에 저장하기 위해
export const setRefreshToken = (refreshToken: string): void => {
  const today = new Date()
  const expireDate = today.setDate(today.getDate() + 7)

  cookies.set('refresh_token', refreshToken, {
    sameSite: 'strict',
    path: '/',
    expires: new Date(expireDate),
  })
}

// cookie에 저장된 refresh token 값을 가져오기 위한 함수
export const getCookieToken = (): any => {
  return cookies.get('refresh_token')
}

// cookie 삭제를 위한 함수 (logout)
export const removeCookieToken = (): void => {
  cookies.remove('refresh_token', { sameSite: 'strict', path: '/' })
}
