import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import theme from '../../styles/Theme'
import KakaoMapPost from './KakaoMapPost'
import { request } from '../../util/axios'

import { type BookMarkType, type LoadPost } from '../../types/postTypes'

import useUser from '../../recoil/hooks/useUser'
import useModal from '../../hooks/useModal'
import LikeList from './likeList'
import FollowButton from '../follow/followButton'
import ShowMoreText from '../util/showMoreText'
import calculateDate from './../../constants/calculateDate'

interface PostCardProps {
  loadPost: LoadPost
}

export default function PostCard(props: PostCardProps): JSX.Element {
  const [likeCount, setLikeCount] = useState<number>(0)
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

  const getLikeUsers = (): string[] => {
    if (likeStatus) {
      return Array.from(
        new Set([...props.loadPost.post.like_users, loadUserInfo().uname])
      )
    } else {
      return [
        ...props.loadPost.post.like_users.filter(
          (user) => user !== loadUserInfo().uname
        ),
      ]
    }
  }

  const navigate = useNavigate()

  const goDetail = (link: string): void => {
    navigate(link)
    window.location.reload()
  }

  useEffect(() => {
    setLikeCount(props.loadPost.post.like_count)
  }, [])
  return (
    <>
      <PersonalInfoContainer>
        <UserContent>
          <ProfileLink to={`/profile/${props.loadPost.post.writer}`}>
            <Profile src={props.loadPost.user.image} />
          </ProfileLink>
          <Uname to={`/profile/${props.loadPost.post.writer}`}>
            {props.loadPost.post.writer}
          </Uname>
          <DistanceFromMe>나와의 거리: {100}km</DistanceFromMe>
          <CreatedAt>{calculateDate(props.loadPost.post.created_at)}</CreatedAt>
          <FollowButton uname={props.loadPost.post.writer} />
        </UserContent>
        <RestContent>
          <Icons>
            <LikeAndNumber>
              <Like active={likeStatus} onClick={likeButtonClick}>
                <FontAwesomeIcon icon={faHeart} />
              </Like>
              <NumOfLike ref={likePeopleRef}>
                {likeCount}
                {likePeopleOpen ? (
                  <LikeList like_users={getLikeUsers()} />
                ) : null}
              </NumOfLike>
            </LikeAndNumber>
            <Bookmark active={bookmarkActive} onClick={handleBookmarkButton}>
              <FontAwesomeIcon icon={faBookmark} />
            </Bookmark>
          </Icons>
        </RestContent>
      </PersonalInfoContainer>
      <PostImageContainer>
        <KakaoMapPost
          size="582px"
          pinCount={props.loadPost.post.pin_count}
          pinImages={props.loadPost.pin.map((pin) => pin.image)}
          latLng={props.loadPost.pin.map((pin) => ({
            lat: pin.latitude,
            lng: pin.longitude,
          }))}
        ></KakaoMapPost>
      </PostImageContainer>
      <PostTextContainer>
        <ShowMoreText content={props.loadPost.post.content} />
      </PostTextContainer>
      <PostComment
        onClick={() => {
          goDetail(`/post/${props.loadPost.post.id}`)
        }}
      >
        {`댓글 ${props.loadPost.post.comment_count}개 모두 보기`}
      </PostComment>
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

const ProfileLink = styled(Link)``

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

const Uname = styled(Link)`
  margin-right: 20px;
  font-size: 20px;
`

const RestContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const DistanceFromMe = styled.div`
  font-size: 16px;
  margin-right: 20px;
`

const Icons = styled.div`
  display: flex;
  justify-content: flex-start;
`

const LikeAndNumber = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  margin-right: 10px;
`

const Like = styled.div<{ active: boolean }>`
  color: ${(props) =>
    props.active ? theme.colors.primaryColor : theme.colors.disable};
  &:hover {
    cursor: pointer;
  }
`

const NumOfLike = styled.div`
  font-size: 16px;
  margin-top: 5px;

  &:hover {
    cursor: pointer;
  }
`

const CreatedAt = styled.div`
  font-size: 12px;
  margin-right: 10px;
`

const Bookmark = styled.div<{ active: boolean }>`
  color: ${(props) =>
    props.active ? theme.colors.primaryColor : theme.colors.disable};
  width: 20px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`
const PostImageContainer = styled.div`
  width: 100%;
  height: 582px;
  margin-top: 20px;
`

const PostTextContainer = styled.p`
  margin-top: 20px;
  padding: 8px 12px;
  border: 1px solid #98a2b3;
  border-radius: 8px;
  font-size: 16px;
  line-height: 30px;
  white-space: pre-line;
`

const PostComment = styled.p`
  margin: 20px 0;
  padding: 8px 12px;
  border: 1px solid #98a2b3;
  border-radius: 8px;
  font-size: 16px;
  line-height: 30px;
  white-space: pre-line;

  &:hover {
    cursor: pointer;
  }
`
