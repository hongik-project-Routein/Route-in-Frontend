import React from 'react'
import styled from 'styled-components'
import image from '../img/background-image.jpg'
import kakao from '../img/kakao.png'
import theme from '../styles/Theme'
import { Link } from 'react-router-dom'

export default function SignUp(): JSX.Element {
  const sloganText = `장소와 장소를 이어줌으로써
\n사람과 사람을 이어준다.`
  return (
    <SignUpPageContainer>
      <BackgroundImage src={image} />
      <SignUpArticle>
        <SignUpContainer>
          <Title>Route in</Title>
          <Slogan>{sloganText}</Slogan>
          <SignUpButton>
            <SocialMark src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"></SocialMark>
            <SignUpDesc>Sign up with Google</SignUpDesc>
          </SignUpButton>
          <SignUpButton>
            <SocialMark src={kakao}></SocialMark>
            <SignUpDesc>Sign up with Kakao</SignUpDesc>
          </SignUpButton>
        </SignUpContainer>
        <GoSignInContainer>
          <GoSignInDesc>이미 계정이 있다면</GoSignInDesc>
          <SignInButton to="/">
            <SignInDesc>Sign In</SignInDesc>
          </SignInButton>
        </GoSignInContainer>
      </SignUpArticle>
    </SignUpPageContainer>
  )
}

const SignUpPageContainer = styled.div`
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

const SignUpArticle = styled.article`
  margin: 40px auto 50px 50px;
`

const SignUpContainer = styled.div`
  width: 400px;
  height: 350px;
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`

const Title = styled.h1`
  margin: 60px 0 30px 0;
  font-family: 'Pacifico', sans-serif;
  font-size: 50px;
  text-align: center;
`
const Slogan = styled.p`
  margin-bottom: 30px;
  color: #475467;
  text-align: center;
  white-space: pre-line;
  line-height: 10px;
`
const SignUpButton = styled.div`
  display: flex;
  justify-content: center;
  width: 200px;
  height: 40px;
  margin: 10px auto;
  border: 3px solid ${theme.colors.primaryColor};
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    background-color: rgba(177, 226, 241, 0.3);
  }
`

const SocialMark = styled.img`
  width: 20px;
  height: 20px;
  margin: auto 5px;
`
const SignUpDesc = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin: auto 5px;
`

const GoSignInContainer = styled.div`
  width: 400px;
  height: 130px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`

const GoSignInDesc = styled.p`
  margin: 20px 0;
  text-align: center;
`

const SignInButton = styled(Link)`
  display: flex;
  justify-content: center;
  width: 200px;
  height: 40px;
  margin: 10px auto;
  border: 3px solid ${theme.secondaryColors.secondary};
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    background-color: rgba(242, 203, 191, 0.3);
  }
`

const SignInDesc = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin: auto 5px;
`
