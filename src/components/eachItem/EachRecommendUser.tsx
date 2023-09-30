import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { type RecommendUserType } from './../../types/userType'
import FollowButton from '../follow/followButton'

interface EachRecommendUserProps {
  eachUser: RecommendUserType
}

function EachRecommendUser(props: EachRecommendUserProps): JSX.Element {
  return (
    <RecommendRow>
      <Link to={`/profile/${props.eachUser.uname}`}>
        <Profile src={props.eachUser.image} />
      </Link>
      <TextContainer>
        <Link to={`/profile/${props.eachUser.uname}`}>
          <Nickname>{props.eachUser.uname}</Nickname>
        </Link>
        {props.eachUser.sim_users.length > 0 && (
          <FollowRecommend>{`${props.eachUser.sim_users[0]}님 포함 ${props.eachUser.sim_users.length}명이 팔로우합니다.`}</FollowRecommend>
        )}
      </TextContainer>
      <FollowButton uname={props.eachUser.uname} />
    </RecommendRow>
  )
}

export default EachRecommendUser

const RecommendRow = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 340px;
  height: 50px;
  margin-bottom: 20px;
`

const Profile = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 50%;
  object-fit: cover;
  &:hover {
    cursor: pointer;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  font-size: 16px;
`

const Nickname = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
`

const FollowRecommend = styled.span`
  font-size: 12px;
`

// const FollowButton = styled.button`
//   position: absolute;
//   right: 30px;
//   bottom: 9px;
//   color: ${theme.colors.primaryColor};
//   font-size: 12px;
// `
