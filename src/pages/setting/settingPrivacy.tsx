import React from 'react'
import styled from 'styled-components'
import { privacyMessage } from '../../constants/privacy'
import theme from '../../styles/Theme'

function SettingPrivacy(): JSX.Element {
  return (
    <>
      <Title>개인정보 처리방침</Title>
      <Paragraph>{privacyMessage}</Paragraph>
    </>
  )
}

export default SettingPrivacy

const Title = styled.h1`
  color: ${theme.colors.primaryColor};
  font-size: 40px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 30px;
`
const Paragraph = styled.div`
  margin: 20px;
  padding: 20px 30px;

  border: 1px solid ${theme.colors.disable};
  border-radius: 5px;

  font-size: 14px;
  line-height: 24px;
  white-space: pre-line;

  overflow-y: scroll;
`
