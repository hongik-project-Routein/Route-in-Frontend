import React from 'react'
import { type UserInfo } from '../likeList'
import styled from 'styled-components'

interface EachLikeUsersProps {
  eachUser: UserInfo
}

function EachLikeUsers(props: EachLikeUsersProps): JSX.Element {
  const { eachUser } = props
  // 팔로우 버튼할 때 user 정보에서 followlist 가져와서 있는지 비교하면 될 듯
  return (
    <Row>
      <ProfileImage src={eachUser.image} />
      <NicknameAndName>
        <Nickname>{eachUser.uname}</Nickname>
        <Name>{eachUser.name}</Name>
      </NicknameAndName>
      <FollowButton>팔로우</FollowButton>
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
const NicknameAndName = styled.div``
const Nickname = styled.div``
const Name = styled.div`
  padding-top: 5px;
  font-size: 13px;
`

const FollowButton = styled.button`
  width: 80px;
  height: 35px;
  background-color: #d9d9d9;
  border-radius: 25px;
`
