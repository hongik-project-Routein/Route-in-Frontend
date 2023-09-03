import React from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  isLogin: boolean
  component: JSX.Element
}

function PrivateRoute({
  isLogin,
  component: Component,
}: PrivateRouteProps): JSX.Element {
  if (!isLogin) {
    alert('로그인이 필요합니다.')
    return <Navigate to="/" replace />
  }

  return Component
}

export default PrivateRoute
