import React from 'react'
import styled from 'styled-components'
import CommonSignin from '../components/auth/commonSignin'

function CommonLogin(): JSX.Element {
  return (
    <LoginPageContainer>
      <BackgroundImage src="/background-image.jpg" />
      <CommonSignin />
    </LoginPageContainer>
  )
}

export default CommonLogin

const LoginPageContainer = styled.div`
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
