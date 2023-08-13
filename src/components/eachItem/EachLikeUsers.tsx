import React from 'react'
import styled from 'styled-components'
import { type UserData } from './../../types/userType'
import FollowButton from '../follow/followButton'

interface EachLikeUsersProps {
  eachUser: UserData
}

function EachLikeUsers(props: EachLikeUsersProps): JSX.Element {
  const { eachUser } = props

  return (
    <Row>
      <ProfileImage src={eachUser.image} />
      <NicknameAndName>
        <Nickname>{eachUser.uname}</Nickname>
        <Name>{eachUser.name}</Name>
      </NicknameAndName>
      <FollowButton uname={eachUser.uname} />
    </Row>
  )
}

export default EachLikeUsers

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
const NicknameAndName = styled.div`
  width: 100px;
  height: 30px;
`

const Nickname = styled.div`
  font-size: 16px;
  text-align: left;
`

const Name = styled.div`
  padding-top: 5px;
  font-size: 13px;
  text-align: left;
`
