import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'

function BlockButton(): JSX.Element {
  return <BlockButtonStyle>차단</BlockButtonStyle>
}

export default BlockButton

const BlockButtonStyle = styled.button`
  width: 80px;
  height: 35px;
  background-color: ${theme.colors.disable};
  border-radius: 25px;
`
