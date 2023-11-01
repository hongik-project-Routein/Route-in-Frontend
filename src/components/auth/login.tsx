import React from 'react'
import styled from 'styled-components'
import Kakao from './kakao'
import GoogleLoginProvider from './google'
import theme from '../../styles/Theme'
import { Link } from 'react-router-dom'

export default function Login(): JSX.Element {
  const sloganText = `장소와 장소를 이어줌으로써
\n사람과 사람을 이어준다.`

  return (
    <>
      <Title>Route in</Title>
      <Slogan>{sloganText}</Slogan>
      <SocialLoginContainer>
        <GoogleLoginProvider />
      </SocialLoginContainer>
      <SocialLoginContainer>
        <Kakao />
      </SocialLoginContainer>
      <SocialLoginContainer>
        <GoCommonLogin to="/common-login">일반 로그인</GoCommonLogin>
      </SocialLoginContainer>
    </>
  )
}

const Title = styled.h1`
  margin: 80px 0 60px 0;
  font-family: 'Pacifico', sans-serif;
  font-size: 50px;
  text-align: center;
`
const Slogan = styled.p`
  margin-bottom: 50px;
  color: #475467;
  text-align: center;
  white-space: pre-line;
  line-height: 10px;
`

const SocialLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;
`

const GoCommonLogin = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 184px;
  height: 47px;
  margin: 0 auto;
  background-color: ${theme.colors.primaryColor};
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`
