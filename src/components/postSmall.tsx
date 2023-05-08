import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faComment,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons'

export default function PostSmall(): JSX.Element {
  return (
    <div>
      <PersonalInfoContainer>
        <UserContent>
          <Profile src="https://avatars.githubusercontent.com/u/81083461?v=4" />
          <Nickname>jinhokim98</Nickname>
        </UserContent>
        <RestContent>
          <NumOfHeart>100</NumOfHeart>
          <Icons>
            <Heart>
              <FontAwesomeIcon icon={faHeart} />
            </Heart>
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
    </div>
  )
}

const PersonalInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 60px;
`

const UserContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Profile = styled.img`
  width: 56px;
  height: 56px;
  margin-right: 20px;
  border-radius: 50%;
  object-fit: cover;
  &:hover {
    cursor: pointer;
  }
`

const Nickname = styled.span`
  margin-right: 20px;
  font-size: 16px;
`

const RestContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const NumOfHeart = styled.span`
  font-size: 12px;
  margin-right: 20px;
`

const Icons = styled.div`
  display: flex;
  justify-content: flex-start;
`

const Heart = styled.div`
  margin-right: 10px;
`

const DirectMessage = styled.div`
  margin-right: 10px;
`

const Bookmark = styled.div`
  margin-right: 10px;
`
const PostImageContainer = styled.div`
  width: 300px;
  height: 300px;
  margin-top: 20px;
`
const PostImage = styled.img`
  object-fit: cover;
  border-radius: 10px;
`
