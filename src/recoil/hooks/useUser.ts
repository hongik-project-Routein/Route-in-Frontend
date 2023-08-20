import { useRecoilState, useResetRecoilState } from 'recoil'
import user, { type UserState } from '../atom/user'
import { useCallback } from 'react'

interface UserFunctions {
  loadUserInfo: () => UserState
  login: (userinfo: UserState) => void
  logout: () => void
}

function useUser(): UserFunctions {
  const [userinfo, setUserinfo] = useRecoilState<UserState>(user)
  const resetUserinfo = useResetRecoilState(user)

  const loadUserInfo = useCallback(() => {
    return userinfo
  }, [])

  const login = useCallback((userinfo: UserState) => {
    setUserinfo(userinfo)
  }, [])

  const logout = useCallback(() => {
    resetUserinfo()
  }, [])

  return {
    loadUserInfo,
    login,
    logout,
  }
}

export default useUser
