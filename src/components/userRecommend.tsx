import React from 'react'
import styled from 'styled-components'
import theme from '../styles/Theme'
import { Link } from 'react-router-dom'

interface UserRecommendContent {
  profile: string
  nickname: string
  userRecommendDesc: string
}

const userRecommendContents: UserRecommendContent[] = [
  {
    profile:
      'https://cdn.pixabay.com/photo/2018/04/03/20/26/woman-3287956_1280.jpg',
    nickname: 'Emma',
    userRecommendDesc: 'soomineom님 외 5명이 팔로우합니다.',
  },
  {
    profile:
      'https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_1280.jpg',
    nickname: 'Evelyn',
    userRecommendDesc: 'jane님 외 9명이 팔로우합니다.',
  },
  {
    profile:
      'https://cdn.pixabay.com/photo/2015/07/09/00/29/woman-837156_1280.jpg',
    nickname: 'Elizabeth',
    userRecommendDesc: 'lsabella님 외 20명이 팔로우합니다.',
  },
  {
    profile:
      'https://cdn.pixabay.com/photo/2016/11/29/03/36/woman-1867093_1280.jpg',
    nickname: 'Grace',
    userRecommendDesc: 'chris님 외 7명이 팔로우합니다.',
  },
  {
    profile:
      'https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_1280.jpg',
    nickname: 'Lucas',
    userRecommendDesc: 'chris님 외 12명이 팔로우합니다.',
  },
  {
    profile:
      'https://cdn.pixabay.com/photo/2015/01/08/18/30/entrepreneur-593371_1280.jpg',
    nickname: 'Michael',
    userRecommendDesc: 'jane님 외 5명이 팔로우합니다.',
  },
  {
    profile:
      'https://cdn.pixabay.com/photo/2016/11/29/01/34/man-1866574_1280.jpg',
    nickname: 'Henry',
    userRecommendDesc: 'Liam님 외 30명이 팔로우합니다.',
  },
  {
    profile:
      'https://cdn.pixabay.com/photo/2016/11/29/01/34/man-1866574_1280.jpg',
    nickname: 'Daniel',
    userRecommendDesc: 'henry님 외 6명이 팔로우합니다.',
  },
  {
    profile:
      'https://cdn.pixabay.com/photo/2015/03/03/18/58/woman-657753_1280.jpg',
    nickname: 'Evelyn',
    userRecommendDesc: 'Jack님 외 7명이 팔로우합니다.',
  },
]

export default function UserRecommend(): JSX.Element {
  return (
    <>
      <RecommendTitle>회원님을 위한 추천</RecommendTitle>
      <RecommendContainer>
        {userRecommendContents.map((item, idx) => (
          <RecommendRow key={idx}>
            <Link to={`/profile/${item.nickname}`}>
              <Profile src={item.profile} />
            </Link>
            <TextContainer>
              <Link to={`/profile/${item.nickname}`}>
                <Nickname>{item.nickname}</Nickname>
              </Link>
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
