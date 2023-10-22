import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import { faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type BookMarkType, type SearchPinType } from '../../types/postTypes'
import useUser from '../../recoil/hooks/useUser'
import useModal from '../../hooks/useModal'
import { request } from '../../util/axios'
import LikeList from '../post/likeList'
import theme from '../../styles/Theme'

interface EachSearchPinProps {
  loadPin: SearchPinType
}

function EachSearchPin(props: EachSearchPinProps): JSX.Element {
  const link = props.loadPin.post_id.toString()

  const [likeCount, setLikeCount] = useState<number>(
    props.loadPin.like_users.length
  )
  const [likeStatus, setLikeStatus] = useState(props.loadPin.is_liked)
  const [bookmarkActive, setbookmarkActive] = useState(
    props.loadPin.is_bookmarked
  )

  const { loadUserInfo } = useUser()
  const accessToken = loadUserInfo().accessToken

  const likePeopleRef = useRef(null)
  const { modalOpen: likePeopleOpen } = useModal(likePeopleRef)

  const likeButtonClick = async (): Promise<void> => {
    try {
      const response = await request<string>(
        'post',
        `/api/post/${props.loadPin.post_id}/like/`,
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
      await request<BookMarkType>(
        'post',
        `/api/post/${props.loadPin.post_id}/bookmark/`,
        null,
        {
          Authorization: `Bearer ${accessToken}`,
        }
      )

      setbookmarkActive((prev) => !prev)
    } catch (error) {
      console.log(error)
    }
  }

  const getLikeUsers = (): string[] => {
    if (likeStatus) {
      return Array.from(
        new Set([...props.loadPin.like_users, loadUserInfo().uname])
      )
    } else {
      return [
        ...props.loadPin.like_users.filter(
          (user) => user !== loadUserInfo().uname
        ),
      ]
    }
  }

  useEffect(() => {
    setLikeCount(props.loadPin.like_users.length)
  }, [])

  return (
    <div>
      <PersonalInfoContainer>
        <UserContent to={`/profile/${props.loadPin.writer}/post`}>
          <Profile src={props.loadPin.writer_image} />
          <Nickname>{props.loadPin.writer}</Nickname>
        </UserContent>
        <RestContent>
          <NumOfHeart ref={likePeopleRef}>
            {likeCount}
            {likePeopleOpen ? <LikeList like_users={getLikeUsers()} /> : null}
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
        <PinImage src={props.loadPin.image} />
      </PostImageContainer>
      <PostDetailLink to={`/post/${link}`}>상세 게시물로</PostDetailLink>
    </div>
  )
}

export default EachSearchPin

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

const PinImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
