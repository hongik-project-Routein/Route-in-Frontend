import React, { useRef } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { type LoadComment } from '../../types/postTypes'
import { request } from '../../util/axios'
import useModal from '../../hooks/useModal'
import UpdateComment from '../comment/updateComment'
import useUser from '../../recoil/hooks/useUser'
import usePostDetail from '../../recoil/hooks/usePostdetail'
import LikeList from '../post/likeList'
import calculateDate from '../../constants/calculateDate'
import moment from 'moment'

interface EachCommentProps {
  comment: LoadComment
}

function EachComment(props: EachCommentProps): JSX.Element {
  const { loadUserInfo } = useUser()
  const accessToken = loadUserInfo().accessToken

  const { deleteComment, setCommentLike } = usePostDetail()

  const likeButtonClick = async (): Promise<void> => {
    try {
      const response = await request<string>(
        'post',
        `/api/comment/${props.comment.id}/like/`,
        undefined,
        {
          Authorization: `Bearer ${accessToken}`,
        }
      )
      setCommentLike(response, props.comment.id)
    } catch (error) {
      console.log(error)
    }
  }

  const isMyComment = props.comment.writer === loadUserInfo().uname

  const createdAt = moment(props.comment.created_at)
  const updatedAt = moment(props.comment.updated_at)
  const isUpdated = moment.duration(updatedAt.diff(createdAt)).asSeconds() > 10

  const updateCommentRef = useRef(null)
  const { modalOpen: updateCommentOpen } = useModal(updateCommentRef)

  const likePeopleRef = useRef(null)
  const { modalOpen: likePeopleOpen } = useModal(likePeopleRef)

  const deleteCommentReq = async (id: number): Promise<void> => {
    try {
      await request<boolean>('delete', `/api/comment/${id}/`, undefined, {
        Authorization: `Bearer ${accessToken}`,
      })

      deleteComment(id)
    } catch (error) {
      console.log(error)
    }
  }

  const getLikeUsers = (): string[] => {
    if (props.comment.is_liked) {
      return Array.from(
        new Set([...props.comment.like_users, loadUserInfo().uname])
      )
    } else {
      return [
        ...props.comment.like_users.filter(
          (user) => user !== loadUserInfo().uname
        ),
      ]
    }
  }

  return (
    <Row>
      <CommentProfile src={props.comment.writer_image} />
      <CommentMain>
        <Maintext>
          <CommentNickname to={`/profile/${props.comment.writer}/post`}>
            {props.comment.writer}
          </CommentNickname>
          <CommentDesc>{props.comment.content}</CommentDesc>
        </Maintext>
        <Rest>
          <Time>
            {`${calculateDate(props.comment.created_at)}`}
            {isUpdated ? `  (수정됨)` : null}
          </Time>
          <HeartCount ref={likePeopleRef}>
            {`좋아요 ${props.comment.like_count}개`}
            {likePeopleOpen ? <LikeList like_users={getLikeUsers()} /> : null}
          </HeartCount>
        </Rest>
      </CommentMain>
      <HeartButton active={props.comment.is_liked} onClick={likeButtonClick}>
        <FontAwesomeIcon icon={faHeart} />
      </HeartButton>
      <UpdateButton active={isMyComment} ref={updateCommentRef}>
        <FontAwesomeIcon icon={faPen} />
        {updateCommentOpen ? <UpdateComment comment={props.comment} /> : null}
      </UpdateButton>
      <DeleteButton
        active={isMyComment}
        onClick={async () => {
          await deleteCommentReq(props.comment.id)
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </DeleteButton>
    </Row>
  )
}

export default EachComment
const Row = styled.div`
  display: flex;
  position: relative;
  padding: 12px;
`
const CommentProfile = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 15px;
  border-radius: 50%;
  object-fit: cover;
`

const CommentMain = styled.div``

const Maintext = styled.p`
  display: flex;
  align-items: center;
`
const CommentNickname = styled(Link)`
  margin-right: 10px;
  font-weight: 700;

  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`
const CommentDesc = styled.span`
  @media screen and (max-width: 480px) {
    font-size: 10px;
  }
`

const Rest = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 12px;

  @media screen and (max-width: 480px) {
    font-size: 10px;
  }
`
const Time = styled.div`
  padding-top: 3px;
  margin-right: 10px;
`
const HeartCount = styled.div`
  padding-top: 3px;
  margin-right: 10px;

  &:hover {
    cursor: pointer;
  }
`

const HeartButton = styled.button<{ active: boolean }>`
  position: absolute;
  top: 15px;
  right: 60px;
  color: ${(props) =>
    props.active ? theme.colors.primaryColor : theme.colors.disable};
`

const UpdateButton = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? 'block' : 'none')};
  position: absolute;
  top: 14px;
  right: 40px;
  background-color: transparent;
  border: none;
  outline: none;
  color: ${theme.colors.black};
  font-size: 15px;

  &:hover {
    cursor: pointer;
  }
`

const DeleteButton = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? 'block' : 'none')};
  position: absolute;
  top: 14px;
  right: 20px;
  background-color: transparent;
  border: none;
  outline: none;
  color: ${theme.colors.black};
  font-size: 15px;

  &:hover {
    cursor: pointer;
  }
`
