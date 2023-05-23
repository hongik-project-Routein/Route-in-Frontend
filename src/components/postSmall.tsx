import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { type PostCardData } from '../dummy/post'
import { Link } from 'react-router-dom'

interface PostSmallProps {
  post: PostCardData
}

export default function PostSmall(props: PostSmallProps): JSX.Element {
  console.log(props)

  return (
    <div>
      <PersonalInfoContainer>
        <UserContent to={`/profile/${props.post.writer}`}>
          <Profile src={props.post.profile} />
          <Nickname>{props.post.writer}</Nickname>
        </UserContent>
        <RestContent>
          <NumOfHeart>{props.post.heartCount}</NumOfHeart>
          <Icons>
            <Heart>
              <FontAwesomeIcon icon={faHeart} />
            </Heart>
            <Bookmark>
              <FontAwesomeIcon icon={faBookmark} />
            </Bookmark>
          </Icons>
        </RestContent>
      </PersonalInfoContainer>
      <PostImageContainer>
        <PostImage src={props.post.postImage} />
      </PostImageContainer>
    </div>
  )
}

const PersonalInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`

const UserContent = styled(Link)`
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

const Bookmark = styled.div`
  margin-right: 10px;
`
const PostImageContainer = styled.div`
  height: 300px;
  margin-top: 20px;
`
const PostImage = styled.img`
  object-fit: cover;
  border-radius: 10px;
`
