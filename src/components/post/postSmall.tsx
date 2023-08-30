import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import KakaoMapPost from './KakaoMapPost'
import { type BookMarkType, type LoadPost } from '../../types/postTypes'
import useUser from '../../recoil/hooks/useUser'
import useModal from '../../hooks/useModal'
import LikeList from './likeList'
import { request } from '../../util/axios'
import theme from '../../styles/Theme'

interface PostSmallProps {
  loadPost: LoadPost // 연결 시 LoadPostMainPage로 변경
}

export default function PostSmall(props: PostSmallProps): JSX.Element {
  const [likeCount, setLikeCount] = useState<number>(
    props.loadPost.post.like_count
  )
  const [likeStatus, setLikeStatus] = useState(props.loadPost.post.is_liked)
  const [bookmarkActive, setbookmarkActive] = useState(
    props.loadPost.post.is_bookmarked
  )

  const { loadUserInfo } = useUser()
  const accessToken = loadUserInfo().accessToken

  const likePeopleRef = useRef(null)
  const likePeopleOpen = useModal(likePeopleRef)

  const likeButtonClick = async (): Promise<void> => {
    try {
      const response = await request<string>(
        'post',
        `/api/post/${props.loadPost.post.id}/like/`,
        null,
        {
          Authorization: `Bearer ${accessToken}`,
        }
      )

      setLikeCount(
        response === '좋아요 성공' ? (prev) => prev + 1 : (prev) => prev - 1
      )
      setLikeStatus((prev) => !prev)
    } catch (error) {
      console.log(error)
    }
  }

  const handleBookmarkButton = async (): Promise<void> => {
    try {
      const response = await request<BookMarkType>(
        'post',
        `/api/post/${props.loadPost.post.id}/bookmark/`,
        null,
        {
          Authorization: `Bearer ${accessToken}`,
        }
      )
      console.log(response)

      setbookmarkActive((prev) => !prev)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setLikeCount(props.loadPost.post.like_count)
  }, [])

  return (
    <div>
      <PersonalInfoContainer>
        <UserContent to={`/profile/${props.loadPost.post.writer}`}>
          <Profile src={props.loadPost.user.image} />
          <Nickname>{props.loadPost.post.writer}</Nickname>
        </UserContent>
        <RestContent>
          <NumOfHeart ref={likePeopleRef}>
            {likeCount}
            {likePeopleOpen ? (
              <LikeList
                like_users={
                  likeStatus
                    ? [...props.loadPost.post.like_users, loadUserInfo().uname]
                    : props.loadPost.post.like_users
                }
              />
            ) : null}
          </NumOfHeart>
          <Icons>
            <Heart active={likeStatus} onClick={likeButtonClick}>
              <FontAwesomeIcon icon={faHeart} />
            </Heart>
            <Bookmark active={bookmarkActive} onClick={handleBookmarkButton}>
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

const NumOfHeart = styled.div`
  font-size: 12px;
  margin-right: 20px;

  &:hover {
    cursor: pointer;
  }
`

const Icons = styled.div`
  display: flex;
  justify-content: flex-start;
`

const Heart = styled.div<{ active: boolean }>`
  margin-right: 10px;

  color: ${(props) =>
    props.active ? theme.colors.primaryColor : theme.colors.disable};
  &:hover {
    cursor: pointer;
  }
`

const Bookmark = styled.div<{ active: boolean }>`
  margin-right: 10px;
  color: ${(props) =>
    props.active ? theme.colors.primaryColor : theme.colors.disable};

  &:hover {
    cursor: pointer;
  }
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
