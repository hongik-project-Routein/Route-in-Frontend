import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { type PostCardData } from '../dummy/post'
import { Link } from 'react-router-dom'
// import KakaoMapPost from './KakaoMapPost'

interface PostSmallProps {
  loadPost: PostCardData // 연결 시 LoadPostMainPage로 변경
}

export default function PostSmall(props: PostSmallProps): JSX.Element {
  return (
    <div>
      <PersonalInfoContainer>
        <UserContent to={`/profile/${props.loadPost.writer}`}>
          <Profile src={props.loadPost.profile} />
          <Nickname>{props.loadPost.writer}</Nickname>
        </UserContent>
        <RestContent>
          <NumOfHeart>{props.loadPost.likeUsers}</NumOfHeart>
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
        {/* <KakaoMapPost
          size="300px"
          pinCount={props.loadPost.pinCount}
          pinImages={props.loadPost.pinImages}
          latLng={props.loadPost.LatLngs}
        ></KakaoMapPost> */}
      </PostImageContainer>
      <PostDetailLink to={`/post/${props.loadPost.postId}`}>
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
