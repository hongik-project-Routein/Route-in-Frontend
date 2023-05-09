import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faComment,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons'

const postText: string = `#김포공항
    김포공항은 좋았다.
    #제주 레포츠랜드
    레포츠랜드는 재밌었다.
    #스누피가든 제주
    스누피가 너무 귀여웠다.
    #제주여행 #제주 익사이팅
    이번 제주도 여행은~~~~
`

export default function Post(): JSX.Element {
  return (
    <>
      <PersonalInfoContainer>
        <UserContent>
          <Profile src="https://avatars.githubusercontent.com/u/81083461?v=4" />
          <Nickname>jinhokim98</Nickname>
          <DistanceFromMe>나와의 거리: 100km</DistanceFromMe>
        </UserContent>
        <RestContent>
          <Icons>
            <HeartAndNumber>
              <Heart>
                <FontAwesomeIcon icon={faHeart} />
              </Heart>
              <NumOfHeart>100</NumOfHeart>
            </HeartAndNumber>
            <DirectMessage>
              <FontAwesomeIcon icon={faComment} />
            </DirectMessage>
            <Bookmark>
              <FontAwesomeIcon icon={faBookmark} />
            </Bookmark>
          </Icons>
        </RestContent>
      </PersonalInfoContainer>
      <PostImageContainer>
        <PostImage src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycGxhbmV8ZW58MHx8MHx8&w=1000&q=80" />
      </PostImageContainer>
      <PostText>{postText}</PostText>
    </>
  )
}

const PersonalInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 582px;
  height: 60px;
`

const UserContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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

const Nickname = styled.span`
  margin-right: 20px;
  font-size: 20px;
`

const RestContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const DistanceFromMe = styled.span`
  font-size: 16px;
`

const Icons = styled.div`
  display: flex;
  justify-content: flex-start;
`

const HeartAndNumber = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  margin-right: 10px;
`

const Heart = styled.div``

const NumOfHeart = styled.div`
  font-size: 16px;
  margin-top: 5px;
`

const DirectMessage = styled.div`
  width: 20px;
  margin-right: 10px;
`

const Bookmark = styled.div`
  width: 20px;
  margin-right: 10px;
`
const PostImageContainer = styled.div`
  width: 100%;
  height: 582px;
  margin-top: 20px;
`
const PostImage = styled.img`
  object-fit: cover;
  border-radius: 10px;
`
const PostText = styled.p`
  margin-top: 20px;
  padding: 8px 12px;
  border: 1px solid #98a2b3;
  border-radius: 8px;
  font-size: 16px;
  line-height: 30px;
  white-space: pre-line;
`
