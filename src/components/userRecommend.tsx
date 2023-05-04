import React from 'react'
import styled from 'styled-components'
import theme from '../styles/Theme'

interface UserRecommendContent {
  profile: string
  nickname: string
  userRecommendDesc: string
}

const userRecommendContents: UserRecommendContent[] = [
  {
    profile: 'https://avatars.githubusercontent.com/u/81083461?v=4',
    nickname: 'jinhokim',
    userRecommendDesc: 'soomineom님 외 3명이 팔로우합니다.',
  },
  {
    profile: 'https://avatars.githubusercontent.com/u/81083461?v=4',
    nickname: 'jinhokim',
    userRecommendDesc: 'soomineom님 외 3명이 팔로우합니다.',
  },
  {
    profile: 'https://avatars.githubusercontent.com/u/81083461?v=4',
    nickname: 'jinhokim',
    userRecommendDesc: 'soomineom님 외 3명이 팔로우합니다.',
  },
  {
    profile: 'https://avatars.githubusercontent.com/u/81083461?v=4',
    nickname: 'jinhokim',
    userRecommendDesc: 'soomineom님 외 3명이 팔로우합니다.',
  },
  {
    profile: 'https://avatars.githubusercontent.com/u/81083461?v=4',
    nickname: 'jinhokim',
    userRecommendDesc: 'soomineom님 외 3명이 팔로우합니다.',
  },
  {
    profile: 'https://avatars.githubusercontent.com/u/81083461?v=4',
    nickname: 'jinhokim',
    userRecommendDesc: 'soomineom님 외 3명이 팔로우합니다.',
  },
  {
    profile: 'https://avatars.githubusercontent.com/u/81083461?v=4',
    nickname: 'jinhokim',
    userRecommendDesc: 'soomineom님 외 3명이 팔로우합니다.',
  },
  {
    profile: 'https://avatars.githubusercontent.com/u/81083461?v=4',
    nickname: 'jinhokim',
    userRecommendDesc: 'soomineom님 외 3명이 팔로우합니다.',
  },
  {
    profile: 'https://avatars.githubusercontent.com/u/81083461?v=4',
    nickname: 'jinhokim',
    userRecommendDesc: 'soomineom님 외 3명이 팔로우합니다.',
  },
]

export default function UserRecommend(): JSX.Element {
  return (
    <>
      <RecommendTitle>회원님을 위한 추천</RecommendTitle>
      <RecommendContainer>
        {userRecommendContents.map((item, idx) => (
          <RecommendRow key={idx}>
            <Profile src={item.profile} />
            <TextContainer>
              <Nickname>{item.nickname}</Nickname>
              <FollowRecommend>{item.userRecommendDesc}</FollowRecommend>
            </TextContainer>
            <FollowButton>팔로우</FollowButton>
          </RecommendRow>
        ))}
      </RecommendContainer>
    </>
  )
}

const RecommendTitle = styled.h2`
  margin-top: 10px;
  margin-bottom: 50px;
  text-align: center;
  font-size: 20px;
`

const RecommendContainer = styled.div`
  display: flex;
  flex-direction: column;
`

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

const Nickname = styled.span`
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
