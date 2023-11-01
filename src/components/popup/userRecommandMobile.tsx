import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import UserRecommend from '../etc/userRecommend'

function UserRecommandMobile(): JSX.Element {
  return (
    <Container>
      <UserRecommend />
    </Container>
  )
}

export default UserRecommandMobile

const Container = styled.div`
  position: absolute;
  top: 70px;
  right: 5px;
  z-index: 3;
  width: 300px;
  padding: 20px;
  background-color: ${theme.colors.white};
  border: 1px solid #98a2b3;
  border-radius: 12px;
`
