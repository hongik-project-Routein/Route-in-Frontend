import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { type SearchUserType } from '../../types/postTypes'

interface EachSearchUserProps {
  loadUser: SearchUserType
}

function EachSearchUser(props: EachSearchUserProps): JSX.Element {
  return (
    <EachSearchUserContainer>
      <Profile src={props.loadUser.profile} />
      <Rest>
        <Uname>{props.loadUser.uname}</Uname>
        <Name>{props.loadUser.name}</Name>
      </Rest>
    </EachSearchUserContainer>
  )
}

export default EachSearchUser

const EachSearchUserContainer = styled.div`
  display: flex;
`

const Profile = styled.img`
  width: 56px;
  height: 56px;
  margin-right: 20px;
  border-radius: 50%;
  object-fit: contain;
`

const Rest = styled.div``

const Uname = styled.div`
  color: ${theme.colors.primaryColor};
  font-size: 24px;
  line-height: 150%;
`

const Name = styled.div`
  color: #d9d9d9;
  font-size: 20px;
  line-height: 150%;
`
