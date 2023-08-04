import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '..'
import { useCallback } from 'react'
import { Login, Logout } from '../slice/user'

function useUser(): any {
  const dispatch = useDispatch()

  const name = useSelector((state: RootState) => state.user.name)
  const nickname = useSelector((state: RootState) => state.user.nickname)
  const email = useSelector((state: RootState) => state.user.email)
  const accessToken = useSelector((state: RootState) => state.user.accessToken)

  const login = useCallback(
    (
      name: string,
      nickname: string,
      email: string,
      age: number,
      gender: string,
      accessToken: string
    ) => {
      dispatch(Login({ name, nickname, email, age, gender, accessToken }))

      localStorage.setItem(
        'user',
        JSON.stringify({ name, nickname, accessToken })
      )
    },
    []
  )

  const logout = useCallback(() => {
    dispatch(Logout())

    localStorage.removeItem('user')
  }, [])

  const loadUserInfo = useCallback(() => {
    const userinfoJson = localStorage.getItem('user')
    const userinfo = userinfoJson !== null ? JSON.parse(userinfoJson) : null
    return userinfo
  }, [])

  return { name, nickname, email, accessToken, login, loadUserInfo, logout }
}

export default useUser
