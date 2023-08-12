import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { type LoadComment } from '../../types/postTypes'
import { request } from '../../util/axios'
import useModal from '../../hooks/useModal'
import UpdateComment from '../updateComment'
import useUser from '../../recoil/hooks/useUser'

interface EachCommentProps {
  comment: LoadComment
}

function EachComment(props: EachCommentProps): JSX.Element {
  const [likes, setLikes] = useState<number>(props.comment.like_count)
  const [liked, setLiked] = useState<boolean>(props.comment.is_liked)
  const { accessToken } = useUser()

  const likeButtonClick = async (): Promise<void> => {
    try {
      const response = await request<string>(
        'post',
        `/api/comment/${props.comment.id}/like/`,
        undefined,
        {
          Authorization: `Bearer ${accessToken as string}`,
        }
      )
      setLikes(
        response === '좋아요 성공' ? (prev) => prev + 1 : (prev) => prev - 1
      )
      setLiked((prev) => !prev)
    } catch (error) {
      console.log(error)
    }
  }

  const { loadUserInfo } = useUser()
  const isMyComment = props.comment.writer === loadUserInfo().uname

  const updateCommentRef = useRef(null)
  const updateCommentOpen = useModal(updateCommentRef)

  const deleteComment = async (id: number): Promise<void> => {
    try {
      const response = await request<boolean>(
        'delete',
        `/api/comment/delete/${id}`
      )
      console.log(response)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  // comment 객체 안에 작성자 프로필은 어떻게...?

  return (
    <Row>
      <CommentProfile src={props.comment.writer_image} />
      <CommentMain>
        <Maintext>
          <CommentNickname to="/profile/jinokim98">
            {props.comment.writer}
          </CommentNickname>
          <CommentDesc>{props.comment.content}</CommentDesc>
        </Maintext>
        <Rest>
          <Time>{`${props.comment.updated_at}분전`}</Time>
          <HeartCount>{`좋아요 ${likes}개`}</HeartCount>
        </Rest>
        <ViewReply></ViewReply>
      </CommentMain>
      <HeartButton active={liked} onClick={likeButtonClick}>
        <FontAwesomeIcon icon={faHeart} />
      </HeartButton>
      <UpdateButton active={isMyComment} ref={updateCommentRef}>
        <FontAwesomeIcon icon={faPen} />
        {updateCommentOpen ? <UpdateComment comment={props.comment} /> : null}
      </UpdateButton>
      <DeleteButton
        active={isMyComment}
        onClick={async () => {
          await deleteComment(props.comment.id)
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
`
const CommentDesc = styled.span``

const Rest = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 12px;
`
const Time = styled.div`
  padding-top: 3px;
  margin-right: 10px;
  font-size: 12px;
`
const HeartCount = styled.div`
  padding-top: 3px;
  margin-right: 10px;
  font-size: 12px;
`

const HeartButton = styled.button<{ active: boolean }>`
  position: absolute;
  top: 15px;
  right: 60px;
  color: ${(props) =>
    props.active ? theme.colors.primaryColor : theme.colors.disable};
`
const ViewReply = styled.button``

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
