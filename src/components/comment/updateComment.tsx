import React, { useState, type FormEvent } from 'react'
import { type LoadComment } from '../../types/postTypes'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons'
import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react'
import { request } from '../../util/axios'
import useUser from '../../recoil/hooks/useUser'
import CommentInput from './CommentInput'
import { getTagList, tagProcess } from '../function/tag'

interface UpdateCommentProps {
  comment: LoadComment
}

function UpdateComment(props: UpdateCommentProps): JSX.Element {
  const [text, setText] = useState<string>(props.comment.content)
  const [emojiClick, setEmojiClick] = useState(false)

  const { loadUserInfo } = useUser()
  const accessToken = loadUserInfo().accessToken

  const EmojiButtonClick = (): void => {
    setEmojiClick((cur) => !cur)
  }

  const onClick = (emojiData: EmojiClickData): void => {
    setText((cur) => cur + emojiData.emoji)
    setEmojiClick(false)
  }

  // 수정을 저장하는 함수
  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (text === '') return

    const tagProcessContent = tagProcess(text)

    try {
      await request(
        'put',
        `/api/comment/${props.comment.id}/`,
        {
          content: tagProcessContent,
          tagged_users: getTagList(tagProcessContent),
          post: props.comment.post,
        },
        {
          Authorization: `Bearer ${accessToken}`,
        }
      )
      window.location.reload() // 일단은 새로고침해서 반영하기
      setText('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
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
      <CommentInput value={text} setValue={setText} />
      <EnrollComment type="submit" disabled={text === ''}>
        게시
      </EnrollComment>
    </WriteCommentContainer>
  )
}

export default UpdateComment

const WriteCommentContainer = styled.form`
  display: flex;
  position: fixed;
  top: 50%;
  left: 55.5%;
  z-index: 999;
  transform: translate(-50%, -50%);

  align-items: center;
  width: 750px;
  height: 50px;
  margin-bottom: 30px;
  background-color: ${theme.colors.white};
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

const EnrollComment = styled.button<{ disabled: boolean }>`
  color: ${(props) => (props.disabled ? '#b1e2f1' : theme.colors.primaryColor)};
  font-weight: 700;
`
