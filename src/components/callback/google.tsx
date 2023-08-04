import React from 'react'
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
import { request } from '../../util/axios'
import styled from 'styled-components'
import useUser from '../../modules/hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { type Auth } from './kakao'

function GoogleLoginProvider(): JSX.Element {
  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
    >
      <GoogleLoginButton />
    </GoogleOAuthProvider>
  )
}

export default GoogleLoginProvider

function GoogleLoginButton(): JSX.Element {
  const { login } = useUser()
  const navigate = useNavigate()

  const loginButtonClick = useGoogleLogin({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSuccess: async (res): Promise<void> => {
      console.log(res)

      const token = res.access_token

      const response = await request<Auth>(
        'post',
        '/accounts/google/callback/',
        undefined,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      const { name, nickname, email, age, gender, access } = response
      login(name, nickname, email, age, gender, access)

      navigate('/home')
    },
    onError: (error) => {
      console.log(error)
    },
  })
  return (
    <LoginButton
      onClick={() => {
        loginButtonClick()
      }}
    />
  )
}

const LoginButton = styled.button`
  width: 200px;
  height: 47px;
  background-image: url('/img/google_login.png');
  background-repeat: no-repeat;

  object-fit: none;
  &:hover {
    cursor: pointer;
  }
`
