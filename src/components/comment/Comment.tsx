import React, { type FormEvent, useState, type KeyboardEvent } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons'
import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react'
import { type LoadComment } from '../../types/postTypes'
import EachComment from '../eachItem/EachComment'
import { request } from '../../util/axios'
import useUser from '../../recoil/hooks/useUser'
import usePostDetail from '../../recoil/hooks/usePostdetail'

interface CommentProps {
  postId: number
}

function Comment(props: CommentProps): JSX.Element {
  const [text, setText] = useState<string>('')
  const [emojiClick, setEmojiClick] = useState(false)
  const { loadUserInfo } = useUser()
  const accessToken = loadUserInfo().accessToken

  const { postComment, enrollComment } = usePostDetail()

  const EmojiButtonClick = (): void => {
    setEmojiClick((cur) => !cur)
  }
  const onClick = (emojiData: EmojiClickData): void => {
    setText((cur) => cur + emojiData.emoji)
    setEmojiClick(false)
  }
  const onChange = (event: FormEvent<HTMLInputElement>): void => {
    const {
      currentTarget: { value },
    } = event
    setText(value)
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (text === '') return
    try {
      const response = await request<LoadComment>(
        'post',
        `/api/post/${props.postId}/comment/`,
        { content: text, tagged_users: [], post: props.postId, like_users: [] },
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

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') event.preventDefault()
  }

  return (
    <>
      <CommentContainer>
        {postComment.length > 0 &&
          postComment.map((comment: LoadComment, idx: number) => (
            <EachComment key={idx} comment={comment} />
          ))}
      </CommentContainer>
      <WriteCommentContainer onSubmit={onSubmit}>
        <Emoji onClick={EmojiButtonClick}>
          <FontAwesomeIcon icon={faFaceSmile} />
        </Emoji>
        {emojiClick && (
          <EmojiPickerContainer>
            <EmojiPicker
              height={350}
              width="100%"
              autoFocusSearch={false}
              onEmojiClick={onClick}
            />
          </EmojiPickerContainer>
        )}
        <CommentInput
          type="text"
          value={text}
          placeholder="댓글 입력"
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />
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

const Emoji = styled.button`
  width: 25px;
  height: 25px;
  margin: 0 10px;
  text-align: center;
  font-size: 25px;
`

const EmojiPickerContainer = styled.div`
  position: absolute;
  top: 50px;
`

const CommentInput = styled.input`
  width: 600px;
  height: 30px;
  margin-right: 40px;
  padding: 8px;
`
const EnrollComment = styled.button<{ disabled: boolean }>`
  color: ${(props) => (props.disabled ? '#b1e2f1' : theme.colors.primaryColor)};
  font-weight: 700;
`