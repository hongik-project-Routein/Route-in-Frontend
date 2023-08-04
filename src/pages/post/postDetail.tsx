import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons'
import HeaderAndSidebar from '../../components/headerAndSidebar'
import Hashtag from '../../components/hashtag'
import { useParams } from 'react-router-dom'
import theme from '../../styles/Theme'

import KakaoMapPost from '../../components/KakaoMapPost'
import {
  type LoadPin,
  type BookMarkType,
  type LoadPost,
} from '../../types/postTypes'
import { request } from '../../util/axios'
import Comment from '../../components/comment/Comment'
import { type LikeResponse } from '../../mocks/handlers/post'
import usePostDetail from '../../modules/hooks/usePostDetail'

export default function PostDetail(): JSX.Element {
  return <HeaderAndSidebar article={<PostDetailArticle />} />
}

function PostDetailArticle(): JSX.Element {
  const { postid } = useParams()

  const [post, setPost] = useState<LoadPost>()
  const [likeCount, setLikeCount] = useState<number>(0)
  const [likeStatus, setLikeStatus] = useState(false)
  const [bookmarkActive, setbookmarkActive] = useState(false)

  const { currentPost, loadCurrentPost } = usePostDetail()

  const loadPost = async (): Promise<void> => {
    try {
      if (postid !== undefined) {
        const loadPost = await request<LoadPost>('get', `/api/post/${postid}`)

        setPost(loadPost)
        loadCurrentPost(loadPost)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const likeButtonClick = async (): Promise<void> => {
    try {
      const response = await request<LikeResponse>(
        'post',
        `/api/post/${postid as string}/like/`,
        {
          postid,
          like_count: likeCount,
          like_status: likeStatus,
        }
      )

      setLikeCount(response.like_count)
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
          postid,
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
    loadPost().catch((err) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    setLikeCount(currentPost.post.like_count)
  }, [currentPost])

  return (
    <>
      {post !== undefined ? (
        <>
          <PersonalInfoContainer>
            <UserContent>
              <Profile src={currentPost.user.image} />
              <Nickname>{currentPost.post.writer}</Nickname>
              <DistanceFromMe>나와의 거리: {100}km</DistanceFromMe>
            </UserContent>
            <RestContent>
              <Icons>
                <HeartAndNumber>
                  <HeartButtonPost
                    active={likeStatus}
                    onClick={likeButtonClick}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </HeartButtonPost>
                  <NumOfHeart>{likeCount}</NumOfHeart>
                </HeartAndNumber>
                <Bookmark
                  active={bookmarkActive}
                  onClick={handleBookmarkButton}
                >
                  <FontAwesomeIcon icon={faBookmark} />
                </Bookmark>
              </Icons>
            </RestContent>
          </PersonalInfoContainer>
          <PostContainer>
            <PostImageContainer>
              <KakaoMapPost
                size="400px"
                pinCount={currentPost.post.pin_count}
                pinImages={currentPost.pin.map((pin: LoadPin) => pin.image)}
                latLng={currentPost.pin.map((pin: LoadPin) => ({
                  lat: pin.latitude,
                  lng: pin.longitude,
                }))}
              ></KakaoMapPost>
            </PostImageContainer>
            <PostText>
              {<Hashtag postText={currentPost.post.content} />}
            </PostText>
          </PostContainer>
          <Comment
            postId={currentPost.post.id}
            comments={currentPost.comment}
          />
        </>
      ) : (
        <></>
      )}
    </>
  )
}

const PersonalInfoContainer = styled.div`
  display: flex;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const UserContent = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12%;
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

const HeartButtonPost = styled.button<{ active: boolean }>`
  width: 30px;
  height: 30px;
  color: ${(props) =>
    props.active ? theme.colors.primaryColor : theme.colors.disable};

  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`

const NumOfHeart = styled.div`
  font-size: 16px;
  margin-top: 5px;
`

const Bookmark = styled.div<{ active: boolean }>`
  color: ${(props) =>
    props.active ? theme.colors.primaryColor : theme.colors.disable};
  width: 20px;
  margin-top: 3px;
  margin-right: 10px;
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`

const PostContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 30px;
`

const PostImageContainer = styled.div`
  width: 400px;
  height: 400px;
  margin-top: 20px;
  margin-right: 50px;
`

const PostText = styled.p`
  width: 300px;
  height: 400px;
  margin-top: 40px;
  padding: 8px 12px;
  border: 1px solid #98a2b3;
  border-radius: 8px;
  font-size: 16px;
  line-height: 30px;
  white-space: pre-line;
`
