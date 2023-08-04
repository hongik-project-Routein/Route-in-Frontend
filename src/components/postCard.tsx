import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Hashtag from './hashtag'
import theme from '../styles/Theme'
import KakaoMapPost from './KakaoMapPost'
import { request } from '../util/axios'

import { type BookMarkType } from '../types/postTypes'
import { type LoadPost } from './../types/postTypes'
import useUser from '../modules/hooks/useUser'

interface PostCardProps {
  loadPost: LoadPost
}

export default function PostCard(props: PostCardProps): JSX.Element {
  const [likeCount, setLikeCount] = useState<number>(0)
  const [likeStatus, setLikeStatus] = useState(props.loadPost.post.is_liked)
  const [bookmarkActive, setbookmarkActive] = useState(false)
  const { accessToken } = useUser()

  const likeButtonClick = async (): Promise<void> => {
    try {
      const response = await request<string>(
        'post',
        `/api/post/${props.loadPost.post.id}/like/`,
        {
          postid: props.loadPost.post.id,
          like_count: likeCount,
          like_status: likeStatus,
        },
        {
          Authorization: `Bearer ${accessToken as string}`,
        }
      )

      console.log(response)

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
        '/api/post/bookmark',
        {
          postid: props.loadPost.post.id,
          bookmark: bookmarkActive,
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
    <>
      <PersonalInfoContainer>
        <UserContent>
          <ProfileLink to={`/profile/${props.loadPost.post.writer}`}>
            <Profile src={props.loadPost.user.image} />
          </ProfileLink>
          <Nickname to={`/profile/${props.loadPost.post.writer}`}>
            {props.loadPost.post.writer}
          </Nickname>
          <DistanceFromMe>나와의 거리: {100}km</DistanceFromMe>
        </UserContent>
        <RestContent>
          <Icons>
            <LikeAndNumber>
              <Like active={likeStatus} onClick={likeButtonClick}>
                <FontAwesomeIcon icon={faHeart} />
              </Like>
              <NumOfLike>{likeCount}</NumOfLike>
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
      <PostText postText={props.loadPost.post.content} />
      <PostComment>
        <Link
          to={`/post/${props.loadPost.post.id}`}
        >{`댓글 ${props.loadPost.post.comment_count}개 모두 보기`}</Link>
      </PostComment>
    </>
  )
}

interface PostTextProps {
  postText: string
}

function PostText(props: PostTextProps): JSX.Element {
  const [limit, setLimit] = useState<number>(50)
  const toggleEllipsis = (
    str: JSX.Element,
    limit: number
  ): { string: JSX.Element; isShowMore: boolean } => {
    const postText = str.props.postText
    const splitText = postText.split('\n')
    const limitedText = []
    let lengthCount = 0
    let isShowMore = false

    for (let i = 0; i < splitText.length; i++) {
      const line = splitText[i]
      const words = line.split(' ')

      limitedText.push(
        <p key={`p-${i}`}>
          {words.map((word: string) => {
            if (word.startsWith('#')) {
              if (lengthCount + word.length + 3 > limit) {
                isShowMore = true
                return null
              }
              lengthCount += word.length + 3
              return (
                <a
                  href={`/search?q=${word.substring(1)}`}
                  key={word}
                  style={{ color: `${theme.colors.primaryColor}` }}
                >
                  {word}{' '}
                </a>
              )
            } else {
              lengthCount += word.length + 1
              return <span key={word}>{word} </span>
            }
          })}
        </p>
      )

      if (isShowMore) {
        break
      }
    }
    return {
      string: <>{limitedText}</>,
      isShowMore,
    }
  }
  const onClickMore = (str: string) => (): void => {
    setLimit(str.length)
  }
  return (
    <PostTextContainer>
      {toggleEllipsis(<Hashtag postText={props.postText} />, limit).string}
      {toggleEllipsis(<Hashtag postText={props.postText} />, limit)
        .isShowMore && (
        <MoreButton onClick={onClickMore(props.postText)}>...더보기</MoreButton>
      )}
    </PostTextContainer>
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

const Nickname = styled(Link)`
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

const MoreButton = styled.button``

const PostComment = styled.p`
  margin: 20px 0;
  padding: 8px 12px;
  border: 1px solid #98a2b3;
  border-radius: 8px;
  font-size: 16px;
  line-height: 30px;
  white-space: pre-line;
`
