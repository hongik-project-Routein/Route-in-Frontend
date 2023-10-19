import React, { useRef } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { request } from '../../util/axios'
import useUser from '../../recoil/hooks/useUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookmark,
  faHeart,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { type LoadPin } from '../../types/postTypes'
import KakaoMapPost from './KakaoMapPost'
import Comment from '../comment/Comment'
import Hashtag from '../util/hashtag'
import { useSetRecoilState } from 'recoil'
import { isUpdatePost } from '../../recoil/atom/updatePost'
import { Link, useNavigate } from 'react-router-dom'
import usePostDetail from './../../recoil/hooks/usePostdetail'
import useModal from '../../hooks/useModal'
import LikeList from './likeList'
import calculateDate from '../../constants/calculateDate'
import FollowButton from '../follow/followButton'

function PostDetailInner(): JSX.Element {
  const isSetUpdatePost = useSetRecoilState(isUpdatePost)

  const navigate = useNavigate()
  const { loadUserInfo } = useUser()
  const accessToken = loadUserInfo().accessToken

  const { postDetail, setLike, setBookmark } = usePostDetail()
  const isMyPost = postDetail.post.writer === loadUserInfo().uname

  const activeUpdate = (): void => {
    isSetUpdatePost(true)
  }

  const likePeopleRef = useRef(null)
  const { modalOpen: likePeopleOpen } = useModal(likePeopleRef)

  // 좋아요
  const likeButtonClick = async (): Promise<void> => {
    try {
      const response = await request<string>(
        'post',
        `/api/post/${String(postDetail.post.id)}/like/`,
        null,
        {
          Authorization: `Bearer ${accessToken}`,
        }
      )
      setLike(response)
    } catch (error) {
      console.log(error)
    }
  }

  // 북마크
  const handleBookmarkButton = async (): Promise<void> => {
    try {
      const response = await request<string>(
        'post',
        `/api/post/${postDetail.post.id}/bookmark/`,
        null,
        {
          Authorization: `Bearer ${accessToken}`,
        }
      )
      setBookmark(response)
    } catch (error) {
      console.log(error)
    }
  }

  // 게시글 삭제
  const deletePost = async (): Promise<void> => {
    if (window.confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      try {
        const response = await request<string>(
          'delete',
          `/api/post/${String(postDetail.post.id)}`,
          null,
          {
            Authorization: `Bearer ${accessToken}`,
          }
        )
        alert(`삭제되었습니다.${response}`)
        navigate('/home')
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getLikeUsers = (): string[] => {
    if (postDetail.post.is_liked) {
      return Array.from(
        new Set([...postDetail.post.like_users, loadUserInfo().uname])
      )
    } else {
      return [
        ...postDetail.post.like_users.filter(
          (user) => user !== loadUserInfo().uname
        ),
      ]
    }
  }

  return (
    <>
      <PersonalInfoContainer>
        <UserContent>
          <FlexLink to={`/profile/${postDetail.post.writer}`}>
            <Profile src={postDetail.user.image} />
            <Uname>{postDetail.post.writer}</Uname>
            <FollowButton uname={postDetail.post.writer} />
          </FlexLink>
          <CreatedAt>{calculateDate(postDetail.post.created_at)}</CreatedAt>
        </UserContent>
        <RestContent>
          <Icons>
            <HeartAndNumber>
              <HeartButtonPost
                active={postDetail.post.is_liked}
                onClick={likeButtonClick}
              >
                <FontAwesomeIcon icon={faHeart} />
              </HeartButtonPost>
              <NumOfHeart ref={likePeopleRef}>
                {postDetail.post.like_count}
                {likePeopleOpen ? (
                  <LikeList like_users={getLikeUsers()} />
                ) : null}
              </NumOfHeart>
            </HeartAndNumber>
            <Bookmark
              active={postDetail.post.is_bookmarked}
              onClick={handleBookmarkButton}
            >
              <FontAwesomeIcon icon={faBookmark} />
            </Bookmark>
            <UpdateButton active={isMyPost} onClick={activeUpdate}>
              <FontAwesomeIcon icon={faPen} />
            </UpdateButton>
            <DeleteButton
              active={isMyPost}
              onClick={async () => {
                await deletePost()
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </DeleteButton>
          </Icons>
        </RestContent>
      </PersonalInfoContainer>
      <PostContainer>
        <PostImageContainer>
          <KakaoMapPost
            size="400px"
            pinCount={postDetail.post.pin_count}
            pinImages={postDetail.pin.map((pin: LoadPin) => pin.image)}
            latLng={postDetail.pin.map((pin: LoadPin) => ({
              lat: pin.latitude,
              lng: pin.longitude,
            }))}
          ></KakaoMapPost>
        </PostImageContainer>
        <PostText>{<Hashtag postText={postDetail.post.content} />}</PostText>
      </PostContainer>
      <Comment postId={postDetail.post.id} />
    </>
  )
}

export default PostDetailInner

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

const FlexLink = styled(Link)`
  display: flex;
  align-items: center;
`

const Uname = styled.span`
  margin-right: 20px;
  font-size: 20px;
`

const RestContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
const CreatedAt = styled.div`
  font-size: 12px;
  margin: 0 10px;
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

  &:hover {
    cursor: pointer;
  }
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

const UpdateButton = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? 'block' : 'none')};
  width: 30px;
  height: 30px;
  margin-top: 3px;
  margin-right: 10px;

  background-color: transparent;
  border: none;
  outline: none;
  color: ${theme.colors.disable};
  font-size: 20px;

  &:hover {
    cursor: pointer;
  }
`

const DeleteButton = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? 'block' : 'none')};
  width: 30px;
  height: 30px;
  margin-top: 3px;
  margin-right: 10px;

  background-color: transparent;
  border: none;
  outline: none;
  color: ${theme.colors.disable};
  font-size: 20px;

  &:hover {
    cursor: pointer;
  }
`

// const DotsContainer = styled.div`
//   position: relative;
// `

// const Dots = styled(FontAwesomeIcon)`
//   margin-left: 10px;
//   margin-bottom: 25px;
//   color: ${theme.colors.disable};
//   font-size: 20px;

//   &:hover {
//     cursor: pointer;
//   }
// `

// const UDLayerPopup = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   position: absolute;
//   top: 20px;
//   left: -15px;
//   width: 70px;
//   height: 80px;
//   border: 1px solid ${theme.colors.black};
//   border-radius: 10px;
//   background-color: ${theme.colors.white};
// `

// const DeleteButton = styled.button`
//   width: 100%;
//   height: 30px;

//   background-color: transparent;
//   border: none;
//   font-size: 15px;

//   &:hover {
//     cursor: pointer;
//     background-color: rgba(0, 0, 0, 0.1);
//     border-radius: 10px;
//   }
// `

// const UpdateButton = styled.div`
//   width: 100%;
//   height: 30px;

//   background-color: transparent;
//   border: none;
//   font-size: 15px;

//   &:hover {
//     cursor: pointer;
//     background-color: rgba(0, 0, 0, 0.1);
//     border-radius: 10px;
//   }
// `

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
