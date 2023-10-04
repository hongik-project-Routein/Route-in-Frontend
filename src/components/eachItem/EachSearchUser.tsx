import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { type SearchUserType } from '../../types/postTypes'
import { useNavigate } from 'react-router-dom'

interface EachSearchUserProps {
  loadUser: SearchUserType
}

function EachSearchUser(props: EachSearchUserProps): JSX.Element {
  const navigate = useNavigate()

  const goProfile = (link: string): void => {
    navigate(link)
  }

  return (
    <EachSearchUserContainer
      onClick={() => {
        goProfile(`/profile/${props.loadUser.uname}/`)
      }}
    >
      <Profile src={props.loadUser.image} />
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
  height: 100px;

  &:hover {
    cursor: pointer;
  }
`

const Profile = styled.img`
  width: 56px;
  height: 56px;
  margin-right: 20px;
  border-radius: 50%;
  object-fit: cover;
`

const Rest = styled.div``

const Uname = styled.div`
  color: ${theme.colors.primaryColor};
  font-size: 20px;
  line-height: 150%;
`

const Name = styled.div`
  color: #d9d9d9;
  font-size: 16px;
  line-height: 150%;
`
