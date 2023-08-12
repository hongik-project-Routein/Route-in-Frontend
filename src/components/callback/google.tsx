import React from 'react'
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
import { request } from '../../util/axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { type Auth } from './kakao'
import { type UserState } from '../../recoil/atom/user'
import useUser from '../../recoil/hooks/useUser'

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
  const navigate = useNavigate()
  const { login } = useUser()

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

      const userinfo: UserState = {
        name: response.name,
        uname: response.uname,
        email: response.email,
        age: response.age,
        gender: response.gender,
        image: response.image,
        follower_set: response.follower_set,
        following_set: response.following_set,
        accessToken: response.accessToken,
      }

      login(userinfo)

      if (response.uname === '') {
        navigate('/initial-setting')
      } else {
        navigate('/home')
      }
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
