import React, { type ChangeEvent } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { type UpdatePost, type HashtagAutoAndText } from '../../types/postTypes'
import useInput from '../../hooks/useInput'
import { useRecoilState } from 'recoil'
import updatePost from '../../recoil/atom/updatePost'
import { request } from '../../util/axios'
import useUser from '../../recoil/hooks/useUser'

interface EachHashtagAutoProps {
  eachHashtag: HashtagAutoAndText
  id: number
}

function EachHashtagAuto(props: EachHashtagAutoProps): JSX.Element {
  const [text, setText] = useInput<string, HTMLInputElement>(
    props.eachHashtag.text
  )
  const [post, setPost] = useRecoilState<UpdatePost>(updatePost)

  const { loadUserInfo } = useUser()

  // 글 수정 시 내용이 변함
  const onChangeText = (event: ChangeEvent<HTMLInputElement>): void => {
    setText(event)
    const newPins = post.pins.map((pin) =>
      pin.pin_hashtag === props.eachHashtag.hashtagAuto
        ? {
            ...pin,
            content: event.target.value,
          }
        : pin
    )
    setPost({ ...post, pins: newPins })
  }

  // 즉각적으로 삭제되도록 변경, 그 대신 확인 창을 만들어 사용자에게 경고를 준다.
  const deletePin = async (id: number): Promise<void> => {
    if (window.confirm('정말 삭제하시겠습니까?\n삭제는 즉각 반영이 됩니다.')) {
      if (post.pins.length <= 1) {
        alert('최소 한 개는 있어야합니다')
        return
      }

      try {
        await request('delete', `/api/pin/${id}/`, null, {
          Authorization: `Bearer ${loadUserInfo().accessToken}`,
        })
      } catch (error) {
        console.log(error)
        return
      }
    } else {
      return
    }

    const newPins = post.pins.filter(
      (pin) => pin.pin_hashtag !== props.eachHashtag.hashtagAuto
    )
    setPost({ ...post, pins: newPins })
  }

  return (
    <EachHashtagAutoContainer>
      <HashtagAuto>{props.eachHashtag.hashtagAuto}</HashtagAuto>
      <DeleteBtn
        onClick={async () => {
          await deletePin(props.id)
        }}
      >
        <FontAwesomeIcon icon={faMinus} />
      </DeleteBtn>
      <HashtagAutoTextInput value={text} onChange={onChangeText} />
    </EachHashtagAutoContainer>
  )
}

export default EachHashtagAuto

const EachHashtagAutoContainer = styled.div`
  position: relative;
`

const HashtagAuto = styled.div`
  width: 90%;
  height: 15px;
  margin: 5px 0;
  padding: 1px 2px;
  color: ${theme.colors.primaryColor};
  overflow-x: hidden;
  overflow-y: hidden;
`

const DeleteBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 1px;
  width: 10px;
  height: 10px;
`

const HashtagAutoTextInput = styled.input`
  width: 100%;
  height: 25px;
  padding: 0 5px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 15px;

  background-color: ${theme.colors.white};
`
