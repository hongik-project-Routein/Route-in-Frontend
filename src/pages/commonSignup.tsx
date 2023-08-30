import React from 'react'
import styled from 'styled-components'
import CommonSignup from './../components/auth/commonSignup'

function CommonSignupPage(): JSX.Element {
  return (
    <SignupPageContainer>
      <BackgroundImage src="/background-image.jpg" />
      <CommonSignup />
    </SignupPageContainer>
  )
}

export default CommonSignupPage

const SignupPageContainer = styled.div`
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
