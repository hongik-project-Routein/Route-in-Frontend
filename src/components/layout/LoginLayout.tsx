import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

function LoginLayout(): JSX.Element {
  return (
    <Container>
      <BackgroundImage src="/background-image.jpg" />
      <Article>
        <Outlet />
      </Article>
    </Container>
  )
}

export default LoginLayout

const Container = styled.div`
  display: flex;
  height: 500px;

  @media screen and (max-width: 480px) {
    flex-direction: column-reverse;
    align-items: center;
    height: 100%;
  }
`

const BackgroundImage = styled.img`
  width: 400px;
  height: 500px;
  object-fit: cover;
  margin: 40px 50px 50px auto;
  border-radius: 5px;

  @media screen and (max-width: 480px) {
    width: 80%;
    height: 70%;
    margin: 0 auto;
  }
`

const Article = styled.article`
  margin: 40px auto 50px 50px;

  width: 400px;
  height: 500px;
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;

  @media screen and (max-width: 480px) {
    width: 100%;
    margin: 20px auto;
  }
`
