import React, { useEffect } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { type UserData } from '../../mocks/data/user'
import { Link } from 'react-router-dom'
import useFollow from '../../modules/hooks/useFollow'
import { request } from '../../util/axios'

interface EachRecommendUserProps {
  eachUser: UserData
}

function EachRecommendUser(props: EachRecommendUserProps): JSX.Element {
  const { addFollowing, following } = useFollow()

  const handleAddFollowing = async (nickname: string): Promise<void> => {
    try {
      await request('post', `/api/user/following/`, { nickname })
      addFollowing(nickname)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  useEffect(() => {
    console.log(following)
  }, [following])
  return (
    <RecommendRow>
      <Link to={`/profile/${props.eachUser.nickname}`}>
        <Profile src={props.eachUser.profile} />
      </Link>
      <TextContainer>
        <Link to={`/profile/${props.eachUser.nickname}`}>
          <Nickname>{props.eachUser.nickname}</Nickname>
        </Link>
        <FollowRecommend>{`soomineom님 외 5명이 팔로우합니다.`}</FollowRecommend>
      </TextContainer>
      <FollowButton
        onClick={async () => {
          await handleAddFollowing(props.eachUser.nickname)
        }}
      >
        팔로우
      </FollowButton>
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

const FollowButton = styled.button`
  position: absolute;
  right: 30px;
  bottom: 9px;
  color: ${theme.colors.primaryColor};
  font-size: 12px;
`
