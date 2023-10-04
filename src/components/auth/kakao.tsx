import React from 'react'
import KakaoLogin from 'react-kakao-login'
import styled from 'styled-components'
import { request } from '../../util/axios'
import { useNavigate } from 'react-router-dom'
import { type UserState } from '../../recoil/atom/user'
import useUser from '../../recoil/hooks/useUser'

export interface Auth {
  name: string
  uname: string
  image: string
  email: string
  age: number
  gender: string
  follower_set: string[]
  following_set: string[]
  access: string
}

function Kakao(): JSX.Element {
  const kakaoClientId = process.env.REACT_APP_KAKAO_LOGIN_API_KEY as string
  const { login } = useUser()
  const navigate = useNavigate()

  const kakaoOnSuccess = async (data: any): Promise<void> => {
    const token = data.response.access_token

    const response = await request<Auth>(
      'post',
      '/accounts/kakao/callback/',
      undefined,
      {
        Authorization: `Bearer ${token as string}`,
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
      accessToken: response.access,
    }

    login(userinfo)

    if (response.uname === null) {
      navigate('/initial-setting')
    } else {
      navigate('/')
    }
  }
  const kakaoOnFailure = (error: any): void => {
    console.log(error)
  }
  return (
    <>
      <KakaoLogin
        token={kakaoClientId}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
        render={({ onClick }: { onClick: () => void }) => (
          <KaKaoLoginImage
            onClick={(e) => {
              e.preventDefault()
              onClick()
            }}
          />
        )}
      />
    </>
  )
}

export default Kakao

const KaKaoLoginImage = styled.div`
  width: 184px;
  height: 47px;
  background-image: url('/img/kakao_login.png');
  background-repeat: no-repeat;

  object-fit: none;
  &:hover {
    cursor: pointer;
  }
`
