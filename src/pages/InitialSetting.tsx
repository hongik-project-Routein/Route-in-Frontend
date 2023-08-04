import React from 'react'
import styled from 'styled-components'
import image from '../img/background-image.jpg'
import Kakao from '../components/callback/kakao'
import GoogleLoginProvider from '../components/callback/google'

export default function InitialSetting(): JSX.Element {
  const sloganText = `시작을 위해 몇 가지 설정이 필요합니다.`

  return (
    <InitialSettingContainer>
      <BackgroundImage src={image} />
      <Container>
        <InputContainer>
          <Title>Route in</Title>
          <FollowMessage>{sloganText}</FollowMessage>
        </InputContainer>
      </Container>
    </InitialSettingContainer>
  )
}

const InitialSettingContainer = styled.div`
  display: flex;
  height: 500px;
`

const BackgroundImage = styled.img`
  width: 400px;
  height: 500px;
  object-fit: cover;
  margin: 40px 50px 50px auto;
  border-radius: 5px;
`

const Container = styled.article`
  margin: 40px auto 50px 50px;
`

const InputContainer = styled.div`
  width: 400px;
  height: 500px;
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`

const Title = styled.h1`
  margin: 80px 0 60px 0;
  font-family: 'Pacifico', sans-serif;
  font-size: 50px;
  text-align: center;
`
const FollowMessage = styled.p`
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
