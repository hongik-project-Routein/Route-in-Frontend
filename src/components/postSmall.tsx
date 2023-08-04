import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import KakaoMapPost from './KakaoMapPost'
import { type LoadPost } from '../types/postTypes'

interface PostSmallProps {
  loadPost: LoadPost // 연결 시 LoadPostMainPage로 변경
}

export default function PostSmall(props: PostSmallProps): JSX.Element {
  return (
    <div>
      <PersonalInfoContainer>
        <UserContent to={`/profile/${props.loadPost.post.writer}`}>
          <Profile src={props.loadPost.user.image} />
          <Nickname>{props.loadPost.post.writer}</Nickname>
        </UserContent>
        <RestContent>
          <NumOfHeart>{props.loadPost.post.like_count}</NumOfHeart>
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
        <KakaoMapPost
          size="300px"
          pinCount={props.loadPost.post.pin_count}
          pinImages={props.loadPost.pin.map((pin) => pin.image)}
          latLng={props.loadPost.pin.map((pin) => ({
            lat: pin.latitude,
            lng: pin.longitude,
          }))}
        ></KakaoMapPost>
      </PostImageContainer>
      <PostDetailLink to={`/post/${props.loadPost.post.id}`}>
        상세 게시물로
      </PostDetailLink>
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

const PostDetailLink = styled(Link)`
  display: inline-block;
  width: 100%;
  height: 50px;
  margin-top: 10px;
`
