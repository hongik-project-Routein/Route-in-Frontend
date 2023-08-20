import React, { type ChangeEvent, useEffect } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import Carousel from '../../components/util/carousel'
import {
  type HashtagAutoAndText,
  type UpdatePin,
  type UpdatePost,
} from '../../types/postTypes'
import { request } from '../../util/axios'
import EachHashtagAuto from '../../components/eachItem/EachHashtagAuto'
import { useRecoilState, useResetRecoilState } from 'recoil'
import updatePost, { isUpdatePost } from '../../recoil/atom/updatePost'
import useInput from '../../hooks/useInput'
import useUser from '../../recoil/hooks/useUser'

interface PostUpdateProps {
  postid: string
}

// 추후에 조금 더 수정 필요
export default function PostUpdate(props: PostUpdateProps): JSX.Element {
  const [post, setPost] = useRecoilState<UpdatePost>(updatePost)
  const [text, setText, directChange] = useInput<string, HTMLTextAreaElement>(
    ''
  )
  const { loadUserInfo } = useUser()

  const resetIsUpdatePost = useResetRecoilState(isUpdatePost)
  const resetUpdatePost = useResetRecoilState(updatePost)

  const loadPostForUpdate = async (): Promise<void> => {
    try {
      const response = await request<UpdatePost>(
        'get',
        `/api/post/${props.postid}/update`,
        null,
        {
          Authorization: `Bearer ${loadUserInfo().accessToken}`,
        }
      )
      console.log(response)

      setPost(response)
      directChange(
        deleteDuplicateText(
          response.content,
          response.pins.map((pin) => pin.pin_hashtag)
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  const onContentChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(event)
    setPost({ ...post, content: event.target.value })
  }

  const deleteDuplicateText = (text: string, auto: string[]): string => {
    const lines = text.split('\n')
    return lines
      .slice(auto.length * 3)
      .join('\n')
      .trim()
  }

  useEffect(() => {
    loadPostForUpdate().catch((error) => {
      console.log(error)
    })
  }, [])

  const concatContent = (
    content: string,
    auto: HashtagAutoAndText[]
  ): string => {
    let text = ''
    for (const autoText of auto) {
      text += autoText.hashtagAuto + '\n' + autoText.text + '\n\n'
    }
    text += content

    return text
  }

  // 수정한 후 서버에 전송하는 함수
  const updatePostRequest = async (): Promise<void> => {
    const newContent = concatContent(
      post.content,
      post.pins.map((pin) => {
        return {
          hashtagAuto: pin.pin_hashtag,
          text: pin.content,
        }
      })
    )

    const newPost = { ...post, content: newContent }
    console.log(newPost)

    try {
      const response = await request(
        'put',
        `/api/post/${props.postid}/update/`,
        newPost,
        {
          Authorization: `Bearer ${loadUserInfo().accessToken}`,
        }
      )
      console.log(response)
      resetIsUpdatePost()
      resetUpdatePost()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    return () => {
      resetIsUpdatePost()
    }
  }, [])

  useEffect(() => {
    console.log(post)
  }, [post])

  return (
    <>
      <Title>게시글 수정하기</Title>
      <Paragraph>{`게시글을 수정할 수 있습니다.`}</Paragraph>
      <GroupContainer>
        <PictureGroup>
          {post.pins.length > 0 && (
            <Carousel
              items={post.pins.map((item: UpdatePin, idx: number) => (
                <CarouselImage key={idx} src={item.image} />
              ))}
            ></Carousel>
          )}
        </PictureGroup>
        <LocationGroup>
          <HashtagAutoTextContainer>
            {post.pins.length > 0 &&
              post.pins.map((pin: UpdatePin, idx: number) => (
                <EachHashtagAuto
                  key={`each_hashtag${idx}`}
                  eachHashtag={{
                    hashtagAuto: pin.pin_hashtag,
                    text: pin.content,
                  }}
                />
              ))}
          </HashtagAutoTextContainer>
          {post.pins.length > 0 && (
            <WriteSpace value={text} onChange={onContentChange} />
          )}
        </LocationGroup>
      </GroupContainer>
      <ButtonContainer>
        <Blank />
        <UpdateButton onClick={updatePostRequest}>{`수정완료`}</UpdateButton>
        <Blank />
      </ButtonContainer>
    </>
  )
}

const Title = styled.h1`
  color: ${theme.colors.primaryColor};
  font-size: 40px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 30px;
`
const Paragraph = styled.p`
  font-size: 14px;
  line-height: 24px;
  white-space: pre-line;
  text-align: center;
`

// PictureGroup, LocationGroup을 묶어주는 컨테이너
const GroupContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
`

const PictureGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LocationGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 350px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
`

const HashtagAutoTextContainer = styled.div`
  position: relative;
  width: 350px;
  margin-bottom: 5px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
`

const WriteSpace = styled.textarea`
  width: 350px;
  height: 350px;
  padding: 8px;
  resize: none;
  outline: none;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
`

const CarouselImage = styled.img`
  width: 350px;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
`

const ButtonContainer = styled.div`
  display: flex;
  margin: 30px 0;
`

const Blank = styled.div``

const UpdateButton = styled.button`
  width: 100px;
  height: 35px;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.white};
  border-radius: 8px;
  font-size: 16px;
`
