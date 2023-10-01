import React, { type FormEvent, useState } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { type LoadComment } from '../../types/postTypes'
import EachComment from '../eachItem/EachComment'
import { request } from '../../util/axios'
import useUser from '../../recoil/hooks/useUser'
import usePostDetail from '../../recoil/hooks/usePostdetail'
import moment from 'moment'
import CommentInput from './CommentInput'
import { tagProcess } from '../function/tag'

interface CommentProps {
  postId: number
}

function Comment(props: CommentProps): JSX.Element {
  const [text, setText] = useState<string>('')
  const { loadUserInfo } = useUser()
  const accessToken = loadUserInfo().accessToken

  const { postComment, enrollComment } = usePostDetail()

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (text === '') return
    try {
      const response = await request<LoadComment>(
        'post',
        `/api/post/${props.postId}/comment/`,
        {
          content: tagProcess(text),
          tagged_users: [],
          post: props.postId,
          like_users: [],
        },
        {
          Authorization: `Bearer ${accessToken}`,
        }
      )

      console.log(response)

      if (response !== undefined) {
        enrollComment(response)
      }
      setText('')
    } catch (error) {
      console.log(error)
    }
  }

  const sortByCreatedAt = (a: LoadComment, b: LoadComment): number => {
    if (moment(a.created_at) < moment(b.created_at)) return 1
    if (moment(a.created_at) > moment(b.created_at)) return -1
    return 0
  }

  return (
    <>
      <CommentContainer>
        {postComment.length > 0 &&
          [...postComment]
            .sort(sortByCreatedAt)
            .map((comment: LoadComment, idx: number) => (
              <EachComment key={idx} comment={comment} />
            ))}
      </CommentContainer>
      <WriteCommentContainer onSubmit={onSubmit}>
        <CommentInput value={text} setValue={setText} />
        <EnrollComment type="submit" disabled={text === ''}>
          게시
        </EnrollComment>
      </WriteCommentContainer>
    </>
  )
}

export default Comment

const CommentContainer = styled.div`
  width: 750px;
  height: 250px;
  margin-bottom: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  overflow-y: scroll;
`

const WriteCommentContainer = styled.form`
  display: flex;
  position: relative;
  align-items: center;
  width: 750px;
  height: 50px;
  margin-bottom: 30px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
`

const EnrollComment = styled.button<{ disabled: boolean }>`
  color: ${(props) => (props.disabled ? '#b1e2f1' : theme.colors.primaryColor)};
  font-weight: 700;
`
