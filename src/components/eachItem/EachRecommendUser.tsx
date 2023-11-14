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
      <Link to={`/profile/${props.eachUser.uname}/post`}>
        <Profile src={props.eachUser.image} />
      </Link>
      <TextContainer>
        <Link to={`/profile/${props.eachUser.uname}/post`}>
          <Nickname>{props.eachUser.uname}</Nickname>
        </Link>
      </TextContainer>
      <FollowBtnContainer>
        <FollowButton uname={props.eachUser.uname} />
      </FollowBtnContainer>
    </RecommendRow>
  )
}

export default EachRecommendUser

const RecommendRow = styled.div`
  display: flex;
  position: relative;
  align-items: center;
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

  span {
    font-size: 12px;
  }
`

const Nickname = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
`

const FollowBtnContainer = styled.div`
  margin-left: 20px;
`
