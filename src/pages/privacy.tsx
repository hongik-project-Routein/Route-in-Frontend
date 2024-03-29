import React from 'react'
import styled from 'styled-components'
import theme from '../styles/Theme'
import { privacyMessage } from '../constants/privacy'

function Privacy(): JSX.Element {
  return (
    <Container>
      <Title>개인정보 처리방침</Title>
      <Paragraph>{privacyMessage}</Paragraph>
    </Container>
  )
}

export default Privacy

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Title = styled.h1`
  color: ${theme.colors.primaryColor};
  font-size: 40px;
  font-weight: 900;
  text-align: center;
  margin: 20px 0;
`
const Paragraph = styled.div`
  max-height: 400px;
  margin: 20px;
  padding: 20px 30px;

  border: 1px solid ${theme.colors.disable};
  border-radius: 5px;

  font-size: 14px;
  line-height: 24px;
  white-space: pre-line;

  overflow-y: scroll;
`
